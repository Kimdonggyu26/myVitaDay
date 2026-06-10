import { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { AppErrorBoundary } from './src/components/AppErrorBoundary';
import { BottomBar } from './src/components/BottomBar';
import {
  defaultGoalSelection,
  defaultResultsContext,
  goalIngredientMap,
} from './src/data/mockCatalog';
import { BrandListScreen } from './src/screens/BrandListScreen';
import { CompareScreen } from './src/screens/CompareScreen';
import { GoalHubScreen } from './src/screens/GoalHubScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { IngredientDetailScreen } from './src/screens/IngredientDetailScreen';
import { IntakeScreen } from './src/screens/IntakeScreen';
import { MyPageScreen } from './src/screens/MyPageScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { PersonalScreen } from './src/screens/PersonalScreen';
import { ProductDetailScreen } from './src/screens/ProductDetailScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import { AuthEntryScreen } from './src/screens/AuthEntryScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { styles } from './src/styles';
import { darkTheme, lightTheme } from './src/theme';
import { GoalId, ResultsContext, Screen, SelectedIngredient } from './src/types';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [brandFilter, setBrandFilter] = useState<'all' | 'domestic' | 'global'>('all');
  const [selectedGoal, setSelectedGoal] = useState(defaultGoalSelection);
  const [resultsContext, setResultsContext] = useState<ResultsContext>(defaultResultsContext);
  const [selectedIngredient, setSelectedIngredient] = useState<SelectedIngredient>({
    ...goalIngredientMap[defaultGoalSelection.id][0],
    goalId: defaultGoalSelection.id,
    goalLabel: defaultGoalSelection.label,
  });
  const [productBackScreen, setProductBackScreen] = useState<'results' | 'ingredientDetail'>(
    'results',
  );

  const theme = isDarkMode ? darkTheme : lightTheme;

  const openSearchResults = () => {
    setResultsContext({
      headerTitle: '검색 결과',
      queryTitle: '오메가3',
      queryMeta: '24개 결과',
      mode: 'search',
      backScreen: 'home',
    });
    setScreen('results');
  };

  const openGoalHub = (goalId: GoalId, goalLabel: string) => {
    setSelectedGoal({ id: goalId, label: goalLabel });
    setScreen('goalHub');
  };

  const openIngredientDetail = (ingredientName: string) => {
    const ingredient = goalIngredientMap[selectedGoal.id].find(
      (item) => item.name === ingredientName,
    );

    if (!ingredient) {
      return;
    }

    setSelectedIngredient({
      ...ingredient,
      goalId: selectedGoal.id,
      goalLabel: selectedGoal.label,
    });
    setScreen('ingredientDetail');
  };

  const openCategoryResults = (categoryLabel: string) => {
    setResultsContext({
      headerTitle: '카테고리 결과',
      queryTitle: categoryLabel,
      queryMeta: '대표 제품 비교',
      mode: 'category',
      backScreen: 'home',
    });
    setScreen('results');
  };

  const openBrandList = () => setScreen('brandList');

  const openBrandResults = (brandLabel: string) => {
    setResultsContext({
      headerTitle: '브랜드별로 찾기',
      queryTitle: brandLabel,
      queryMeta: '대표 제품 비교',
      mode: 'brand',
      backScreen: 'brandList',
    });
    setScreen('results');
  };

  const goHome = () => setScreen('home');
  const goPersonal = () => setScreen('personal');
  const goIntake = () => setScreen('intake');
  const goMyPage = () => setScreen('mypage');
  const goSettings = () => setScreen('settings');

  const openDetailFromResults = () => {
    setProductBackScreen('results');
    setScreen('detail');
  };

  const openDetailFromIngredient = () => {
    setProductBackScreen('ingredientDetail');
    setScreen('detail');
  };

  const goDetail = () => setScreen('detail');
  const goCompare = () => setScreen('compare');

  const goResultsBack = () => {
    if (resultsContext.backScreen === 'goalHub') {
      setScreen('goalHub');
      return;
    }

    if (resultsContext.backScreen === 'ingredientDetail') {
      setScreen('ingredientDetail');
      return;
    }

    if (resultsContext.backScreen === 'brandList') {
      setScreen('brandList');
      return;
    }

    setScreen('home');
  };

  const goProductBack = () => setScreen(productBackScreen);

  return (
    <AppErrorBoundary>
      <View style={[styles.screen, { backgroundColor: theme.background }]}>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.appShell}>
            {screen === 'onboarding' && (
              <OnboardingScreen onStart={() => setScreen('authEntry')} onBrowse={goHome} />
            )}

            {screen === 'authEntry' && (
              <AuthEntryScreen theme={theme} onBack={() => setScreen('onboarding')} onBrowse={goHome} />
            )}

            {screen === 'home' && (
              <HomeScreen
                isDarkMode={isDarkMode}
                theme={theme}
                onToggleTheme={() => setIsDarkMode((prev) => !prev)}
                onOpenSearchResults={openSearchResults}
                onOpenGoalHub={openGoalHub}
                onOpenCategoryResults={openCategoryResults}
                onOpenBrandList={openBrandList}
                onOpenBrandResults={openBrandResults}
              />
            )}

            {screen === 'personal' && (
              <PersonalScreen
                isDarkMode={isDarkMode}
                theme={theme}
                onOpenIngredientDetail={(goalId, goalLabel, ingredientName) => {
                  setSelectedGoal({ id: goalId, label: goalLabel });
                  const ingredient = goalIngredientMap[goalId].find(
                    (item) => item.name === ingredientName,
                  );

                  if (!ingredient) {
                    return;
                  }

                  setSelectedIngredient({
                    ...ingredient,
                    goalId,
                    goalLabel,
                  });
                  setScreen('ingredientDetail');
                }}
              />
            )}

            {screen === 'intake' && <IntakeScreen isDarkMode={isDarkMode} theme={theme} />}

            {screen === 'mypage' && (
              <MyPageScreen
                isDarkMode={isDarkMode}
                theme={theme}
                onOpenSettings={goSettings}
                onToggleTheme={() => setIsDarkMode((prev) => !prev)}
              />
            )}

            {screen === 'settings' && (
              <SettingsScreen isDarkMode={isDarkMode} theme={theme} onBack={goMyPage} />
            )}

            {screen === 'goalHub' && (
              <GoalHubScreen
                isDarkMode={isDarkMode}
                theme={theme}
                selectedGoal={selectedGoal}
                onBackHome={goHome}
                onSelectGoal={openGoalHub}
                onOpenIngredientDetail={openIngredientDetail}
              />
            )}

            {screen === 'brandList' && (
              <BrandListScreen
                theme={theme}
                selectedFilter={brandFilter}
                onBack={goHome}
                onSelectFilter={setBrandFilter}
                onOpenBrandResults={openBrandResults}
              />
            )}

            {screen === 'ingredientDetail' && (
              <IngredientDetailScreen
                isDarkMode={isDarkMode}
                theme={theme}
                ingredient={selectedIngredient}
                onBack={() => setScreen('goalHub')}
                onOpenProductDetail={openDetailFromIngredient}
                onOpenCompare={goCompare}
              />
            )}

            {screen === 'results' && (
              <ResultsScreen
                isDarkMode={isDarkMode}
                theme={theme}
                resultsContext={resultsContext}
                onBack={goResultsBack}
                onOpenDetail={openDetailFromResults}
                onOpenCompare={goCompare}
              />
            )}

            {screen === 'detail' && (
              <ProductDetailScreen theme={theme} onBack={goProductBack} onOpenCompare={goCompare} />
            )}

            {screen === 'compare' && <CompareScreen theme={theme} onBack={goDetail} />}
          </View>
        </SafeAreaView>

        {screen !== 'onboarding' && screen !== 'authEntry' && (
          <BottomBar
            isDarkMode={isDarkMode}
            theme={theme}
            currentTab={
              screen === 'personal'
                ? 'personal'
                : screen === 'intake'
                  ? 'intake'
                  : screen === 'mypage' || screen === 'settings'
                    ? 'mypage'
                    : 'home'
            }
            onPressHome={goHome}
            onPressPersonal={goPersonal}
            onPressIntake={goIntake}
            onPressMyPage={goMyPage}
          />
        )}
      </View>
    </AppErrorBoundary>
  );
}
