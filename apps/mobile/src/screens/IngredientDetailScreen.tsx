import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { styles } from '../styles';
import { AppTheme, SearchResultItem, SelectedIngredient } from '../types';

type IngredientDetailScreenProps = {
  isDarkMode: boolean;
  theme: AppTheme;
  ingredient: SelectedIngredient;
  onBack: () => void;
  onOpenProductDetail: () => void;
  onOpenCompare: () => void;
};

function getIngredientPairing(ingredientName: string) {
  switch (ingredientName) {
    case '비타민C':
      return {
        message:
          '비타민C는 기본 영양 루틴에서 다른 성분과 함께 많이 보는 편이에요.',
        items: ['아연', '콜라겐', '프로폴리스'],
      };
    case '마그네슘':
      return {
        message:
          '마그네슘은 저녁 루틴이나 기본 영양 루틴에서 다른 성분과 함께 비교해보는 경우가 많아요.',
        items: ['테아닌', '비타민B군', '비타민D'],
      };
    case '콜라겐':
      return {
        message:
          '콜라겐은 피부 루틴에서 보조 성분과 함께 조합으로 보는 경우가 많아요.',
        items: ['비타민C', '히알루론산', '세라마이드'],
      };
    case '크레아틴':
      return {
        message:
          '크레아틴은 운동 루틴에서 다른 성분과 함께 묶어서 보는 경우가 많아요.',
        items: ['단백질', 'BCAA', '아르기닌'],
      };
    case '루테인':
      return {
        message:
          '루테인은 눈 건강 루틴에서 같이 보는 성분 조합이 비교적 분명한 편이에요.',
        items: ['지아잔틴', '오메가3', '아스타잔틴'],
      };
    case '유산균':
      return {
        message:
          '유산균은 장 루틴에서 다른 장 관련 성분과 함께 비교해보는 경우가 많아요.',
        items: ['프리바이오틱스', '포스트바이오틱스', '식이섬유'],
      };
    case '밀크씨슬':
      return {
        message:
          '밀크씨슬은 간 컨디션 루틴에서 기본 영양 성분과 함께 보는 편이에요.',
        items: ['비타민B군', '아연', '헛개나무추출물'],
      };
    default:
      return {
        message:
          `${ingredientName}은 다른 영양 성분과 함께 조합으로 비교해보는 경우가 많아요.`,
        items: ['비타민C', '아연', '마그네슘'],
      };
  }
}

function buildIngredientProducts(ingredient: SelectedIngredient): SearchResultItem[] {
  if (ingredient.name === '크레아틴') {
    return [
      {
        id: 'creatine-on',
        brand: 'Optimum Nutrition',
        name: '크레아틴 파우더',
        summary: '',
        price: '32,900원',
        dailyPrice: '548원',
        dailyDose: '1스쿱',
        totalCount: '60회분',
        visualWidth: 76,
        visualHeight: 76,
        visualRadius: 18,
        visualColor: '#f1f2f4',
        badgeIcon: 'barbell-outline',
      },
      {
        id: 'creatine-mt',
        brand: 'MuscleTech',
        name: '플래티넘 크레아틴',
        summary: '',
        price: '28,500원',
        dailyPrice: '475원',
        dailyDose: '1스쿱',
        totalCount: '60회분',
        visualWidth: 72,
        visualHeight: 84,
        visualRadius: 18,
        visualColor: '#232427',
        badgeIcon: 'flash-outline',
      },
      {
        id: 'creatine-mp',
        brand: 'MyProtein',
        name: '크레아틴 모노하이드레이트',
        summary: '',
        price: '24,900원',
        dailyPrice: '415원',
        dailyDose: '1스쿱',
        totalCount: '60회분',
        visualWidth: 78,
        visualHeight: 68,
        visualRadius: 18,
        visualColor: '#ece7df',
        badgeIcon: 'fitness-outline',
      },
    ];
  }

  return [
    {
      id: `${ingredient.name}-daily`,
      brand: '종근당건강',
      name: `${ingredient.name} 데일리`,
      summary: '',
      price: '29,900원',
      dailyPrice: '498원',
      dailyDose: '1정',
      totalCount: '60정',
      visualWidth: Math.max(40, ingredient.visualWidth - 10),
      visualHeight: Math.max(40, ingredient.visualHeight + 8),
      visualRadius: ingredient.visualRadius,
      visualColor: ingredient.visualColor,
      badgeIcon: ingredient.badgeIcon,
    },
    {
      id: `${ingredient.name}-plus`,
      brand: 'NOW',
      name: `${ingredient.name} 플러스`,
      summary: '',
      price: '31,500원',
      dailyPrice: '525원',
      dailyDose: '2정',
      totalCount: '120정',
      visualWidth: Math.max(38, ingredient.visualWidth - 6),
      visualHeight: Math.max(44, ingredient.visualHeight + 12),
      visualRadius: ingredient.visualRadius,
      visualColor: ingredient.visualColor,
      badgeIcon: ingredient.badgeIcon,
    },
    {
      id: `${ingredient.name}-balance`,
      brand: 'California Gold',
      name: `${ingredient.name} 밸런스`,
      summary: '',
      price: '26,700원',
      dailyPrice: '445원',
      dailyDose: '1정',
      totalCount: '90정',
      visualWidth: Math.max(42, ingredient.visualWidth - 2),
      visualHeight: Math.max(40, ingredient.visualHeight + 4),
      visualRadius: ingredient.visualRadius,
      visualColor: ingredient.visualColor,
      badgeIcon: ingredient.badgeIcon,
    },
  ];
}

function parseCurrency(value: string) {
  return Number(value.replace(/[^0-9]/g, ''));
}

function parseTotalCount(value?: string) {
  if (!value) return 0;
  return Number(value.replace(/[^0-9]/g, ''));
}

function getAverageUnitPrice(products: SearchResultItem[]) {
  const unitPrices = products
    .map((product) => {
      const totalPrice = parseCurrency(product.price);
      const totalCount = parseTotalCount(product.totalCount);

      if (!totalPrice || !totalCount) return 0;
      return totalPrice / totalCount;
    })
    .filter((value) => value > 0);

  if (unitPrices.length === 0) {
    return '약 500원';
  }

  const average = unitPrices.reduce((sum, value) => sum + value, 0) / unitPrices.length;
  const rounded = Math.round(average / 10) * 10;

  return `약 ${rounded.toLocaleString('ko-KR')}원`;
}

function getPrimaryForm(products: SearchResultItem[]) {
  const hasPowder = products.some((product) => product.name.includes('파우더'));

  if (hasPowder) {
    return '캡슐·파우더';
  }

  return '캡슐·정제';
}

export function IngredientDetailScreen({
  isDarkMode,
  theme,
  ingredient,
  onBack,
  onOpenProductDetail,
  onOpenCompare,
}: IngredientDetailScreenProps) {
  const productEmoji = '💊';
  const products = buildIngredientProducts(ingredient);
  const pairing = getIngredientPairing(ingredient.name);
  const averageUnitPrice = getAverageUnitPrice(products);
  const primaryForm = getPrimaryForm(products);

  return (
    <ScrollView contentContainerStyle={styles.resultsContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.detailTopBar}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={20} color={theme.textStrong} />
        </Pressable>
        <Text style={[styles.detailTopTitle, { color: theme.textStrong }]}>성분</Text>
        <View style={styles.detailTopActions}>
          <Pressable>
            <Ionicons name="bookmark-outline" size={20} color={theme.textStrong} />
          </Pressable>
        </View>
      </View>

      <View
        style={[
          styles.detailHero,
          {
            backgroundColor: theme.surface,
            borderColor: theme.borderSoft,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <View style={styles.ingredientHeroHeader}>
          <View
            style={[
              styles.ingredientHeroGoalPill,
              {
                backgroundColor: theme.mutedSurface,
                borderColor: theme.borderSoft,
              },
            ]}
          >
            <Text style={[styles.ingredientHeroGoalText, { color: theme.point }]}>
              {ingredient.goalLabel}
            </Text>
          </View>
          <Text style={[styles.detailTitle, { color: theme.textStrong }]}>{ingredient.name}</Text>
          <Text style={[styles.detailSubtitle, { color: theme.textMuted }]}>
            {ingredient.detailDescription ?? ingredient.description}
          </Text>
        </View>

        <View
          style={[
            styles.ingredientHeroMetaRow,
            {
              backgroundColor: theme.surfaceAlt,
              borderColor: theme.borderSoft,
            },
          ]}
        >
          <View style={styles.ingredientHeroMetaItemCompact}>
            <Text style={[styles.ingredientHeroMetaLabel, { color: theme.textSubtle }]}>
              평균 1알 가격
            </Text>
            <Text style={[styles.ingredientHeroMetaValue, { color: theme.textStrong }]}>
              {averageUnitPrice}
            </Text>
          </View>
          <View
            style={[
              styles.ingredientHeroMetaDivider,
              {
                backgroundColor: theme.borderSoft,
              },
            ]}
          />
          <View style={styles.ingredientHeroMetaItemCompact}>
            <Text style={[styles.ingredientHeroMetaLabel, { color: theme.textSubtle }]}>
              대표 제형
            </Text>
            <Text style={[styles.ingredientHeroMetaValue, { color: theme.textStrong }]}>
              {primaryForm}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.ingredientSectionHeader}>
        <Text style={[styles.ingredientSectionEyebrow, { color: theme.point }]}>PRODUCTS</Text>
        <View
          style={[
            styles.ingredientSectionLine,
            {
              backgroundColor: theme.point,
            },
          ]}
        />
      </View>

      <View style={styles.resultsGrid}>
        {products.map((product) => (
          <Pressable key={product.id} onPress={onOpenProductDetail} style={styles.resultGridItem}>
            <View
              style={[
                styles.ingredientProductVisualBoard,
                { backgroundColor: theme.mutedSurface },
              ]}
            >
              <Text style={styles.ingredientProductEmoji}>{productEmoji}</Text>
              <View
                style={[
                  styles.ingredientProductBadge,
                  {
                    backgroundColor: theme.surfaceAlt,
                    borderColor: theme.borderSoft,
                  },
                ]}
              >
                <Ionicons name={product.badgeIcon} size={14} color={theme.textSubtle} />
              </View>
            </View>

            <Text style={[styles.resultGridTitle, { color: theme.textStrong }]}>
              {product.name}
            </Text>
            <Text style={[styles.resultGridSummary, { color: theme.textSubtle }]}>
              {product.brand}
            </Text>
            <View style={[styles.resultDivider, { backgroundColor: theme.borderSoft }]} />
            <View style={styles.resultPriceRow}>
              <Text style={[styles.resultPriceLabel, { color: theme.point }]}>
                1일 기준 ({product.dailyDose ?? '1정'})
              </Text>
              <Text style={[styles.resultGridPrice, { color: theme.textStrong }]}>
                {product.dailyPrice}
              </Text>
            </View>
            <Text style={[styles.resultGridTotal, { color: theme.textSubtle }]}>
              {product.price} (총 {product.totalCount ?? '60정'})
            </Text>
            <Pressable
              onPress={onOpenCompare}
              style={[
                styles.ingredientProductAction,
                {
                  backgroundColor: theme.secondary,
                  borderColor: theme.borderSoft,
                },
              ]}
            >
              <Ionicons name="add-outline" size={16} color={theme.textStrong} />
              <Text style={[styles.resultActionButtonText, { color: theme.textStrong }]}>
                비교함 담기
              </Text>
            </Pressable>
          </Pressable>
        ))}
      </View>

      <View
        style={[
          styles.ingredientPairingSection,
          {
            borderColor: theme.borderSoft,
          },
        ]}
      >
        <Text style={[styles.detailSectionTitle, { color: theme.textStrong }]}>
          함께 많이 보는 조합
        </Text>
        <Text style={[styles.checkText, { color: theme.textMuted }]}>
          {pairing.message}
        </Text>
        <View style={styles.ingredientGrid}>
          {pairing.items.map((item) => (
            <View
              key={item}
              style={[
                styles.ingredientChip,
                {
                  backgroundColor: theme.mutedSurface,
                  borderColor: theme.borderSoft,
                },
              ]}
            >
              <Text style={[styles.ingredientChipText, { color: theme.textStrong }]}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
