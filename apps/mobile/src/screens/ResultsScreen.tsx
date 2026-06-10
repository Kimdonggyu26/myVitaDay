import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { resultScopes, searchResults } from '../data/mockCatalog';
import { styles } from '../styles';
import { AppTheme, ResultsContext } from '../types';

type ResultsScreenProps = {
  isDarkMode: boolean;
  theme: AppTheme;
  resultsContext: ResultsContext;
  onBack: () => void;
  onOpenDetail: () => void;
  onOpenCompare: () => void;
};

const productEmoji = '💊';

const brandCategoryMap: Record<string, string[]> = {
  종근당건강: ['비타민C', '유산균', '멀티비타민', '마그네슘', '기타'],
  'Nordic Naturals': ['오메가3', '비타민D', '키즈', '임산부', '기타'],
  NOW: ['비타민C', '오메가3', '마그네슘', '멀티비타민', '기타'],
  센트룸: ['멀티비타민', '여성용', '남성용', '실버', '기타'],
  락토핏: ['유산균', '키즈', '실버', '다이어트', '기타'],
  GNM: ['멀티비타민', '비타민C', '오메가3', '루테인', '기타'],
  'Sports Research': ['오메가3', '운동', '비타민D', '멀티비타민', '기타'],
  'Nature Made': ['비타민C', '멀티비타민', '오메가3', '비타민D', '기타'],
};

export function ResultsScreen({
  isDarkMode,
  theme,
  resultsContext,
  onBack,
  onOpenDetail,
  onOpenCompare,
}: ResultsScreenProps) {
  const showScopes = resultsContext.mode === 'search' || resultsContext.mode === 'ingredient';
  const useListLayout = resultsContext.mode === 'category';
  const showBrandTabs = resultsContext.mode === 'brand';
  const brandTabs = brandCategoryMap[resultsContext.queryTitle] ?? ['비타민C', '유산균', '멀티비타민', '기타'];
  const [selectedBrandTab, setSelectedBrandTab] = useState(brandTabs[0]);

  useEffect(() => {
    setSelectedBrandTab(brandTabs[0]);
  }, [resultsContext.queryTitle]);

  return (
    <ScrollView contentContainerStyle={styles.resultsContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.resultsTopBar}>
        <Pressable onPress={onBack} style={styles.resultsBackButton}>
          <Ionicons name="chevron-back-outline" size={20} color={theme.textStrong} />
        </Pressable>
        <Text style={[styles.resultsHeaderTitle, { color: theme.textStrong }]}>
          {resultsContext.headerTitle}
        </Text>
        <Pressable style={styles.resultsCartButton}>
          <Ionicons name="git-compare-outline" size={22} color={theme.textStrong} />
          <View
            style={[
              styles.resultsCartBadge,
              { backgroundColor: theme.textStrong },
            ]}
          >
            <Text style={styles.resultsCartBadgeText}>3</Text>
          </View>
        </Pressable>
      </View>

      {showBrandTabs && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.goalHubTabRow}
        >
          {brandTabs.map((tab) => {
            const active = selectedBrandTab === tab;

            return (
              <Pressable
                key={tab}
                onPress={() => setSelectedBrandTab(tab)}
                style={[
                  styles.goalHubTabChip,
                  {
                    backgroundColor: active ? theme.iconSurface : theme.surfaceAlt,
                    borderColor: active ? theme.point : theme.borderSoft,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.goalHubTabText,
                    {
                      color: active ? theme.textStrong : theme.textSubtle,
                      fontWeight: active ? '800' : '600',
                    },
                  ]}
                >
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      )}

      <View style={styles.resultsHeaderBlock}>
        <Text style={[styles.resultsQueryTitle, { color: theme.textStrong }]}>
          {resultsContext.queryTitle}
        </Text>
        {showScopes ? (
          <View style={styles.resultsScopeRow}>
            {resultScopes.map((scope) => (
              <Pressable key={scope.id} style={styles.resultsScopeTab}>
                <Text
                  style={[
                    styles.resultsScopeText,
                    {
                      color: scope.active ? theme.textStrong : theme.textSubtle,
                      fontWeight: scope.active ? '800' : '600',
                    },
                  ]}
                >
                  {scope.label}
                </Text>
                <View
                  style={[
                    styles.resultsScopeUnderline,
                    {
                      backgroundColor: scope.active ? theme.point : 'transparent',
                    },
                  ]}
                />
              </Pressable>
            ))}
          </View>
        ) : (
          <Text style={[styles.resultsQueryMeta, { color: theme.textSubtle }]}>
            {showBrandTabs
              ? `${selectedBrandTab} 제품부터 먼저 비교해보세요.`
              : resultsContext.queryMeta}
          </Text>
        )}
      </View>

      {useListLayout ? (
        <View style={styles.resultsList}>
          {searchResults.map((product, index) => (
            <Pressable
              key={product.id}
              onPress={onOpenDetail}
              style={[
                styles.resultListRow,
                {
                  borderColor: theme.borderSoft,
                  backgroundColor: theme.surfaceAlt,
                },
                index === searchResults.length - 1 ? styles.resultListRowLast : null,
              ]}
            >
              <View
                style={[
                  styles.resultListVisual,
                  { backgroundColor: isDarkMode ? '#1f2327' : '#f6f1eb' },
                ]}
              >
                <Text style={styles.resultEmoji}>{productEmoji}</Text>
              </View>

              <View style={styles.resultListContent}>
                <Text style={[styles.resultListBrand, { color: theme.textSubtle }]}>
                  {product.brand}
                </Text>
                <Text style={[styles.resultListTitle, { color: theme.textStrong }]}>
                  {product.name}
                </Text>
                <Text style={[styles.resultListSummary, { color: theme.textMuted }]}>
                  {product.summary}
                </Text>
                <View style={styles.resultListMetaRow}>
                  <Text style={[styles.resultPriceLabel, { color: theme.point }]}>1일 기준</Text>
                  <Text style={[styles.resultListMetaValue, { color: theme.textStrong }]}>
                    {product.dailyPrice}
                  </Text>
                  <Text style={[styles.resultListTotal, { color: theme.textSubtle }]}>
                    총 {product.price}
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={onOpenCompare}
                style={[
                  styles.resultListAction,
                  {
                    backgroundColor: theme.mutedSurface,
                    borderColor: theme.borderSoft,
                  },
                ]}
              >
                <Ionicons name="add-outline" size={16} color={theme.textStrong} />
              </Pressable>
            </Pressable>
          ))}
        </View>
      ) : (
        <View style={styles.resultsGrid}>
          {searchResults.map((product) => (
            <Pressable key={product.id} onPress={onOpenDetail} style={styles.resultGridItem}>
              <View
                style={[
                  styles.resultVisualBoard,
                  { backgroundColor: isDarkMode ? '#1f2327' : '#f6f1eb' },
                ]}
              >
                <Text style={styles.resultEmojiLarge}>{productEmoji}</Text>
                <View
                  style={[
                    styles.resultBadge,
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
              <Text style={[styles.resultGridSummary, { color: theme.textMuted }]}>
                {product.summary}
              </Text>
              <View style={[styles.resultDivider, { backgroundColor: theme.borderSoft }]} />
              <View style={styles.resultPriceRow}>
                <Text style={[styles.resultPriceLabel, { color: theme.point }]}>1일 기준</Text>
                <Text style={[styles.resultGridPrice, { color: theme.textStrong }]}>
                  {product.dailyPrice}
                </Text>
              </View>
              <Text style={[styles.resultGridTotal, { color: theme.textSubtle }]}>
                총 {product.price}
              </Text>
              <Pressable
                onPress={onOpenCompare}
                style={[
                  styles.resultActionButton,
                  { borderColor: isDarkMode ? '#4f5963' : '#d9e2ec' },
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
      )}
    </ScrollView>
  );
}
