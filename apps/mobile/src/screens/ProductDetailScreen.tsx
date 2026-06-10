import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { productChecks, productHighlights, productIngredients } from '../data/mockCatalog';
import { styles } from '../styles';
import { AppTheme } from '../types';

type ProductDetailScreenProps = {
  theme: AppTheme;
  onBack: () => void;
  onOpenCompare: () => void;
};

export function ProductDetailScreen({
  theme,
  onBack,
  onOpenCompare,
}: ProductDetailScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.detailContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.detailTopBar}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={20} color={theme.textStrong} />
        </Pressable>
        <Text style={[styles.detailTopTitle, { color: theme.textStrong }]}>제품 상세</Text>
        <View style={styles.detailTopActions}>
          <Pressable>
            <Ionicons name="bookmark-outline" size={20} color={theme.textStrong} />
          </Pressable>
          <Pressable>
            <Ionicons name="ellipsis-horizontal" size={20} color={theme.textStrong} />
          </Pressable>
        </View>
      </View>

      <View
        style={[
          styles.detailHero,
          {
            backgroundColor: theme.surfaceAlt,
            borderColor: theme.borderSoft,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <View
          style={[
            styles.detailVisual,
            {
              backgroundColor: theme.mutedSurface,
              borderColor: theme.borderSoft,
            },
          ]}
        >
          <View style={[styles.detailVisualBadge, { backgroundColor: theme.iconSurface }]}>
            <Ionicons name="water-outline" size={26} color={theme.point} />
          </View>
          <Text style={[styles.detailVisualText, { color: theme.textSubtle }]}>
            제품 이미지 영역
          </Text>
        </View>

        <View style={styles.detailIntro}>
          <Text style={[styles.detailBrand, { color: theme.point }]}>종근당건강</Text>
          <Text style={[styles.detailTitle, { color: theme.textStrong }]}>
            프로메가 오메가3 트리플
          </Text>
          <Text style={[styles.detailSubtitle, { color: theme.textMuted }]}>
            가격과 함량을 먼저 비교하기 좋은 대표 제품 예시예요.
          </Text>
        </View>

        <View style={styles.detailPriceRow}>
          <Text style={[styles.detailPrice, { color: theme.textStrong }]}>29,900원</Text>
          <View style={[styles.priceTag, { backgroundColor: theme.iconSurface }]}>
            <Text style={[styles.priceTagText, { color: theme.point }]}>1캡슐당 249원</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <View
            style={[
              styles.metaPill,
              {
                backgroundColor: theme.mutedSurface,
                borderColor: theme.borderSoft,
              },
            ]}
          >
            <Text style={[styles.metaPillText, { color: theme.textMuted }]}>120캡슐</Text>
          </View>
          <View
            style={[
              styles.metaPill,
              {
                backgroundColor: theme.mutedSurface,
                borderColor: theme.borderSoft,
              },
            ]}
          >
            <Text style={[styles.metaPillText, { color: theme.textMuted }]}>60일분</Text>
          </View>
          <View
            style={[
              styles.metaPill,
              {
                backgroundColor: theme.mutedSurface,
                borderColor: theme.borderSoft,
              },
            ]}
          >
            <Text style={[styles.metaPillText, { color: theme.textMuted }]}>식후 2캡슐</Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.detailSection,
          {
            backgroundColor: theme.surfaceAlt,
            borderColor: theme.borderSoft,
          },
        ]}
      >
        <Text style={[styles.detailSectionTitle, { color: theme.textStrong }]}>비교 포인트</Text>
        <View style={styles.highlightList}>
          {productHighlights.map((item, index) => (
            <View
              key={item.label}
              style={[
                styles.highlightRow,
                index < productHighlights.length - 1 ? { borderColor: theme.borderSoft } : null,
              ]}
            >
              <Text style={[styles.highlightLabel, { color: theme.textSubtle }]}>
                {item.label}
              </Text>
              <Text style={[styles.highlightValue, { color: theme.textStrong }]}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View
        style={[
          styles.detailSection,
          {
            backgroundColor: theme.surfaceAlt,
            borderColor: theme.borderSoft,
          },
        ]}
      >
        <Text style={[styles.detailSectionTitle, { color: theme.textStrong }]}>주요 성분</Text>
        <View style={styles.ingredientGrid}>
          {productIngredients.map((item) => (
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
              <Text style={[styles.ingredientChipText, { color: theme.textStrong }]}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View
        style={[
          styles.detailSection,
          {
            backgroundColor: theme.surfaceAlt,
            borderColor: theme.borderSoft,
          },
        ]}
      >
        <Text style={[styles.detailSectionTitle, { color: theme.textStrong }]}>먼저 보면 좋은 점</Text>
        <View style={styles.checkList}>
          {productChecks.map((item) => (
            <View key={item} style={styles.checkRow}>
              <Ionicons name="checkmark-circle-outline" size={18} color={theme.point} />
              <Text style={[styles.checkText, { color: theme.textMuted }]}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.detailActionRow}>
        <Pressable
          style={[
            styles.detailSecondaryButton,
            {
              backgroundColor: theme.secondary,
              borderColor: theme.borderSoft,
            },
          ]}
        >
          <Ionicons name="star-outline" size={18} color={theme.textStrong} />
          <Text style={[styles.detailSecondaryButtonText, { color: theme.textStrong }]}>
            즐겨찾기
          </Text>
        </Pressable>
        <Pressable
          onPress={onOpenCompare}
          style={[styles.detailPrimaryButton, { backgroundColor: theme.point }]}
        >
          <Text style={[styles.detailPrimaryButtonText, { color: '#ffffff' }]}>
            비교함에 담기
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
