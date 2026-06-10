import {
  BottomTabItem,
  CategoryItem,
  CompareProduct,
  CompareRow,
  GoalId,
  GoalIngredientCard,
  GoalItem,
  GoalSelection,
  HighlightItem,
  ResultsContext,
  ScopeItem,
  SearchResultItem,
} from '../types';

export const categories: CategoryItem[] = [
  { id: 'multivitamin', label: '멀티비타민', icon: 'grid-outline' },
  { id: 'omega3', label: '오메가3', icon: 'water-outline' },
  { id: 'magnesium', label: '마그네슘', icon: 'moon-outline' },
  { id: 'probiotics', label: '유산균', icon: 'sparkles-outline' },
];

export const wellnessGoals: GoalItem[] = [
  { id: 'sleep', label: '수면', icon: 'moon-outline' },
  { id: 'fatigue', label: '피로·활력', icon: 'flash-outline' },
  { id: 'gut', label: '장·위 건강', icon: 'leaf-outline' },
  { id: 'immune', label: '면역', icon: 'shield-checkmark-outline' },
  { id: 'skin', label: '피부·헤어', icon: 'sparkles-outline' },
  { id: 'eye', label: '눈 건강', icon: 'eye-outline' },
  { id: 'fitness', label: '운동·근력', icon: 'barbell-outline' },
  { id: 'bloodFlow', label: '혈행', icon: 'pulse-outline' },
  { id: 'bloodSugar', label: '혈당', icon: 'water-outline' },
  { id: 'boneJoint', label: '뼈·관절', icon: 'walk-outline' },
  { id: 'women', label: '여성 건강', icon: 'flower-outline' },
  { id: 'liver', label: '간 건강', icon: 'flask-outline' },
];

export const tabs: BottomTabItem[] = [
  { id: 'home', label: '홈', icon: 'home-outline', active: true },
  { id: 'personal', label: '개인맞춤', icon: 'sparkles-outline', active: false },
  { id: 'intake', label: '복용기록', icon: 'checkbox-outline', active: false },
  { id: 'mypage', label: '마이페이지', icon: 'person-outline', active: false },
];

export const productHighlights: HighlightItem[] = [
  { label: '주요 성분', value: 'EPA + DHA 900mg' },
  { label: '가격대', value: '2만원대' },
  { label: '복용 방식', value: '하루 2캡슐' },
];

export const productIngredients = ['EPA', 'DHA', '비타민E', 'rTG 오메가3'];

export const productChecks = [
  '총가격보다 1일 기준 가격을 먼저 보면 비교가 쉬워져요.',
  '비슷한 오메가3 제품은 함량과 복용 수를 같이 보는 편이 좋아요.',
  '캡슐 수만 보지 말고 하루 복용량까지 같이 보면 더 정확해요.',
];

export const compareProducts: CompareProduct[] = [
  {
    id: 'jong-rtg',
    brand: '종근당건강',
    name: '프로메가 알티지 오메가3',
    price: '29,900원',
    dailyPrice: '1일 498원',
    dose: '하루 2캡슐',
    amount: 'EPA+DHA 900mg',
  },
  {
    id: 'sports-research',
    brand: 'Sports Research',
    name: '오메가3',
    price: '34,500원',
    dailyPrice: '1일 575원',
    dose: '하루 1캡슐',
    amount: 'EPA+DHA 1,040mg',
  },
  {
    id: 'now-ultra',
    brand: 'NOW',
    name: '울트라 오메가3',
    price: '27,800원',
    dailyPrice: '1일 463원',
    dose: '하루 2소프트젤',
    amount: 'EPA+DHA 1,000mg',
  },
];

export const compareRows: CompareRow[] = [
  { label: '총 가격', values: ['29,900원', '34,500원', '27,800원'] },
  { label: '1일 기준', values: ['498원', '575원', '463원'] },
  { label: '총 함량', values: ['900mg', '1,040mg', '1,000mg'] },
  { label: '복용량', values: ['2캡슐', '1캡슐', '2소프트젤'] },
  { label: '일수', values: ['60일분', '60일분', '60일분'] },
];

export const searchResults: SearchResultItem[] = [
  {
    id: 'jong-rtg',
    brand: '종근당건강',
    name: '프로메가 알티지 오메가3',
    summary: 'EPA+DHA 900mg',
    price: '29,900원',
    dailyPrice: '1일 498원',
    visualWidth: 96,
    visualHeight: 40,
    visualRadius: 22,
    visualColor: '#f8f8f4',
    badgeIcon: 'water-outline',
  },
  {
    id: 'sports-research',
    brand: 'Sports Research',
    name: '트리플 스트렝스 오메가3',
    summary: '1캡슐 고함량',
    price: '34,500원',
    dailyPrice: '1일 575원',
    visualWidth: 48,
    visualHeight: 94,
    visualRadius: 26,
    visualColor: '#6b2d1f',
    badgeIcon: 'leaf-outline',
  },
  {
    id: 'now-ultra',
    brand: 'NOW',
    name: '울트라 오메가3',
    summary: '가성비 비교 인기',
    price: '27,800원',
    dailyPrice: '1일 463원',
    visualWidth: 42,
    visualHeight: 102,
    visualRadius: 24,
    visualColor: '#242424',
    badgeIcon: 'flash-outline',
  },
  {
    id: 'vegan-omega',
    brand: 'Nordic Naturals',
    name: '알지 오메가',
    summary: '비건 원료 비교',
    price: '31,200원',
    dailyPrice: '1일 520원',
    visualWidth: 54,
    visualHeight: 102,
    visualRadius: 26,
    visualColor: '#f4f5f6',
    badgeIcon: 'sparkles-outline',
  },
];

export const resultScopes: ScopeItem[] = [
  { id: 'all', label: '전체', active: true },
  { id: 'domestic', label: '국내제품', active: false },
  { id: 'global', label: '해외제품', active: false },
];

const ingredientDetailDescriptions: Record<string, string> = {
  마그네슘:
    '마그네슘은 신경과 근육 기능 유지에 필요한 영양소예요. 몸이 예민하게 긴장된 느낌이 있을 때 저녁 루틴으로 함께 찾는 경우가 많아요.',
  테아닌:
    '테아닌은 차 성분에서 유래한 아미노산으로, 긴장 완화에 도움을 줄 수 있는 성분으로 알려져 있어요. 잠들기 전 루틴을 조금 더 부드럽게 가져가고 싶을 때 많이 찾아요.',
  멜라토닌:
    '멜라토닌은 수면-각성 리듬과 관련된 성분이에요. 잠드는 시간대를 일정하게 관리하고 싶을 때 비교해보는 경우가 많아요.',
  감태추출물:
    '감태추출물은 수면의 질과 관련된 기능성 원료로 많이 알려져 있어요. 잠들기 전 루틴을 조금 더 편안하게 가져가고 싶을 때 함께 보는 편이에요.',
  GABA:
    'GABA는 우리 몸의 신경 전달과 관련된 물질로 알려져 있어요. 긴장을 낮추는 저녁 루틴 쪽으로 비교해보는 경우가 많아요.',
  락티움:
    '락티움은 우유 단백질을 가공해 만든 원료예요. 잠들기 전 예민한 컨디션을 부드럽게 관리하는 루틴에서 함께 보는 편이에요.',
  비타민B군:
    '비타민B군은 에너지 대사와 관련된 여러 비타민을 묶어 부르는 말이에요. 피로감이나 활력 루틴에서 기본 성분처럼 많이 찾아요.',
  홍삼:
    '홍삼은 인삼을 쪄서 만든 원료로, 일상 활력 루틴에서 꾸준히 찾는 편이에요. 함량이나 농축 정도를 같이 비교하는 경우가 많아요.',
  코엔자임Q10:
    '코엔자임Q10은 세포 에너지 생성과 관련된 성분으로 알려져 있어요. 활력이나 혈행 루틴에서 함께 비교해보는 경우가 많아요.',
  유산균:
    '유산균은 장내 환경을 관리하는 데 많이 쓰는 대표 성분이에요. 제품을 볼 때는 균주 종류, 보장균 수, 함께 들어 있는 부원료를 같이 비교하는 편이에요.',
  프리바이오틱스:
    '프리바이오틱스는 유익균의 먹이가 되는 성분이에요. 유산균 제품과 함께 장 루틴을 볼 때 자주 같이 비교해요.',
  소화효소:
    '소화효소는 음식물을 분해하는 데 관여하는 효소 성분이에요. 식후 더부룩함 같은 일상 루틴을 관리할 때 함께 찾는 편이에요.',
  포스트바이오틱스:
    '포스트바이오틱스는 유산균 대사산물 기반의 성분을 말해요. 유산균과 어떤 차이가 있는지 비교해보며 찾는 경우가 많아요.',
  식이섬유:
    '식이섬유는 장 운동과 배변 루틴에서 많이 찾는 기본 성분이에요. 물과 함께 섭취하는 방식이나 1회 함량을 같이 보는 편이에요.',
  비타민C:
    '비타민C는 항산화 작용과 기본 영양 관리 쪽에서 가장 많이 찾는 성분 중 하나예요. 제품을 볼 때는 함량, 섭취 횟수, 같이 들어 있는 아연 같은 성분을 함께 보는 편이에요.',
  아연:
    '아연은 면역과 기본 영양 루틴에서 자주 보는 미네랄이에요. 1일 함량과 다른 비타민과의 조합을 같이 비교하는 경우가 많아요.',
  프로폴리스:
    '프로폴리스는 벌이 식물 수지 등을 모아 만든 성분이에요. 목 컨디션이나 일상 면역 루틴 쪽으로 함께 찾는 경우가 많아요.',
  베타글루칸:
    '베타글루칸은 효모나 버섯류 등에 들어 있는 다당류 성분이에요. 면역 기능성 원료 중심으로 제품을 비교할 때 자주 등장해요.',
  셀렌:
    '셀렌은 항산화와 관련해 많이 언급되는 미네랄이에요. 기본 영양 루틴을 탄탄하게 챙기고 싶을 때 함께 비교하는 편이에요.',
  콜라겐:
    '콜라겐은 피부나 관절 같은 조직의 탄력과 구조를 이루는 단백질이에요. 영양제는 그걸 보충하는 루틴으로 많이 찾는 편이고, 제품을 볼 때는 저분자 여부나 1회 섭취량을 같이 봐요.',
  비오틴:
    '비오틴은 비타민B군에 속하는 영양소예요. 피부와 헤어 루틴에서 많이 찾고, 다른 미용 성분과 함께 비교하는 경우가 많아요.',
  히알루론산:
    '히알루론산은 수분을 끌어당기는 성질로 알려진 성분이에요. 피부 보습감 루틴에서 콜라겐과 함께 비교하는 편이에요.',
  세라마이드:
    '세라마이드는 피부 장벽을 이루는 지질 성분 중 하나예요. 피부가 쉽게 건조해지는 루틴에서 함께 찾는 경우가 많아요.',
  루테인:
    '루테인은 눈에서 중요한 역할을 하는 색소 성분으로 알려져 있어요. 눈 건강 루틴에서 많이 찾고, 제품을 볼 때는 루테인 함량과 지아잔틴 조합을 함께 보는 편이에요.',
  아스타잔틴:
    '아스타잔틴은 카로티노이드 계열의 붉은 색소 성분이에요. 눈 피로나 항산화 루틴과 함께 비교해보는 경우가 많아요.',
  오메가3:
    '오메가3는 EPA와 DHA를 포함하는 지방산 성분이에요. 혈행이나 눈 건강 루틴에서 많이 찾고, 제품을 볼 때는 총 함량보다 EPA·DHA 구성과 하루 섭취량을 같이 보는 편이에요.',
  지아잔틴:
    '지아잔틴은 루테인과 함께 자주 언급되는 눈 건강 성분이에요. 루테인 제품을 비교할 때 조합 성분으로 같이 보는 경우가 많아요.',
  비타민A:
    '비타민A는 눈과 피부 등 기본적인 신체 기능에 필요한 영양소예요. 눈 건강 루틴에서 기초 성분까지 같이 챙기고 싶을 때 찾는 편이에요.',
  크레아틴:
    '크레아틴은 근육에서 빠르게 에너지를 쓰는 데 관여하는 성분으로 알려져 있어요. 고강도 운동이나 반복 수행 능력을 끌어올리는 루틴에서 많이 찾고, 근육 안 수분량 변화로 더 차오른 느낌을 기대하며 비교하는 경우도 있어요.',
  BCAA:
    'BCAA는 류신, 이소류신, 발린 같은 가지사슬아미노산을 묶어 부르는 말이에요. 운동 전후 루틴에서 아미노산 제품을 고를 때 자주 비교해요.',
  아르기닌:
    '아르기닌은 아미노산의 한 종류예요. 운동 전 루틴이나 펌핑감을 기대하는 흐름에서 함께 찾는 경우가 많아요.',
  단백질:
    '단백질은 근육과 신체 조직을 이루는 기본 영양소예요. 운동 루틴에서는 1회 단백질 함량과 맛, 가격을 같이 비교하는 편이에요.',
  카페인:
    '카페인은 각성감과 집중감 쪽으로 잘 알려진 성분이에요. 운동 전 루틴이나 활력 루틴에서 함량을 비교해보는 경우가 많아요.',
  타우린:
    '타우린은 에너지 음료 성분으로 익숙한 아미노산 계열 성분이에요. 운동 후 회복 루틴이나 활력 루틴에서 함께 비교하는 편이에요.',
  비타민E:
    '비타민E는 항산화와 관련해 많이 찾는 지용성 비타민이에요. 오메가3나 기본 영양 루틴과 함께 비교해보는 경우가 많아요.',
  은행잎추출물:
    '은행잎추출물은 혈행이나 기억력 루틴에서 자주 언급되는 원료예요. 다른 항산화 성분과 함께 비교하는 경우가 많아요.',
  바나바잎추출물:
    '바나바잎추출물은 식후 혈당 관리 루틴에서 자주 찾는 원료예요. 기본 식단 관리와 함께 보조적으로 비교해보는 경우가 많아요.',
  여주추출물:
    '여주추출물은 혈당 관리 쪽에서 자주 언급되는 식물성 원료예요. 바나바잎추출물과 함께 비교해보는 경우가 많아요.',
  크롬:
    '크롬은 탄수화물 대사와 관련해 자주 언급되는 미네랄이에요. 혈당 관리 루틴에서 기초 성분으로 함께 비교하는 편이에요.',
  칼슘:
    '칼슘은 뼈와 치아 건강에 가장 기본적으로 떠오르는 미네랄이에요. 비타민D와 조합으로 같이 비교하는 경우가 많아요.',
  비타민D:
    '비타민D는 칼슘 흡수와 뼈 건강 루틴에서 자주 함께 보는 영양소예요. 함량과 섭취 주기를 같이 보는 편이에요.',
  MSM:
    'MSM은 관절과 움직임 루틴에서 자주 언급되는 성분이에요. 관절 관련 성분들과 함께 비교하는 경우가 많아요.',
  글루코사민:
    '글루코사민은 관절과 연골 루틴에서 많이 찾는 대표 성분 중 하나예요. MSM이나 콘드로이친과 함께 비교하는 편이에요.',
  엽산:
    '엽산은 세포 분열과 기본 영양 관리에서 중요한 비타민이에요. 여성 건강 루틴에서 기본 성분처럼 많이 찾는 편이에요.',
  철분:
    '철분은 활력과 기본 컨디션 루틴에서 자주 언급되는 미네랄이에요. 함량과 흡수 보조 성분 조합을 같이 보는 경우가 많아요.',
  감마리놀렌산:
    '감마리놀렌산은 달맞이꽃종자유 등에서 많이 언급되는 지방산 성분이에요. 여성 컨디션 루틴에서 자주 함께 비교해요.',
  밀크씨슬:
    '밀크씨슬은 간 건강 루틴에서 많이 찾는 대표 성분이에요. 제품을 볼 때는 보통 실리마린 함량, 하루 섭취량, 함께 들어 있는 비타민B군 조합을 같이 비교해요.',
  헛개나무추출물:
    '헛개나무추출물은 간 컨디션 루틴에서 자주 언급되는 식물성 원료예요. 밀크씨슬과 함께 비교해보는 경우가 많아요.',
};

const withDetailDescriptions = (cards: GoalIngredientCard[]): GoalIngredientCard[] =>
  cards.map((card) => ({
    ...card,
    detailDescription:
      ingredientDetailDescriptions[card.name] ?? card.detailDescription ?? card.description,
  }));

const sleepIngredients: GoalIngredientCard[] = [
  {
    name: '마그네슘',
    description: '신경과 근육 기능 유지에 필요한 영양소예요. 잠들기 전 루틴에서 많이 봐요.',
    detailDescription:
      '마그네슘은 신경과 근육 기능 유지에 필요한 영양소예요. 몸이 예민하게 긴장된 느낌이 있을 때 저녁 루틴으로 함께 찾는 경우가 많아요.',
    priceHint: '보통 1알 300원대',
    visualWidth: 92,
    visualHeight: 38,
    visualRadius: 20,
    visualColor: '#f4f5f6',
    badgeIcon: 'moon-outline',
  },
  {
    name: '테아닌',
    description: '긴장 완화에 도움을 줄 수 있어요. 수면 전 루틴에서 자주 함께 봐요.',
    detailDescription:
      '테아닌은 차 성분에서 유래한 아미노산으로, 긴장 완화에 도움을 줄 수 있는 성분으로 알려져 있어요. 잠들기 전 루틴을 조금 더 부드럽게 가져가고 싶을 때 많이 찾아요.',
    priceHint: '보통 1알 400원대',
    visualWidth: 42,
    visualHeight: 96,
    visualRadius: 24,
    visualColor: '#f6f7f8',
    badgeIcon: 'moon-outline',
  },
  {
    name: '멜라토닌',
    description: '취침 타이밍 루틴에서 자주 비교하는 성분이에요.',
    detailDescription:
      '멜라토닌은 수면-각성 리듬과 관련된 성분이에요. 잠드는 시간대를 일정하게 관리하고 싶을 때 비교해보는 경우가 많아요.',
    priceHint: '보통 1알 500원대',
    visualWidth: 44,
    visualHeight: 92,
    visualRadius: 24,
    visualColor: '#39251f',
    badgeIcon: 'moon-outline',
  },
  {
    name: '감태추출물',
    description: '부드러운 수면 루틴을 찾을 때 함께 보는 편이에요.',
    priceHint: '보통 1알 600원대',
    visualWidth: 48,
    visualHeight: 90,
    visualRadius: 24,
    visualColor: '#dde4dc',
    badgeIcon: 'moon-outline',
  },
  {
    name: 'GABA',
    description: '편안한 밤 루틴 쪽으로 자주 함께 비교해요.',
    priceHint: '보통 1알 500원대',
    visualWidth: 46,
    visualHeight: 88,
    visualRadius: 22,
    visualColor: '#f2f2f4',
    badgeIcon: 'moon-outline',
  },
  {
    name: '락티움',
    description: '잔잔한 밤 컨디션을 보고 싶을 때 함께 보는 편이에요.',
    priceHint: '보통 1알 700원대',
    visualWidth: 44,
    visualHeight: 86,
    visualRadius: 22,
    visualColor: '#f5f0ea',
    badgeIcon: 'moon-outline',
  },
];

const fatigueIngredients: GoalIngredientCard[] = [
  {
    name: '비타민B군',
    description: '피로·활력 쪽에서 가장 기본으로 많이 보는 성분이에요.',
    priceHint: '보통 1알 300원대',
    visualWidth: 92,
    visualHeight: 34,
    visualRadius: 18,
    visualColor: '#f7f6f3',
    badgeIcon: 'flash-outline',
  },
  {
    name: '홍삼',
    description: '활력 루틴에서 대표적으로 많이 찾는 편이에요.',
    priceHint: '보통 하루 800원대',
    visualWidth: 44,
    visualHeight: 94,
    visualRadius: 24,
    visualColor: '#7b3024',
    badgeIcon: 'flame-outline',
  },
  {
    name: '마그네슘',
    description: '긴장과 피로 루틴을 같이 볼 때 자주 비교해요.',
    priceHint: '보통 1알 300원대',
    visualWidth: 92,
    visualHeight: 38,
    visualRadius: 20,
    visualColor: '#f4f5f6',
    badgeIcon: 'flash-outline',
  },
  {
    name: '코엔자임Q10',
    description: '에너지 루틴 쪽으로 함께 비교하는 경우가 많아요.',
    priceHint: '보통 1알 600원대',
    visualWidth: 42,
    visualHeight: 88,
    visualRadius: 22,
    visualColor: '#5f2c1f',
    badgeIcon: 'flash-outline',
  },
];

const gutIngredients: GoalIngredientCard[] = [
  {
    name: '유산균',
    description: '장·위 건강에서 가장 먼저 찾는 기본 성분이에요.',
    detailDescription:
      '유산균은 장내 환경을 관리하는 데 많이 쓰는 대표 성분이에요. 제품을 볼 때는 균주 종류, 보장균 수, 함께 들어 있는 부원료를 같이 비교하는 편이에요.',
    priceHint: '보통 하루 400원대',
    visualWidth: 46,
    visualHeight: 96,
    visualRadius: 24,
    visualColor: '#f6f7f8',
    badgeIcon: 'leaf-outline',
  },
  {
    name: '프리바이오틱스',
    description: '유산균과 같이 기본 조합으로 많이 봐요.',
    priceHint: '보통 하루 300원대',
    visualWidth: 92,
    visualHeight: 36,
    visualRadius: 18,
    visualColor: '#f4efe7',
    badgeIcon: 'flower-outline',
  },
  {
    name: '소화효소',
    description: '식후 더부룩함 루틴에서 같이 비교해보는 편이에요.',
    priceHint: '보통 하루 500원대',
    visualWidth: 48,
    visualHeight: 88,
    visualRadius: 24,
    visualColor: '#d9c4aa',
    badgeIcon: 'restaurant-outline',
  },
  {
    name: '포스트바이오틱스',
    description: '유산균 제품과 함께 비교하는 경우가 많아요.',
    priceHint: '보통 하루 500원대',
    visualWidth: 46,
    visualHeight: 90,
    visualRadius: 22,
    visualColor: '#ece8e1',
    badgeIcon: 'leaf-outline',
  },
  {
    name: '식이섬유',
    description: '배변 루틴 쪽까지 함께 볼 때 자주 찾는 편이에요.',
    priceHint: '보통 하루 300원대',
    visualWidth: 94,
    visualHeight: 34,
    visualRadius: 18,
    visualColor: '#f3efe7',
    badgeIcon: 'nutrition-outline',
  },
];

const immuneIngredients: GoalIngredientCard[] = [
  {
    name: '비타민C',
    description: '면역 쪽에서 가장 기본으로 많이 보는 성분이에요.',
    detailDescription:
      '비타민C는 항산화 작용과 기본 영양 관리 쪽에서 가장 많이 찾는 성분 중 하나예요. 제품을 볼 때는 함량, 섭취 횟수, 같이 들어 있는 아연 같은 성분을 함께 보는 편이에요.',
    priceHint: '보통 1알 200원대',
    visualWidth: 92,
    visualHeight: 36,
    visualRadius: 18,
    visualColor: '#f7f7f5',
    badgeIcon: 'shield-checkmark-outline',
  },
  {
    name: '아연',
    description: '비타민C와 같이 많이 보는 대표 조합이에요.',
    priceHint: '보통 1알 200원대',
    visualWidth: 42,
    visualHeight: 86,
    visualRadius: 22,
    visualColor: '#f3f4f6',
    badgeIcon: 'flash-outline',
  },
  {
    name: '프로폴리스',
    description: '목 컨디션까지 같이 볼 때 자주 비교해요.',
    priceHint: '보통 하루 500원대',
    visualWidth: 44,
    visualHeight: 92,
    visualRadius: 24,
    visualColor: '#5e2f1f',
    badgeIcon: 'leaf-outline',
  },
  {
    name: '베타글루칸',
    description: '기능성 중심으로 한 번 더 비교할 때 많이 봐요.',
    priceHint: '보통 하루 600원대',
    visualWidth: 46,
    visualHeight: 88,
    visualRadius: 24,
    visualColor: '#efe3cf',
    badgeIcon: 'sparkles-outline',
  },
  {
    name: '홍삼',
    description: '면역과 활력 쪽을 함께 볼 때 자주 찾는 편이에요.',
    priceHint: '보통 하루 800원대',
    visualWidth: 44,
    visualHeight: 94,
    visualRadius: 24,
    visualColor: '#7b3024',
    badgeIcon: 'flame-outline',
  },
  {
    name: '셀렌',
    description: '항산화 루틴까지 같이 볼 때 함께 비교해요.',
    priceHint: '보통 1알 300원대',
    visualWidth: 40,
    visualHeight: 84,
    visualRadius: 22,
    visualColor: '#f6f7f5',
    badgeIcon: 'shield-checkmark-outline',
  },
];

const skinIngredients: GoalIngredientCard[] = [
  {
    name: '콜라겐',
    description: '피부 쪽에서 가장 먼저 찾는 대표 성분이에요.',
    detailDescription:
      '콜라겐은 피부나 관절 같은 조직의 탄력과 구조를 이루는 단백질이에요. 영양제는 그걸 보충하는 루틴으로 많이 찾는 편이고, 제품을 볼 때는 저분자 여부나 1회 섭취량을 같이 봐요.',
    priceHint: '보통 하루 700원대',
    visualWidth: 98,
    visualHeight: 34,
    visualRadius: 18,
    visualColor: '#f5f2ee',
    badgeIcon: 'sparkles-outline',
  },
  {
    name: '비오틴',
    description: '피부와 헤어를 같이 볼 때 자주 찾는 편이에요.',
    priceHint: '보통 1알 300원대',
    visualWidth: 40,
    visualHeight: 88,
    visualRadius: 22,
    visualColor: '#fafafa',
    badgeIcon: 'flower-outline',
  },
  {
    name: '비타민C',
    description: '콜라겐 루틴과 함께 기본 조합으로 많이 봐요.',
    priceHint: '보통 1알 200원대',
    visualWidth: 92,
    visualHeight: 34,
    visualRadius: 18,
    visualColor: '#f8f8f6',
    badgeIcon: 'sunny-outline',
  },
  {
    name: '히알루론산',
    description: '보습감 루틴을 볼 때 함께 찾는 편이에요.',
    priceHint: '보통 하루 600원대',
    visualWidth: 42,
    visualHeight: 90,
    visualRadius: 24,
    visualColor: '#eef3f8',
    badgeIcon: 'water-outline',
  },
  {
    name: '세라마이드',
    description: '피부 장벽 쪽으로 함께 비교하는 경우가 많아요.',
    priceHint: '보통 하루 700원대',
    visualWidth: 44,
    visualHeight: 88,
    visualRadius: 22,
    visualColor: '#f1ebe3',
    badgeIcon: 'sparkles-outline',
  },
];

const eyeIngredients: GoalIngredientCard[] = [
  {
    name: '루테인',
    description: '눈 건강에서 가장 먼저 보는 기본 성분이에요.',
    detailDescription:
      '루테인은 눈에서 중요한 역할을 하는 색소 성분으로 알려져 있어요. 눈 건강 루틴에서 많이 찾고, 제품을 볼 때는 루테인 함량과 지아잔틴 조합을 함께 보는 편이에요.',
    priceHint: '보통 하루 400원대',
    visualWidth: 46,
    visualHeight: 92,
    visualRadius: 24,
    visualColor: '#f4b736',
    badgeIcon: 'eye-outline',
  },
  {
    name: '아스타잔틴',
    description: '루테인과 함께 자주 비교하는 편이에요.',
    priceHint: '보통 하루 600원대',
    visualWidth: 42,
    visualHeight: 88,
    visualRadius: 22,
    visualColor: '#7e2b23',
    badgeIcon: 'sparkles-outline',
  },
  {
    name: '오메가3',
    description: '눈 피로와 건조감 루틴까지 같이 볼 때 자주 봐요.',
    priceHint: '보통 하루 500원대',
    visualWidth: 46,
    visualHeight: 90,
    visualRadius: 24,
    visualColor: '#8a331f',
    badgeIcon: 'water-outline',
  },
  {
    name: '지아잔틴',
    description: '루테인 제품을 볼 때 함께 비교하는 경우가 많아요.',
    priceHint: '보통 하루 500원대',
    visualWidth: 42,
    visualHeight: 86,
    visualRadius: 22,
    visualColor: '#efb248',
    badgeIcon: 'eye-outline',
  },
  {
    name: '비타민A',
    description: '기초 성분까지 같이 보는 루틴에서 자주 함께 봐요.',
    priceHint: '보통 1알 200원대',
    visualWidth: 92,
    visualHeight: 34,
    visualRadius: 18,
    visualColor: '#f6f7f5',
    badgeIcon: 'sunny-outline',
  },
];

const fitnessIngredients: GoalIngredientCard[] = [
  {
    name: '크레아틴',
    description: '운동·근력 쪽에서 가장 먼저 찾는 대표 성분이에요.',
    detailDescription:
      '크레아틴은 근육에서 빠르게 에너지를 쓰는 데 관여하는 성분으로 알려져 있어요. 고강도 운동이나 반복 수행 능력을 끌어올리는 루틴에서 많이 찾고, 근육 안 수분량 변화로 더 차오른 느낌을 기대하며 비교하는 경우도 있어요.',
    priceHint: '보통 하루 500원대',
    visualWidth: 96,
    visualHeight: 34,
    visualRadius: 18,
    visualColor: '#f3f2ef',
    badgeIcon: 'barbell-outline',
  },
  {
    name: 'BCAA',
    description: '운동 후 루틴에서 자주 함께 보는 편이에요.',
    priceHint: '보통 하루 700원대',
    visualWidth: 44,
    visualHeight: 90,
    visualRadius: 24,
    visualColor: '#2a2a2a',
    badgeIcon: 'flash-outline',
  },
  {
    name: '아르기닌',
    description: '운동 전 루틴에서 같이 비교하는 경우가 많아요.',
    priceHint: '보통 하루 600원대',
    visualWidth: 42,
    visualHeight: 88,
    visualRadius: 22,
    visualColor: '#f4f4f5',
    badgeIcon: 'thunderstorm-outline',
  },
  {
    name: '단백질',
    description: '가장 대중적인 운동 루틴이라 가격과 1회량을 같이 봐요.',
    priceHint: '보통 1회 900원대',
    visualWidth: 96,
    visualHeight: 36,
    visualRadius: 18,
    visualColor: '#efe6db',
    badgeIcon: 'fitness-outline',
  },
  {
    name: '카페인',
    description: '운동 전 집중감 쪽으로 함께 비교하는 경우가 많아요.',
    priceHint: '보통 1알 300원대',
    visualWidth: 40,
    visualHeight: 84,
    visualRadius: 22,
    visualColor: '#3d2f2b',
    badgeIcon: 'flash-outline',
  },
  {
    name: '타우린',
    description: '운동 후 루틴과 함께 자주 비교하는 편이에요.',
    priceHint: '보통 1알 400원대',
    visualWidth: 92,
    visualHeight: 34,
    visualRadius: 18,
    visualColor: '#f5f6f7',
    badgeIcon: 'thunderstorm-outline',
  },
];

const bloodFlowIngredients: GoalIngredientCard[] = [
  {
    name: '오메가3',
    description: '혈행 쪽에서 가장 먼저 비교하는 대표 성분이에요.',
    detailDescription:
      '오메가3는 EPA와 DHA를 포함하는 지방산 성분이에요. 혈행이나 눈 건강 루틴에서 많이 찾고, 제품을 볼 때는 총 함량보다 EPA·DHA 구성과 하루 섭취량을 같이 보는 편이에요.',
    priceHint: '보통 하루 500원대',
    visualWidth: 94,
    visualHeight: 34,
    visualRadius: 18,
    visualColor: '#f5f2ee',
    badgeIcon: 'water-outline',
  },
  {
    name: '코엔자임Q10',
    description: '혈행과 활력 루틴을 함께 볼 때 자주 찾아요.',
    priceHint: '보통 1알 600원대',
    visualWidth: 42,
    visualHeight: 88,
    visualRadius: 22,
    visualColor: '#5f2c1f',
    badgeIcon: 'pulse-outline',
  },
  {
    name: '비타민E',
    description: '기초 항산화 루틴과 함께 비교하는 경우가 많아요.',
    priceHint: '보통 1알 300원대',
    visualWidth: 90,
    visualHeight: 34,
    visualRadius: 18,
    visualColor: '#f7f6f3',
    badgeIcon: 'sparkles-outline',
  },
  {
    name: '은행잎추출물',
    description: '혈행과 기억력 쪽을 같이 볼 때 자주 비교해요.',
    priceHint: '보통 하루 600원대',
    visualWidth: 44,
    visualHeight: 90,
    visualRadius: 22,
    visualColor: '#d9d6b0',
    badgeIcon: 'leaf-outline',
  },
];

const bloodSugarIngredients: GoalIngredientCard[] = [
  {
    name: '바나바잎추출물',
    description: '혈당 관리 쪽에서 대표적으로 많이 보는 성분이에요.',
    priceHint: '보통 하루 500원대',
    visualWidth: 92,
    visualHeight: 34,
    visualRadius: 18,
    visualColor: '#ece4d8',
    badgeIcon: 'water-outline',
  },
  {
    name: '여주추출물',
    description: '식후 혈당 루틴에서 자주 함께 봐요.',
    priceHint: '보통 하루 500원대',
    visualWidth: 46,
    visualHeight: 88,
    visualRadius: 22,
    visualColor: '#d8e3cf',
    badgeIcon: 'leaf-outline',
  },
  {
    name: '크롬',
    description: '기초 미네랄까지 같이 보고 싶을 때 비교해요.',
    priceHint: '보통 1알 200원대',
    visualWidth: 40,
    visualHeight: 84,
    visualRadius: 22,
    visualColor: '#f3f4f6',
    badgeIcon: 'sparkles-outline',
  },
  {
    name: '식이섬유',
    description: '식후 관리 루틴과 함께 자주 비교해요.',
    priceHint: '보통 하루 300원대',
    visualWidth: 94,
    visualHeight: 34,
    visualRadius: 18,
    visualColor: '#f3efe7',
    badgeIcon: 'nutrition-outline',
  },
];

const boneJointIngredients: GoalIngredientCard[] = [
  {
    name: '칼슘',
    description: '뼈 건강 쪽에서 가장 기본으로 보는 성분이에요.',
    priceHint: '보통 1알 300원대',
    visualWidth: 92,
    visualHeight: 34,
    visualRadius: 18,
    visualColor: '#f7f7f5',
    badgeIcon: 'walk-outline',
  },
  {
    name: '비타민D',
    description: '칼슘과 같이 기본 조합으로 자주 비교해요.',
    priceHint: '보통 1알 200원대',
    visualWidth: 42,
    visualHeight: 84,
    visualRadius: 22,
    visualColor: '#f8f8f6',
    badgeIcon: 'sunny-outline',
  },
  {
    name: 'MSM',
    description: '관절 쪽까지 함께 볼 때 많이 찾는 편이에요.',
    priceHint: '보통 하루 600원대',
    visualWidth: 92,
    visualHeight: 34,
    visualRadius: 18,
    visualColor: '#f2f2ef',
    badgeIcon: 'fitness-outline',
  },
  {
    name: '글루코사민',
    description: '관절 루틴을 깊게 볼 때 자주 비교하는 성분이에요.',
    priceHint: '보통 하루 700원대',
    visualWidth: 46,
    visualHeight: 88,
    visualRadius: 22,
    visualColor: '#efe7de',
    badgeIcon: 'walk-outline',
  },
];

const womenIngredients: GoalIngredientCard[] = [
  {
    name: '엽산',
    description: '여성 건강 루틴에서 기본으로 많이 보는 성분이에요.',
    priceHint: '보통 1알 200원대',
    visualWidth: 92,
    visualHeight: 34,
    visualRadius: 18,
    visualColor: '#f7f7f5',
    badgeIcon: 'flower-outline',
  },
  {
    name: '철분',
    description: '활력과 컨디션까지 함께 볼 때 자주 비교해요.',
    priceHint: '보통 1알 300원대',
    visualWidth: 42,
    visualHeight: 88,
    visualRadius: 22,
    visualColor: '#6d2b23',
    badgeIcon: 'flash-outline',
  },
  {
    name: '감마리놀렌산',
    description: '주기 컨디션 루틴에서 자주 함께 봐요.',
    priceHint: '보통 하루 700원대',
    visualWidth: 46,
    visualHeight: 90,
    visualRadius: 22,
    visualColor: '#f4d9a6',
    badgeIcon: 'flower-outline',
  },
  {
    name: '비오틴',
    description: '피부·헤어 루틴까지 같이 볼 때 함께 비교해요.',
    priceHint: '보통 1알 300원대',
    visualWidth: 40,
    visualHeight: 86,
    visualRadius: 22,
    visualColor: '#fafafa',
    badgeIcon: 'sparkles-outline',
  },
];

const liverIngredients: GoalIngredientCard[] = [
  {
    name: '밀크씨슬',
    description: '간 건강에서 가장 먼저 찾는 대표 성분이에요.',
    detailDescription:
      '밀크씨슬은 간 건강 루틴에서 많이 찾는 대표 성분이에요. 제품을 볼 때는 보통 실리마린 함량, 하루 섭취량, 함께 들어 있는 비타민B군 조합을 같이 비교해요.',
    priceHint: '보통 1알 400원대',
    visualWidth: 44,
    visualHeight: 90,
    visualRadius: 22,
    visualColor: '#7a4a30',
    badgeIcon: 'flask-outline',
  },
  {
    name: '헛개나무추출물',
    description: '간 컨디션 루틴에서 자주 함께 비교해요.',
    priceHint: '보통 하루 600원대',
    visualWidth: 94,
    visualHeight: 34,
    visualRadius: 18,
    visualColor: '#d8c8b6',
    badgeIcon: 'leaf-outline',
  },
  {
    name: '비타민B군',
    description: '기초 활력 루틴과 같이 볼 때 함께 찾아요.',
    priceHint: '보통 1알 300원대',
    visualWidth: 92,
    visualHeight: 34,
    visualRadius: 18,
    visualColor: '#f7f6f3',
    badgeIcon: 'flash-outline',
  },
  {
    name: '아연',
    description: '기초 미네랄 루틴까지 같이 볼 때 자주 비교해요.',
    priceHint: '보통 1알 200원대',
    visualWidth: 42,
    visualHeight: 84,
    visualRadius: 22,
    visualColor: '#f3f4f6',
    badgeIcon: 'sparkles-outline',
  },
];

export const goalIngredientMap: Record<GoalId, GoalIngredientCard[]> = {
  sleep: withDetailDescriptions(sleepIngredients),
  fatigue: withDetailDescriptions(fatigueIngredients),
  gut: withDetailDescriptions(gutIngredients),
  immune: withDetailDescriptions(immuneIngredients),
  skin: withDetailDescriptions(skinIngredients),
  eye: withDetailDescriptions(eyeIngredients),
  fitness: withDetailDescriptions(fitnessIngredients),
  bloodFlow: withDetailDescriptions(bloodFlowIngredients),
  bloodSugar: withDetailDescriptions(bloodSugarIngredients),
  boneJoint: withDetailDescriptions(boneJointIngredients),
  women: withDetailDescriptions(womenIngredients),
  liver: withDetailDescriptions(liverIngredients),
};

export const defaultGoalSelection: GoalSelection = {
  id: 'sleep',
  label: '수면',
};

export const defaultResultsContext: ResultsContext = {
  headerTitle: '검색 결과',
  queryTitle: '오메가3',
  queryMeta: '24개 결과',
  mode: 'search',
  backScreen: 'home',
};
