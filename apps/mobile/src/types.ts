import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

export type IconName = ComponentProps<typeof Ionicons>['name'];

export type GoalId =
  | 'sleep'
  | 'fatigue'
  | 'gut'
  | 'immune'
  | 'skin'
  | 'eye'
  | 'fitness'
  | 'bloodFlow'
  | 'bloodSugar'
  | 'boneJoint'
  | 'women'
  | 'liver';

export type Screen =
  | 'onboarding'
  | 'authEntry'
  | 'home'
  | 'personal'
  | 'brandList'
  | 'intake'
  | 'mypage'
  | 'settings'
  | 'goalHub'
  | 'ingredientDetail'
  | 'results'
  | 'detail'
  | 'compare';
export type ResultsMode = 'search' | 'category' | 'ingredient' | 'brand';
export type ResultsBackScreen =
  | 'home'
  | 'goalHub'
  | 'ingredientDetail'
  | 'brandList';

export type ResultsContext = {
  headerTitle: string;
  queryTitle: string;
  queryMeta: string;
  mode: ResultsMode;
  backScreen: ResultsBackScreen;
};

export type GoalSelection = {
  id: GoalId;
  label: string;
};

export type CategoryItem = {
  id: string;
  label: string;
  icon: IconName;
};

export type GoalItem = {
  id: GoalId;
  label: string;
  icon: IconName;
};

export type BottomTabItem = {
  id: string;
  label: string;
  icon: IconName;
  active: boolean;
};

export type HighlightItem = {
  label: string;
  value: string;
};

export type CompareProduct = {
  id: string;
  brand: string;
  name: string;
  price: string;
  dailyPrice: string;
  dose: string;
  amount: string;
};

export type CompareRow = {
  label: string;
  values: string[];
};

export type SearchResultItem = {
  id: string;
  brand: string;
  name: string;
  summary: string;
  price: string;
  dailyPrice: string;
  dailyDose?: string;
  totalCount?: string;
  visualWidth: number;
  visualHeight: number;
  visualRadius: number;
  visualColor: string;
  badgeIcon: IconName;
};

export type ScopeItem = {
  id: 'all' | 'domestic' | 'global';
  label: string;
  active: boolean;
};

export type GoalIngredientCard = {
  name: string;
  description: string;
  detailDescription?: string;
  priceHint: string;
  visualWidth: number;
  visualHeight: number;
  visualRadius: number;
  visualColor: string;
  badgeIcon: IconName;
};

export type SelectedIngredient = GoalIngredientCard & {
  goalId: GoalId;
  goalLabel: string;
};

export type AppTheme = {
  background: string;
  surface: string;
  surfaceAlt: string;
  mutedSurface: string;
  softSurface: string;
  inputSurface: string;
  border: string;
  borderSoft: string;
  inputBorder: string;
  text: string;
  textStrong: string;
  textMuted: string;
  textSubtle: string;
  point: string;
  tabMuted: string;
  primary: string;
  primaryText: string;
  secondary: string;
  shadow: string;
  iconSurface: string;
};
