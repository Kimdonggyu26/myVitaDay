package com.vitaday.backend.catalog.application;

import jakarta.validation.constraints.NotEmpty;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CatalogService {

    private final Map<String, GoalData> goals = new LinkedHashMap<>();
    private final Map<String, IngredientData> ingredients = new LinkedHashMap<>();
    private final Map<String, ProductData> products = new LinkedHashMap<>();

    public CatalogService() {
        seedIngredients();
        seedGoals();
        seedProducts();
    }

    public List<GoalSummaryView> getGoals() {
        return goals.values().stream()
                .map(goal -> new GoalSummaryView(goal.id(), goal.label(), goal.icon()))
                .toList();
    }

    public GoalDetailView getGoal(String goalId) {
        GoalData goal = requireGoal(goalId);
        List<IngredientCardView> cards = goal.ingredientIds().stream()
                .map(this::requireIngredient)
                .map(ingredient -> new IngredientCardView(
                        ingredient.id(),
                        ingredient.name(),
                        ingredient.description(),
                        ingredient.priceHint(),
                        ingredient.visualType(),
                        ingredient.visualColor(),
                        ingredient.badgeIcon()))
                .toList();

        return new GoalDetailView(
                goal.id(),
                goal.label(),
                goal.icon(),
                goal.headline(),
                goal.description(),
                cards);
    }

    public List<IngredientCardView> getGoalIngredients(String goalId) {
        return getGoal(goalId).ingredients();
    }

    public SearchResultsView searchProducts(
            String query,
            String goalId,
            String ingredientId,
            String scope) {

        String normalizedScope = normalizeScope(scope);

        List<ProductData> filtered = products.values().stream()
                .filter(product -> matchesScope(product, normalizedScope))
                .filter(product -> matchesQuery(product, query))
                .filter(product -> matchesGoal(product, goalId))
                .filter(product -> matchesIngredient(product, ingredientId))
                .toList();

        String headerTitle = "검색 결과";
        String queryTitle = firstNonBlank(query, ingredientLabel(ingredientId), goalLabel(goalId), "전체");
        String queryMeta = "%d개 결과".formatted(filtered.size());

        return new SearchResultsView(
                headerTitle,
                queryTitle,
                queryMeta,
                List.of(
                        new ScopeOptionView("all", "전체", "all".equals(normalizedScope)),
                        new ScopeOptionView("domestic", "국내제품", "domestic".equals(normalizedScope)),
                        new ScopeOptionView("global", "해외제품", "global".equals(normalizedScope))),
                filtered.stream().map(this::toProductCardView).toList());
    }

    public ProductDetailView getProduct(String productId) {
        ProductData product = requireProduct(productId);
        return new ProductDetailView(
                product.id(),
                product.brand(),
                product.name(),
                product.summary(),
                product.totalPrice(),
                product.dailyPrice(),
                product.unitHint(),
                product.packageHint(),
                product.intakeHint(),
                product.highlights(),
                product.ingredientIds().stream().map(this::ingredientLabel).toList(),
                product.checkpoints(),
                product.offers());
    }

    public CompareView compareProducts(CompareRequest request) {
        List<ProductData> matched = request.productIds().stream()
                .distinct()
                .map(this::requireProduct)
                .toList();

        if (matched.size() < 2) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "비교는 최소 2개 제품이 필요합니다.");
        }

        List<CompareProductView> productViews = matched.stream()
                .map(product -> new CompareProductView(
                        product.id(),
                        product.brand(),
                        product.name(),
                        product.totalPrice(),
                        product.dailyPrice(),
                        product.intakeHint(),
                        product.primaryIngredientAmount()))
                .toList();

        List<CompareMetricView> metrics = List.of(
                new CompareMetricView(
                        "총 가격",
                        matched.stream().map(ProductData::totalPrice).toList()),
                new CompareMetricView(
                        "1일 기준",
                        matched.stream().map(ProductData::dailyPrice).toList()),
                new CompareMetricView(
                        "대표 함량",
                        matched.stream().map(ProductData::primaryIngredientAmount).toList()),
                new CompareMetricView(
                        "복용량",
                        matched.stream().map(ProductData::intakeHint).toList()),
                new CompareMetricView(
                        "일수",
                        matched.stream().map(ProductData::packageHint).toList()));

        return new CompareView(
                "%s 제품 %d개 비교".formatted(matched.get(0).categoryLabel(), matched.size()),
                productViews,
                metrics);
    }

    private ProductCardView toProductCardView(ProductData product) {
        return new ProductCardView(
                product.id(),
                product.brand(),
                product.name(),
                product.summary(),
                product.totalPrice(),
                product.dailyPrice(),
                product.scope(),
                product.visualType(),
                product.visualColor(),
                product.badgeIcon());
    }

    private boolean matchesScope(ProductData product, String scope) {
        return "all".equals(scope) || product.scope().equals(scope);
    }

    private boolean matchesQuery(ProductData product, String query) {
        if (query == null || query.isBlank()) {
            return true;
        }
        String normalized = query.trim().toLowerCase();
        return product.name().toLowerCase().contains(normalized)
                || product.brand().toLowerCase().contains(normalized)
                || product.summary().toLowerCase().contains(normalized);
    }

    private boolean matchesGoal(ProductData product, String goalId) {
        return goalId == null || goalId.isBlank() || product.goalIds().contains(goalId);
    }

    private boolean matchesIngredient(ProductData product, String ingredientId) {
        return ingredientId == null
                || ingredientId.isBlank()
                || product.ingredientIds().contains(ingredientId);
    }

    private String normalizeScope(String scope) {
        if (scope == null || scope.isBlank()) {
            return "all";
        }
        return switch (scope) {
            case "all", "domestic", "global" -> scope;
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "지원하지 않는 scope 입니다.");
        };
    }

    private String ingredientLabel(String ingredientId) {
        if (ingredientId == null || ingredientId.isBlank()) {
            return null;
        }
        return requireIngredient(ingredientId).name();
    }

    private String goalLabel(String goalId) {
        if (goalId == null || goalId.isBlank()) {
            return null;
        }
        return requireGoal(goalId).label();
    }

    private String firstNonBlank(String... values) {
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value;
            }
        }
        return "";
    }

    private GoalData requireGoal(String goalId) {
        GoalData goal = goals.get(goalId);
        if (goal == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 목적입니다.");
        }
        return goal;
    }

    private IngredientData requireIngredient(String ingredientId) {
        IngredientData ingredient = ingredients.get(ingredientId);
        if (ingredient == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 성분입니다.");
        }
        return ingredient;
    }

    private ProductData requireProduct(String productId) {
        ProductData product = products.get(productId);
        if (product == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 제품입니다.");
        }
        return product;
    }

    private void seedGoals() {
        addGoal("sleep", "수면", "moon-outline", "수면에 좋은 영양제", "먼저 성분이나 제품군을 골라보세요", "magnesium", "theanine", "melatonin", "gaba", "lactium", "ecklonia");
        addGoal("fatigue", "피로·활력", "flash-outline", "피로·활력에 좋은 영양제", "에너지와 활력 루틴에서 많이 찾는 성분이에요", "vitamin-b", "red-ginseng", "magnesium", "coq10");
        addGoal("gut", "장·위 건강", "leaf-outline", "장·위 건강에 좋은 영양제", "소화와 장 컨디션에서 많이 비교하는 성분이에요", "probiotics", "prebiotics", "digestive-enzyme", "postbiotics", "fiber");
        addGoal("immune", "면역", "shield-checkmark-outline", "면역에 좋은 영양제", "기본 영양소와 기능성 성분을 함께 살펴보세요", "vitamin-c", "zinc", "propolis", "beta-glucan", "red-ginseng", "selenium");
        addGoal("skin", "피부·헤어", "sparkles-outline", "피부·헤어에 좋은 영양제", "피부와 헤어 루틴에서 많이 찾는 성분이에요", "collagen", "biotin", "vitamin-c", "hyaluronic-acid", "ceramide");
        addGoal("eye", "눈 건강", "eye-outline", "눈 건강에 좋은 영양제", "눈 피로와 건조감 루틴에서 자주 찾는 성분이에요", "lutein", "astaxanthin", "omega3", "zeaxanthin", "vitamin-a");
        addGoal("fitness", "운동·근력", "barbell-outline", "운동·근력에 좋은 영양제", "운동 전후 루틴에서 많이 찾는 성분이에요", "creatine", "bcaa", "arginine", "protein", "caffeine", "taurine");
        addGoal("bloodFlow", "혈행", "pulse-outline", "혈행에 좋은 영양제", "혈행과 활력 루틴에서 자주 보는 성분이에요", "omega3", "coq10", "vitamin-e", "ginkgo");
        addGoal("bloodSugar", "혈당", "water-outline", "혈당에 좋은 영양제", "식후 루틴과 기본 영양소를 함께 비교해보세요", "banaba", "bitter-melon", "chromium", "fiber");
        addGoal("boneJoint", "뼈·관절", "walk-outline", "뼈·관절에 좋은 영양제", "뼈와 관절 루틴에서 많이 찾는 성분이에요", "calcium", "vitamin-d", "msm", "glucosamine");
        addGoal("women", "여성 건강", "flower-outline", "여성 건강에 좋은 영양제", "주기적 컨디션과 기본 영양 루틴에서 많이 보는 성분이에요", "folate", "iron", "gla", "biotin");
        addGoal("liver", "간 건강", "flask-outline", "간 건강에 좋은 영양제", "간 컨디션과 활력 루틴에서 자주 비교하는 성분이에요", "milk-thistle", "hovenia", "vitamin-b", "zinc");
    }

    private void addGoal(
            String id,
            String label,
            String icon,
            String headline,
            String description,
            String... ingredientIds) {
        goals.put(id, new GoalData(id, label, icon, headline, description, List.of(ingredientIds)));
    }

    private void seedIngredients() {
        addIngredient("magnesium", "마그네슘", "긴장을 풀어주는 루틴에서 자주 함께 보는 기본 성분이에요.", "보통 한 알 300원대", "capsule", "#f4f5f6", "moon-outline");
        addIngredient("theanine", "테아닌", "수면 전 긴장 완화 쪽으로 많이 찾는 편이에요.", "보통 한 알 400원대", "capsule", "#f6f7f8", "moon-outline");
        addIngredient("melatonin", "멜라토닌", "취침 타이밍 루틴에서 자주 비교하는 성분이에요.", "보통 한 알 500원대", "softgel", "#39251f", "moon-outline");
        addIngredient("ecklonia", "감태추출물", "부드럽게 수면 루틴을 잡고 싶을 때 함께 많이 봐요.", "보통 한 알 600원대", "capsule", "#dde4dc", "moon-outline");
        addIngredient("gaba", "GABA", "편안한 밤 루틴 쪽으로 함께 비교하는 경우가 많아요.", "보통 한 알 500원대", "capsule", "#f2f2f4", "moon-outline");
        addIngredient("lactium", "락티움", "예민한 밤 컨디션을 볼 때 같이 찾는 편이에요.", "보통 한 알 700원대", "capsule", "#f5f0ea", "moon-outline");

        addIngredient("vitamin-b", "비타민B군", "피로·활력 쪽에서 가장 기본으로 많이 보는 성분이에요.", "보통 한 알 300원대", "tablet", "#f7f6f3", "flash-outline");
        addIngredient("red-ginseng", "홍삼", "활력 루틴을 볼 때 대표적으로 함께 찾는 편이에요.", "보통 하루 800원대", "softgel", "#7b3024", "flame-outline");
        addIngredient("coq10", "코엔자임Q10", "에너지 대사 쪽으로 함께 비교하는 경우가 많아요.", "보통 한 알 600원대", "softgel", "#5f2c1f", "flash-outline");

        addIngredient("probiotics", "유산균", "장 건강에서 가장 먼저 찾는 대표 제품군이에요.", "보통 하루 400원대", "capsule", "#f6f7f8", "leaf-outline");
        addIngredient("prebiotics", "프리바이오틱스", "유산균과 함께 기본 조합으로 많이 봐요.", "보통 하루 300원대", "tablet", "#f4efe7", "flower-outline");
        addIngredient("digestive-enzyme", "소화효소", "식후 더부룩함 쪽으로 같이 비교해보는 편이에요.", "보통 하루 500원대", "capsule", "#d9c4aa", "restaurant-outline");
        addIngredient("postbiotics", "포스트바이오틱스", "유산균 제품과 함께 비교하는 경우가 많아요.", "보통 하루 500원대", "capsule", "#ece8e1", "leaf-outline");
        addIngredient("fiber", "식이섬유", "배변 활동이나 식후 루틴에서 자주 함께 봐요.", "보통 하루 300원대", "tablet", "#f3efe7", "nutrition-outline");

        addIngredient("vitamin-c", "비타민C", "기본 영양 루틴에서 가장 자주 찾는 성분 중 하나예요.", "보통 한 알 200원대", "tablet", "#f8f8f6", "sunny-outline");
        addIngredient("zinc", "아연", "비타민C와 함께 많이 보는 대표 조합이에요.", "보통 한 알 200원대", "capsule", "#f3f4f6", "shield-checkmark-outline");
        addIngredient("propolis", "프로폴리스", "목 컨디션까지 같이 볼 때 자주 비교해요.", "보통 하루 500원대", "softgel", "#5e2f1f", "leaf-outline");
        addIngredient("beta-glucan", "베타글루칸", "기능성 중심으로 한 번 더 비교할 때 많이 봐요.", "보통 하루 600원대", "capsule", "#efe3cf", "sparkles-outline");
        addIngredient("selenium", "셀렌", "항산화 쪽까지 같이 볼 때 자주 함께 봐요.", "보통 한 알 300원대", "capsule", "#f6f7f5", "shield-checkmark-outline");

        addIngredient("collagen", "콜라겐", "피부 쪽에서 가장 먼저 찾는 대표 제품군이에요.", "보통 하루 700원대", "tablet", "#f5f2ee", "sparkles-outline");
        addIngredient("biotin", "비오틴", "피부와 헤어를 함께 볼 때 자주 찾아요.", "보통 한 알 300원대", "capsule", "#fafafa", "flower-outline");
        addIngredient("hyaluronic-acid", "히알루론산", "보습감 쪽으로 관심 있을 때 자주 같이 봐요.", "보통 하루 600원대", "capsule", "#eef3f8", "water-outline");
        addIngredient("ceramide", "세라마이드", "피부 장벽 쪽으로 함께 비교하는 경우가 많아요.", "보통 하루 700원대", "capsule", "#f1ebe3", "sparkles-outline");

        addIngredient("lutein", "루테인", "눈 건강에서 가장 먼저 찾는 기본 성분이에요.", "보통 하루 400원대", "softgel", "#f4b736", "eye-outline");
        addIngredient("astaxanthin", "아스타잔틴", "루테인과 함께 자주 비교해보는 편이에요.", "보통 하루 600원대", "softgel", "#7e2b23", "sparkles-outline");
        addIngredient("zeaxanthin", "지아잔틴", "루테인 제품을 볼 때 함께 비교하는 경우가 많아요.", "보통 하루 500원대", "capsule", "#efb248", "eye-outline");
        addIngredient("vitamin-a", "비타민A", "기초 성분까지 같이 볼 때 자주 함께 봐요.", "보통 한 알 200원대", "tablet", "#f6f7f5", "sunny-outline");

        addIngredient("creatine", "크레아틴", "운동 쪽에서 가장 먼저 찾는 대표 성분이에요.", "보통 하루 500원대", "tablet", "#f3f2ef", "barbell-outline");
        addIngredient("bcaa", "BCAA", "운동 전후 루틴에서 함께 많이 보는 편이에요.", "보통 하루 700원대", "capsule", "#2a2a2a", "flash-outline");
        addIngredient("arginine", "아르기닌", "운동 전 루틴에서 자주 같이 비교해요.", "보통 하루 600원대", "capsule", "#f4f4f5", "thunderstorm-outline");
        addIngredient("protein", "단백질", "가장 넓게 쓰는 편이라 가격과 1회 제공량을 같이 봐요.", "보통 1회 900원대", "tablet", "#efe6db", "fitness-outline");
        addIngredient("caffeine", "카페인", "운동 전 집중감 쪽으로 함께 보는 경우가 많아요.", "보통 1회 300원대", "capsule", "#3d2f2b", "flash-outline");
        addIngredient("taurine", "타우린", "운동 전후 루틴에서 자주 같이 비교하는 편이에요.", "보통 1회 400원대", "tablet", "#f5f6f7", "thunderstorm-outline");

        addIngredient("vitamin-e", "비타민E", "기초 항산화 루틴과 함께 비교하는 경우가 많아요.", "보통 한 알 300원대", "tablet", "#f7f6f3", "sparkles-outline");
        addIngredient("ginkgo", "은행잎추출물", "혈행과 기억력 쪽을 같이 볼 때 자주 비교해요.", "보통 하루 600원대", "capsule", "#d9d6b0", "leaf-outline");
        addIngredient("banaba", "바나바잎추출물", "혈당 케어 쪽에서 대표적으로 함께 비교하는 성분이에요.", "보통 하루 500원대", "tablet", "#ece4d8", "water-outline");
        addIngredient("bitter-melon", "여주추출물", "식후 혈당 관리 루틴에서 자주 함께 봐요.", "보통 하루 500원대", "capsule", "#d8e3cf", "leaf-outline");
        addIngredient("chromium", "크롬", "기초 미네랄까지 함께 볼 때 같이 비교하는 편이에요.", "보통 한 알 200원대", "capsule", "#f3f4f6", "sparkles-outline");

        addIngredient("calcium", "칼슘", "뼈 건강 쪽에서 가장 기본으로 많이 보는 성분이에요.", "보통 한 알 300원대", "tablet", "#f7f7f5", "walk-outline");
        addIngredient("vitamin-d", "비타민D", "칼슘과 함께 기본 조합으로 자주 비교해요.", "보통 한 알 200원대", "capsule", "#f8f8f6", "sunny-outline");
        addIngredient("msm", "MSM", "관절 쪽까지 같이 볼 때 함께 많이 찾아요.", "보통 하루 600원대", "tablet", "#f2f2ef", "fitness-outline");
        addIngredient("glucosamine", "글루코사민", "관절 루틴 중심으로 자주 비교하는 대표 성분이에요.", "보통 하루 700원대", "capsule", "#efe7de", "walk-outline");

        addIngredient("folate", "엽산", "여성 건강 루틴에서 기본으로 많이 보는 성분이에요.", "보통 한 알 200원대", "tablet", "#f7f7f5", "flower-outline");
        addIngredient("iron", "철분", "활력과 컨디션까지 같이 볼 때 자주 함께 봐요.", "보통 한 알 300원대", "capsule", "#6d2b23", "flash-outline");
        addIngredient("gla", "감마리놀렌산", "주기적 컨디션 관리를 볼 때 함께 비교하는 편이에요.", "보통 하루 700원대", "softgel", "#f4d9a6", "flower-outline");

        addIngredient("milk-thistle", "밀크씨슬", "간 건강에서 가장 먼저 찾는 대표 성분이에요.", "보통 한 알 400원대", "capsule", "#7a4a30", "flask-outline");
        addIngredient("hovenia", "헛개나무추출물", "간 컨디션 루틴에서 자주 함께 비교해요.", "보통 하루 600원대", "tablet", "#d8c8b6", "leaf-outline");
        addIngredient("omega3", "?ㅻ찓媛3", "???쇰줈? ?덊뻾 猷⑦떞?먯꽌 ?먯＜ ?④퍡 蹂대뒗 湲곕낯 ?깅텇?댁뿉??", "蹂댄넻 ?섎（ 500?먮?", "softgel", "#8a331f", "water-outline");
    }

    private void addIngredient(
            String id,
            String name,
            String description,
            String priceHint,
            String visualType,
            String visualColor,
            String badgeIcon) {
        ingredients.put(id, new IngredientData(id, name, description, priceHint, visualType, visualColor, badgeIcon));
    }

    private void seedProducts() {
        addProduct(new ProductData(
                "jong-rtg",
                "종근당건강",
                "알티지 오메가3",
                "EPA·DHA 900mg",
                "29,900원",
                "1일 498원",
                "1캡슐당 249원",
                "60일분",
                "하루 2캡슐",
                "900mg",
                "오메가3",
                "domestic",
                List.of("eye", "bloodFlow"),
                List.of("omega3"),
                List.of(
                        new Highlight("주요 성분", "EPA · DHA 900mg"),
                        new Highlight("가격대", "2만원대"),
                        new Highlight("복용 방식", "1일 2캡슐")),
                List.of(
                        "한 캡슐당 함량보다 하루 총 함량을 먼저 보는 편이 좋아요.",
                        "비슷한 오메가3 제품과 가격 대비 함량을 비교하기 좋아요.",
                        "캡슐 수와 하루 복용량을 같이 보면 실제 사용 기간이 보여요."),
                List.of(
                        new OfferView("쿠팡", "29,900원", "1일 498원", "가격 보기"),
                        new OfferView("네이버쇼핑", "31,200원", "1일 520원", "가격 보기")),
                "capsule",
                "#f8f8f4",
                "water-outline"));

        addProduct(new ProductData(
                "sports-research-omega",
                "Sports Research",
                "식물성 오메가3",
                "1캡슐 고함량",
                "34,500원",
                "1일 575원",
                "1캡슐당 575원",
                "60일분",
                "하루 1캡슐",
                "1,040mg",
                "오메가3",
                "global",
                List.of("eye", "bloodFlow"),
                List.of("omega3"),
                List.of(
                        new Highlight("주요 성분", "EPA · DHA 1,040mg"),
                        new Highlight("가격대", "3만원대"),
                        new Highlight("복용 방식", "1일 1캡슐")),
                List.of(
                        "고함량 제품은 하루 복용량과 가격을 같이 보는 편이 좋아요.",
                        "비건 원료인지 여부도 함께 비교해보면 좋아요."),
                List.of(
                        new OfferView("쿠팡", "34,500원", "1일 575원", "가격 보기"),
                        new OfferView("네이버쇼핑", "35,900원", "1일 598원", "가격 보기")),
                "softgel",
                "#6b2d1f",
                "leaf-outline"));

        addProduct(new ProductData(
                "now-ultra-omega",
                "NOW",
                "울트라 오메가3",
                "가성비 비교 인기",
                "27,800원",
                "1일 463원",
                "1캡슐당 231원",
                "60일분",
                "하루 2소프트젤",
                "1,000mg",
                "오메가3",
                "global",
                List.of("eye", "bloodFlow"),
                List.of("omega3"),
                List.of(
                        new Highlight("주요 성분", "EPA · DHA 1,000mg"),
                        new Highlight("가격대", "2만원대"),
                        new Highlight("복용 방식", "1일 2소프트젤")),
                List.of(
                        "가성비 제품은 총 가격보다 1일 기준 가격이 더 중요해요.",
                        "복용량이 많아지면 체감 사용성이 달라질 수 있어요."),
                List.of(
                        new OfferView("쿠팡", "27,800원", "1일 463원", "가격 보기"),
                        new OfferView("네이버쇼핑", "28,500원", "1일 475원", "가격 보기")),
                "capsule",
                "#242424",
                "flash-outline"));

        addProduct(new ProductData(
                "doctorbest-magnesium",
                "Doctor's Best",
                "고흡수 마그네슘",
                "글리시네이트 200mg",
                "21,900원",
                "1일 365원",
                "1캡슐당 182원",
                "60일분",
                "하루 2캡슐",
                "200mg",
                "마그네슘",
                "global",
                List.of("sleep", "fatigue"),
                List.of("magnesium"),
                List.of(
                        new Highlight("주요 성분", "마그네슘 200mg"),
                        new Highlight("가격대", "2만원대"),
                        new Highlight("복용 방식", "1일 2캡슐")),
                List.of(
                        "마그네슘은 함량과 흡수 형태를 함께 보는 편이 좋아요.",
                        "수면 루틴에 쓸 땐 복용 타이밍도 같이 보는 편이에요."),
                List.of(
                        new OfferView("쿠팡", "21,900원", "1일 365원", "가격 보기"),
                        new OfferView("네이버쇼핑", "22,700원", "1일 378원", "가격 보기")),
                "capsule",
                "#f4f5f6",
                "moon-outline"));

        addProduct(new ProductData(
                "healthyorigins-melatonin",
                "Healthy Origins",
                "멜라토닌 3mg",
                "수면 리듬 루틴",
                "18,600원",
                "1일 310원",
                "1정당 155원",
                "60일분",
                "하루 2정",
                "3mg",
                "멜라토닌",
                "global",
                List.of("sleep"),
                List.of("melatonin"),
                List.of(
                        new Highlight("주요 성분", "멜라토닌 3mg"),
                        new Highlight("가격대", "1만원대"),
                        new Highlight("복용 방식", "취침 전 1~2정")),
                List.of(
                        "멜라토닌은 함량과 복용 타이밍을 같이 보는 편이 좋아요.",
                        "취침 루틴에 맞는 용량인지 비교해보면 좋아요."),
                List.of(
                        new OfferView("쿠팡", "18,600원", "1일 310원", "가격 보기"),
                        new OfferView("네이버쇼핑", "19,100원", "1일 318원", "가격 보기")),
                "softgel",
                "#39251f",
                "moon-outline"));

        addProduct(new ProductData(
                "lactofit-gold",
                "종근당건강",
                "락토핏 골드",
                "유산균 20억 CFU",
                "17,900원",
                "1일 298원",
                "1포당 298원",
                "60일분",
                "하루 1포",
                "20억 CFU",
                "유산균",
                "domestic",
                List.of("gut"),
                List.of("probiotics"),
                List.of(
                        new Highlight("주요 성분", "유산균 20억 CFU"),
                        new Highlight("가격대", "1만원대"),
                        new Highlight("복용 방식", "1일 1포")),
                List.of(
                        "유산균은 균 수와 보관 편의성을 같이 보는 편이 좋아요.",
                        "스틱형인지 캡슐형인지도 비교 포인트가 돼요."),
                List.of(
                        new OfferView("쿠팡", "17,900원", "1일 298원", "가격 보기"),
                        new OfferView("네이버쇼핑", "18,300원", "1일 305원", "가격 보기")),
                "tablet",
                "#f6f7f8",
                "leaf-outline"));
    }

    private void addProduct(ProductData product) {
        products.put(product.id(), product);
    }

    public record GoalSummaryView(String id, String label, String icon) {}

    public record GoalDetailView(
            String id,
            String label,
            String icon,
            String headline,
            String description,
            List<IngredientCardView> ingredients) {}

    public record IngredientCardView(
            String id,
            String name,
            String description,
            String priceHint,
            String visualType,
            String visualColor,
            String badgeIcon) {}

    public record ScopeOptionView(String id, String label, boolean active) {}

    public record SearchResultsView(
            String headerTitle,
            String queryTitle,
            String queryMeta,
            List<ScopeOptionView> scopes,
            List<ProductCardView> products) {}

    public record ProductCardView(
            String id,
            String brand,
            String name,
            String summary,
            String totalPrice,
            String dailyPrice,
            String scope,
            String visualType,
            String visualColor,
            String badgeIcon) {}

    public record ProductDetailView(
            String id,
            String brand,
            String name,
            String summary,
            String totalPrice,
            String dailyPrice,
            String unitHint,
            String packageHint,
            String intakeHint,
            List<Highlight> highlights,
            List<String> ingredients,
            List<String> checkpoints,
            List<OfferView> offers) {}

    public record Highlight(String label, String value) {}

    public record OfferView(String merchant, String price, String unitPrice, String actionLabel) {}

    public record CompareRequest(@NotEmpty(message = "productIds 는 비워둘 수 없습니다.") List<String> productIds) {}

    public record CompareView(String title, List<CompareProductView> products, List<CompareMetricView> metrics) {}

    public record CompareProductView(
            String id,
            String brand,
            String name,
            String totalPrice,
            String dailyPrice,
            String intakeHint,
            String primaryIngredientAmount) {}

    public record CompareMetricView(String label, List<String> values) {}

    private record GoalData(
            String id,
            String label,
            String icon,
            String headline,
            String description,
            List<String> ingredientIds) {}

    private record IngredientData(
            String id,
            String name,
            String description,
            String priceHint,
            String visualType,
            String visualColor,
            String badgeIcon) {}

    private record ProductData(
            String id,
            String brand,
            String name,
            String summary,
            String totalPrice,
            String dailyPrice,
            String unitHint,
            String packageHint,
            String intakeHint,
            String primaryIngredientAmount,
            String categoryLabel,
            String scope,
            List<String> goalIds,
            List<String> ingredientIds,
            List<Highlight> highlights,
            List<String> checkpoints,
            List<OfferView> offers,
            String visualType,
            String visualColor,
            String badgeIcon) {}
}
