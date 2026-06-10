import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { BrandWordmark } from '../components/BrandWordmark';
import { categories, wellnessGoals } from '../data/mockCatalog';
import { styles } from '../styles';
import { AppTheme, GoalId } from '../types';

type HomeScreenProps = {
  isDarkMode: boolean;
  theme: AppTheme;
  onToggleTheme: () => void;
  onOpenSearchResults: () => void;
  onOpenGoalHub: (goalId: GoalId, goalLabel: string) => void;
  onOpenCategoryResults: (categoryLabel: string) => void;
  onOpenBrandList: () => void;
  onOpenBrandResults: (brandLabel: string) => void;
};

const previewBrands = [
  { id: 'ckd', label: '종근당건강', note: '기본 영양제로 많이 보는 브랜드' },
  { id: 'nordic', label: 'Nordic Naturals', note: '오메가3로 많이 찾는 브랜드' },
  { id: 'now', label: 'NOW', note: '가성비 비교에서 자주 보는 브랜드' },
  { id: 'centrum', label: '센트룸', note: '멀티비타민으로 익숙한 브랜드' },
];

export function HomeScreen({
  isDarkMode,
  theme,
  onToggleTheme,
  onOpenSearchResults,
  onOpenGoalHub,
  onOpenCategoryResults,
  onOpenBrandList,
  onOpenBrandResults,
}: HomeScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <BrandWordmark theme={theme} />
        <View style={styles.topBarActions}>
          <Pressable onPress={onToggleTheme} style={styles.themeToggle}>
            <Ionicons
              name={isDarkMode ? 'moon-outline' : 'sunny-outline'}
              size={18}
              color={theme.text}
            />
          </Pressable>
          <Pressable>
            <Ionicons name="notifications-outline" size={20} color={theme.text} />
          </Pressable>
          <Pressable>
            <Ionicons name="menu-outline" size={22} color={theme.text} />
          </Pressable>
        </View>
      </View>

      <View
        style={[
          styles.searchHero,
          {
            backgroundColor: isDarkMode ? '#161b20' : '#fcfefd',
            borderColor: theme.border,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <Text style={[styles.heroTitle, { color: theme.textStrong }]}>
          사기 전에{'\n'}먼저 비교해요
        </Text>
        <Text style={[styles.heroDescription, { color: theme.textMuted }]}>
          성분과 가격, 핵심만 빠르게.
        </Text>

        <View
          style={[
            styles.searchBox,
            {
              backgroundColor: theme.inputSurface,
              borderColor: theme.inputBorder,
            },
          ]}
        >
          <Ionicons name="search-outline" size={17} color={theme.point} />
          <TextInput
            editable={false}
            placeholder="제품명, 브랜드 검색"
            placeholderTextColor={theme.textSubtle}
            style={[styles.searchInput, { color: theme.textStrong }]}
            value=""
          />
          <Pressable
            onPress={onOpenSearchResults}
            style={[styles.searchInlineButton, { backgroundColor: theme.point }]}
          >
            <Text style={[styles.searchInlineButtonText, { color: '#ffffff' }]}>검색</Text>
          </Pressable>
        </View>
      </View>

      <View
        style={[
          styles.section,
          {
            backgroundColor: theme.surfaceAlt,
            borderColor: theme.borderSoft,
          },
        ]}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textStrong }]}>목적별로 찾기</Text>
        </View>
        <View style={styles.goalScrollShell}>
          <ScrollView
            style={styles.goalScrollFrame}
            contentContainerStyle={styles.goalGrid}
            showsVerticalScrollIndicator
            nestedScrollEnabled
          >
            {wellnessGoals.map((goal) => (
              <Pressable
                key={goal.id}
                onPress={() => onOpenGoalHub(goal.id, goal.label)}
                style={[
                  styles.goalChip,
                  {
                    backgroundColor: theme.mutedSurface,
                    borderColor: theme.borderSoft,
                  },
                ]}
              >
                <Ionicons name={goal.icon} size={15} color={theme.point} />
                <Text style={[styles.goalChipText, { color: theme.textStrong }]}>
                  {goal.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>

      <View
        style={[
          styles.section,
          {
            backgroundColor: theme.surfaceAlt,
            borderColor: theme.borderSoft,
          },
        ]}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textStrong }]}>인기 카테고리</Text>
          <Text style={[styles.sectionLink, { color: theme.text }]}>전체 보기</Text>
        </View>
        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <Pressable
              key={category.id}
              onPress={() => onOpenCategoryResults(category.label)}
              style={[styles.categoryCard, { backgroundColor: theme.mutedSurface }]}
            >
              <View style={styles.categoryTopRow}>
                <View
                  style={[
                    styles.categoryIconWrap,
                    { backgroundColor: theme.iconSurface },
                  ]}
                >
                  <Ionicons name={category.icon} size={16} color={theme.point} />
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={16}
                  color={theme.textSubtle}
                />
              </View>
              <Text style={[styles.categoryLabel, { color: theme.textStrong }]}>
                {category.label}
              </Text>
              <Text style={[styles.categoryMeta, { color: theme.textSubtle }]}>
                대표 제품 비교
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View
        style={[
          styles.section,
          {
            backgroundColor: theme.surfaceAlt,
            borderColor: theme.borderSoft,
          },
        ]}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textStrong }]}>브랜드별로 찾기</Text>
          <Pressable onPress={onOpenBrandList}>
            <Text style={[styles.sectionLink, { color: theme.text }]}>전체 보기</Text>
          </Pressable>
        </View>
        <View style={styles.brandGrid}>
          {previewBrands.map((brand) => (
            <Pressable
              key={brand.id}
              onPress={() => onOpenBrandResults(brand.label)}
              style={[
                styles.brandCard,
                {
                  backgroundColor: theme.mutedSurface,
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
      </View>
    </ScrollView>
  );
}
