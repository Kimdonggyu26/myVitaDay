import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { styles } from '../styles';
import { AppTheme } from '../types';

type BrandFilter = 'all' | 'domestic' | 'global';

type BrandItem = {
  id: string;
  label: string;
  note: string;
  market: 'domestic' | 'global';
};

type BrandListScreenProps = {
  theme: AppTheme;
  selectedFilter: BrandFilter;
  onBack: () => void;
  onSelectFilter: (filter: BrandFilter) => void;
  onOpenBrandResults: (brandLabel: string) => void;
};

const filterTabs: Array<{ id: BrandFilter; label: string }> = [
  { id: 'all', label: '전체' },
  { id: 'domestic', label: '국내제품' },
  { id: 'global', label: '해외제품' },
];

const brandItems: BrandItem[] = [
  {
    id: 'ckd',
    label: '종근당건강',
    note: '기본 영양제부터 프로바이오틱스까지 많이 찾는 국내 브랜드예요.',
    market: 'domestic',
  },
  {
    id: 'lactofit',
    label: '락토핏',
    note: '유산균 쪽에서 가장 먼저 떠올리는 대표 브랜드예요.',
    market: 'domestic',
  },
  {
    id: 'gnm',
    label: 'GNM',
    note: '가성비 비교에서 자주 함께 보는 국내 브랜드예요.',
    market: 'domestic',
  },
  {
    id: 'centrum',
    label: '센트룸',
    note: '멀티비타민으로 많이 찾는 익숙한 글로벌 브랜드예요.',
    market: 'global',
  },
  {
    id: 'nordic',
    label: 'Nordic Naturals',
    note: '오메가3 비교에서 자주 보게 되는 대표 브랜드예요.',
    market: 'global',
  },
  {
    id: 'now',
    label: 'NOW',
    note: '성분 종류가 넓고 가성비 비교에 자주 들어오는 브랜드예요.',
    market: 'global',
  },
  {
    id: 'sports-research',
    label: 'Sports Research',
    note: '운동·오메가3 카테고리에서 자주 찾는 해외 브랜드예요.',
    market: 'global',
  },
  {
    id: 'nature-made',
    label: 'Nature Made',
    note: '기본 영양제 입문용으로 무난하게 많이 보는 브랜드예요.',
    market: 'global',
  },
];

export function BrandListScreen({
  theme,
  selectedFilter,
  onBack,
  onSelectFilter,
  onOpenBrandResults,
}: BrandListScreenProps) {
  const filteredBrands =
    selectedFilter === 'all'
      ? brandItems
      : brandItems.filter((brand) => brand.market === selectedFilter);

  return (
    <ScrollView
      contentContainerStyle={styles.resultsContainer}
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

      <View style={styles.resultsHeaderBlock}>
        <Text style={[styles.resultsQueryTitle, { color: theme.textStrong }]}>브랜드</Text>
        <Text style={[styles.resultsQueryMeta, { color: theme.textSubtle }]}>
          익숙한 브랜드부터 눌러서 대표 제품들을 바로 비교해보세요.
        </Text>

        <View style={styles.resultsScopeRow}>
          {filterTabs.map((tab) => {
            const active = selectedFilter === tab.id;

            return (
              <Pressable
                key={tab.id}
                onPress={() => onSelectFilter(tab.id)}
                style={styles.resultsScopeTab}
              >
                <Text
                  style={[
                    styles.resultsScopeText,
                    {
                      color: active ? theme.textStrong : theme.textSubtle,
                      fontWeight: active ? '800' : '600',
                    },
                  ]}
                >
                  {tab.label}
                </Text>
                <View
                  style={[
                    styles.resultsScopeUnderline,
                    {
                      backgroundColor: active ? theme.point : 'transparent',
                    },
                  ]}
                />
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.brandGrid}>
        {filteredBrands.map((brand) => (
          <Pressable
            key={brand.id}
            onPress={() => onOpenBrandResults(brand.label)}
            style={[
              styles.brandCard,
              {
                backgroundColor: theme.surfaceAlt,
                borderColor: theme.borderSoft,
              },
            ]}
          >
            <View
              style={[
                styles.brandMark,
                { backgroundColor: theme.iconSurface },
              ]}
            >
              <Text style={[styles.brandMarkText, { color: theme.point }]}>
                {brand.label.slice(0, 2).toUpperCase()}
              </Text>
            </View>

            <View style={styles.brandTextWrap}>
              <Text style={[styles.brandLabel, { color: theme.textStrong }]}>{brand.label}</Text>
              <Text style={[styles.brandMeta, { color: theme.textSubtle }]}>{brand.note}</Text>
            </View>

            <Ionicons name="chevron-forward-outline" size={16} color={theme.textSubtle} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
