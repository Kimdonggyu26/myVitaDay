import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { compareProducts, compareRows } from '../data/mockCatalog';
import { styles } from '../styles';
import { AppTheme } from '../types';

type CompareScreenProps = {
  theme: AppTheme;
  onBack: () => void;
};

export function CompareScreen({ theme, onBack }: CompareScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.compareContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.detailTopBar}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={20} color={theme.textStrong} />
        </Pressable>
        <Text style={[styles.detailTopTitle, { color: theme.textStrong }]}>제품 비교</Text>
        <View style={styles.detailTopActions}>
          <Pressable>
            <Ionicons name="share-social-outline" size={20} color={theme.textStrong} />
          </Pressable>
        </View>
      </View>

      <View
        style={[
          styles.compareHero,
          {
            backgroundColor: theme.surfaceAlt,
            borderColor: theme.borderSoft,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <Text style={[styles.compareHeroTitle, { color: theme.textStrong }]}>
          오메가3 제품 3개를 비교 중이에요
        </Text>
        <Text style={[styles.compareHeroText, { color: theme.textMuted }]}>
          총가격보다 1일 기준 가격과 함량을 같이 보면 훨씬 정확해요.
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.compareCardRow}>
        {compareProducts.map((product) => (
          <View
            key={product.id}
            style={[
              styles.compareProductCard,
              {
                backgroundColor: theme.surfaceAlt,
                borderColor: theme.borderSoft,
              },
            ]}
          >
            <Text style={[styles.compareProductBrand, { color: theme.point }]}>{product.brand}</Text>
            <Text style={[styles.compareProductName, { color: theme.textStrong }]}>{product.name}</Text>
            <Text style={[styles.compareProductPrice, { color: theme.textStrong }]}>{product.price}</Text>
            <Text style={[styles.compareProductMeta, { color: theme.textMuted }]}>{product.dailyPrice}</Text>
            <Text style={[styles.compareProductMeta, { color: theme.textMuted }]}>{product.dose}</Text>
            <Text style={[styles.compareProductMeta, { color: theme.textMuted }]}>{product.amount}</Text>
          </View>
        ))}
      </ScrollView>

      <View
        style={[
          styles.detailSection,
          {
            backgroundColor: theme.surfaceAlt,
            borderColor: theme.borderSoft,
          },
        ]}
      >
        <Text style={[styles.detailSectionTitle, { color: theme.textStrong }]}>항목별 비교</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[styles.compareTable, { borderColor: theme.borderSoft }]}>
            <View style={[styles.compareHeaderRow, { borderColor: theme.borderSoft }]}>
              <View style={styles.compareLabelCell}>
                <Text style={[styles.compareHeaderLabel, { color: theme.textSubtle }]}>
                  비교 기준
                </Text>
              </View>
              {compareProducts.map((product) => (
                <View key={product.id} style={styles.compareValueCell}>
                  <Text style={[styles.compareHeaderLabel, { color: theme.textStrong }]}>
                    {product.name}
                  </Text>
                </View>
              ))}
            </View>

            {compareRows.map((row, rowIndex) => (
              <View
                key={row.label}
                style={[
                  styles.compareDataRow,
                  rowIndex < compareRows.length - 1 ? { borderColor: theme.borderSoft } : null,
                ]}
              >
                <View style={styles.compareLabelCell}>
                  <Text style={[styles.compareRowLabel, { color: theme.textSubtle }]}>
                    {row.label}
                  </Text>
                </View>
                {row.values.map((value) => (
                  <View key={`${row.label}-${value}`} style={styles.compareValueCell}>
                    <Text style={[styles.compareRowValue, { color: theme.textStrong }]}>
                      {value}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
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
        <Text style={[styles.detailSectionTitle, { color: theme.textStrong }]}>지금 보면 좋은 점</Text>
        <View style={styles.checkList}>
          <View style={styles.checkRow}>
            <Ionicons name="checkmark-circle-outline" size={18} color={theme.point} />
            <Text style={[styles.checkText, { color: theme.textMuted }]}>
              총가격보다 1일 기준 가격이 가장 먼저 비교 포인트가 돼요.
            </Text>
          </View>
          <View style={styles.checkRow}>
            <Ionicons name="checkmark-circle-outline" size={18} color={theme.point} />
            <Text style={[styles.checkText, { color: theme.textMuted }]}>
              함량이 높아도 복용량이 많으면 체감 가성비가 달라질 수 있어요.
            </Text>
          </View>
          <View style={styles.checkRow}>
            <Ionicons name="checkmark-circle-outline" size={18} color={theme.point} />
            <Text style={[styles.checkText, { color: theme.textMuted }]}>
              다음 단계에선 쿠팡, 네이버쇼핑 가격 비교가 여기에 붙는 구조예요.
            </Text>
          </View>
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
          <Text style={[styles.detailSecondaryButtonText, { color: theme.textStrong }]}>
            공유하기
          </Text>
        </Pressable>
        <Pressable style={[styles.detailPrimaryButton, { backgroundColor: theme.point }]}>
          <Text style={[styles.detailPrimaryButtonText, { color: '#ffffff' }]}>
            가격 보러가기
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
