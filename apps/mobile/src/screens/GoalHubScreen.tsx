import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { goalIngredientMap, wellnessGoals } from '../data/mockCatalog';
import { styles } from '../styles';
import { AppTheme, GoalId, GoalSelection } from '../types';

type GoalHubScreenProps = {
  isDarkMode: boolean;
  theme: AppTheme;
  selectedGoal: GoalSelection;
  onBackHome: () => void;
  onSelectGoal: (goalId: GoalId, goalLabel: string) => void;
  onOpenIngredientDetail: (ingredientName: string) => void;
};

export function GoalHubScreen({
  isDarkMode,
  theme,
  selectedGoal,
  onBackHome,
  onSelectGoal,
  onOpenIngredientDetail,
}: GoalHubScreenProps) {
  const ingredientEmoji = '💊';

  return (
    <ScrollView
      contentContainerStyle={styles.goalHubContainer}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[1]}
    >
      <View style={styles.detailTopBar}>
        <Pressable onPress={onBackHome} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={20} color={theme.textStrong} />
        </Pressable>
        <Text style={[styles.detailTopTitle, { color: theme.textStrong }]}>목적별 찾기</Text>
        <View style={styles.detailTopActions}>
          <Pressable>
            <Ionicons name="search-outline" size={20} color={theme.textStrong} />
          </Pressable>
        </View>
      </View>

      <View
        style={[
          styles.goalHubStickyTabs,
          { backgroundColor: theme.background },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.goalHubTabRow}
        >
          {wellnessGoals.map((goal) => {
            const isActive = goal.id === selectedGoal.id;

            return (
              <Pressable
                key={goal.id}
                onPress={() => onSelectGoal(goal.id, goal.label)}
                style={[
                  styles.goalHubTabChip,
                  {
                    backgroundColor: isActive ? theme.iconSurface : theme.mutedSurface,
                    borderColor: isActive ? theme.point : theme.borderSoft,
                  },
                ]}
              >
                <Ionicons
                  name={goal.icon}
                  size={14}
                  color={isActive ? theme.point : theme.textSubtle}
                />
                <Text
                  style={[
                    styles.goalHubTabText,
                    {
                      color: isActive ? theme.textStrong : theme.textMuted,
                      fontWeight: isActive ? '800' : '700',
                    },
                  ]}
                >
                  {goal.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.goalHubHeader}>
        <Text style={[styles.goalHubTitle, { color: theme.textStrong }]}>
          {selectedGoal.label}
        </Text>
        <Text style={[styles.goalHubMeta, { color: theme.textSubtle }]}>
          찾는 성분을 눌러 자세히 비교해보세요.
        </Text>
      </View>

      <View style={styles.goalHubList}>
        {goalIngredientMap[selectedGoal.id].map((ingredient) => (
          <Pressable
            key={ingredient.name}
            onPress={() => onOpenIngredientDetail(ingredient.name)}
            style={[
              styles.goalHubListRow,
              { borderColor: theme.borderSoft },
            ]}
          >
            <View
              style={[
                styles.goalHubListVisual,
                { backgroundColor: 'transparent' },
              ]}
            >
              <Text style={styles.goalHubEmoji}>{ingredientEmoji}</Text>
            </View>

            <View style={styles.goalHubListContent}>
              <Text style={[styles.goalHubListTitle, { color: theme.textStrong }]}>
                {ingredient.name}
              </Text>
              <Text style={[styles.goalHubListDescription, { color: theme.textMuted }]}>
                {ingredient.description}
              </Text>
              <Text style={[styles.goalHubListPrice, { color: theme.point }]}>
                {ingredient.priceHint}
              </Text>
            </View>

            <View
              style={[
                styles.goalHubListArrowWrap,
                {
                  backgroundColor: theme.iconSurface,
                  borderColor: theme.borderSoft,
                },
              ]}
            >
              <Ionicons
                name="chevron-forward-outline"
                size={16}
                color={theme.textSubtle}
              />
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
