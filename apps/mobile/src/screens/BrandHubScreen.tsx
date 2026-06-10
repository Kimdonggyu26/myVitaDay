import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { styles } from '../styles';
import { AppTheme } from '../types';

type BrandHubItem = {
  id: string;
  label: string;
  note: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type BrandHubScreenProps = {
  theme: AppTheme;
  brandLabel: string;
  onBack: () => void;
  onOpenBrandCategoryResults: (categoryLabel: string) => void;
};

const defaultBrandItems: BrandHubItem[] = [
  {
    id: 'vitamin-c',
    label: '비타민C',
    note: '기본 루틴으로 가장 먼저 비교해보는 대표 성분이에요.',
    icon: 'sunny-outline',
  },
  {
    id: 'probiotics',
    label: '유산균',
    note: '장 건강 루틴에서 많이 찾는 기본 카테고리예요.',
    icon: 'leaf-outline',
  },
  {
    id: 'multivitamin',
    label: '멀티비타민',
    note: '입문용으로 고르기 쉬운 대표 제품군이에요.',
    icon: 'grid-outline',
  },
  {
    id: 'omega3',
    label: '오메가3',
    note: '가장 자주 비교되는 스테디셀러 카테고리예요.',
    icon: 'water-outline',
  },
  {
    id: 'etc',
    label: '기타',
    note: '루테인, 비오틴, 밀크씨슬 같은 다른 제품군을 모아봤어요.',
    icon: 'apps-outline',
  },
];

const brandHubMap: Record<string, BrandHubItem[]> = {
  '종근당건강': [
    defaultBrandItems[0],
    defaultBrandItems[1],
    defaultBrandItems[2],
    {
      id: 'magnesium',
      label: '마그네슘',
      note: '수면·피로 루틴에서 자주 같이 보는 기본 성분이에요.',
      icon: 'moon-outline',
    },
    defaultBrandItems[4],
  ],
  'Nordic Naturals': [
    {
      id: 'omega3',
      label: '오메가3',
      note: '이 브랜드에서 가장 먼저 보게 되는 대표 카테고리예요.',
      icon: 'water-outline',
    },
    {
      id: 'vitamin-d',
      label: '비타민D',
      note: '기본 영양 루틴으로 함께 비교하기 좋은 축이에요.',
      icon: 'sunny-outline',
    },
    {
      id: 'children',
      label: '키즈 라인',
      note: '온가족용으로 많이 찾는 대표 라인이에요.',
      icon: 'happy-outline',
    },
    {
      id: 'prenatal',
      label: '임산부 라인',
      note: '라이프스테이지용으로 자주 함께 살펴보는 카테고리예요.',
      icon: 'heart-outline',
    },
    defaultBrandItems[4],
  ],
  NOW: [
    defaultBrandItems[0],
    defaultBrandItems[1],
    defaultBrandItems[3],
    {
      id: 'magnesium',
      label: '마그네슘',
      note: '가성비 기준으로 자주 비교하는 대표 성분이에요.',
      icon: 'moon-outline',
    },
    defaultBrandItems[4],
  ],
  '센트룸': [
    defaultBrandItems[2],
    {
      id: 'women',
      label: '여성용',
      note: '라이프스테이지별로 많이 나뉘는 대표 라인이에요.',
      icon: 'flower-outline',
    },
    {
      id: 'men',
      label: '남성용',
      note: '기본 루틴용으로 자주 찾는 대표 라인이에요.',
      icon: 'man-outline',
    },
    {
      id: 'silver',
      label: '실버 라인',
      note: '연령대별 기본 영양제로 많이 보는 카테고리예요.',
      icon: 'person-outline',
    },
    defaultBrandItems[4],
  ],
};

export function BrandHubScreen({
  theme,
  brandLabel,
  onBack,
  onOpenBrandCategoryResults,
}: BrandHubScreenProps) {
  const brandItems = brandHubMap[brandLabel] ?? defaultBrandItems;

  return (
    <ScrollView
      contentContainerStyle={styles.goalHubContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.resultsTopBar}>
        <Pressable onPress={onBack} style={styles.resultsBackButton}>
          <Ionicons name="chevron-back-outline" size={20} color={theme.textStrong} />
        </Pressable>
        <Text style={[styles.resultsHeaderTitle, { color: theme.textStrong }]}>
          브랜드별로 찾기
        </Text>
        <View style={styles.resultsCartButton} />
      </View>

      <View style={styles.goalHubHeader}>
        <Text style={[styles.goalHubTitle, { color: theme.textStrong }]}>{brandLabel}</Text>
        <Text style={[styles.goalHubMeta, { color: theme.textSubtle }]}>
          먼저 많이 보는 제품군부터 골라보세요.
        </Text>
      </View>

      <View style={styles.goalHubList}>
        {brandItems.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => onOpenBrandCategoryResults(item.label)}
            style={[styles.goalHubListRow, { borderColor: theme.borderSoft }]}
          >
            <View style={styles.goalHubListVisual}>
              <Ionicons name={item.icon} size={24} color={theme.point} />
            </View>

            <View style={styles.goalHubListContent}>
              <Text style={[styles.goalHubListTitle, { color: theme.textStrong }]}>
                {item.label}
              </Text>
              <Text style={[styles.goalHubListDescription, { color: theme.textMuted }]}>
                {item.note}
              </Text>
            </View>

            <View
              style={[
                styles.goalHubListArrowWrap,
                { backgroundColor: theme.mutedSurface },
              ]}
            >
              <Ionicons name="chevron-forward-outline" size={16} color={theme.textSubtle} />
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
