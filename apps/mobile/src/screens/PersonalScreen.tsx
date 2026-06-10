import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { styles } from '../styles';
import { AppTheme, GoalId } from '../types';

type PersonalScreenProps = {
  isDarkMode: boolean;
  theme: AppTheme;
  onOpenIngredientDetail: (goalId: GoalId, goalLabel: string, ingredientName: string) => void;
};

type PersonalMode = 'recommend' | 'feedback';

type GoalOption = {
  goalId: GoalId;
  label: string;
};

type RecommendedIngredient = {
  goalId: GoalId;
  goalLabel: string;
  name: string;
  note: string;
};

type FeedbackReview = {
  headline: string;
  summary: string;
  badges: Array<{ label: string; value: string }>;
  checks: string[];
  suggestions: RecommendedIngredient[];
};

const goalOptions: GoalOption[] = [
  { goalId: 'sleep', label: '수면' },
  { goalId: 'fatigue', label: '피로·활력' },
  { goalId: 'gut', label: '장·위 건강' },
  { goalId: 'immune', label: '면역' },
  { goalId: 'skin', label: '피부·헤어' },
  { goalId: 'eye', label: '눈 건강' },
  { goalId: 'fitness', label: '운동·근력' },
  { goalId: 'liver', label: '간 건강' },
];

const goalFollowUpMap: Record<GoalId, string[]> = {
  sleep: ['잠드는 데 시간이 오래 걸려요', '자다가 자주 깨는 편이에요'],
  fatigue: ['아침에 일어나도 개운하지 않아요', '오후에 쉽게 처지는 편이에요'],
  gut: ['속이 자주 더부룩해요', '화장실 리듬이 불규칙한 편이에요'],
  immune: ['환절기에 컨디션이 자주 떨어져요', '피로가 오래 가는 편이에요'],
  skin: ['건조함이 가장 신경 쓰여요', '탄력이나 머릿결이 더 고민이에요'],
  eye: ['화면을 오래 보는 편이에요', '눈이 쉽게 건조하거나 피로해요'],
  fitness: ['운동 목표가 근력 쪽에 가까워요', '운동 후 회복이 더 중요해요'],
  liver: ['늦은 식사나 야식이 잦아요', '술자리 다음 날이 자주 신경 쓰여요'],
  bloodFlow: [],
  bloodSugar: [],
  boneJoint: [],
  women: [],
};

const currentSupplementOptions = [
  '멀티비타민',
  '비타민C',
  '비타민D',
  '비타민B군',
  '마그네슘',
  '아연',
  '유산균',
  '오메가3',
  '루테인',
  '콜라겐',
  '바나바잎추출물',
  '비오틴',
  '철분',
  '칼슘',
  '프로폴리스',
  '코엔자임Q10',
  '홍삼',
  '테아닌',
  '크레아틴',
  '단백질',
];

const goalRecommendationMap: Record<GoalId, RecommendedIngredient[]> = {
  sleep: [
    { goalId: 'sleep', goalLabel: '수면', name: '마그네슘', note: '긴장을 덜어주는 수면 루틴에서 기본처럼 많이 봐요.' },
    { goalId: 'sleep', goalLabel: '수면', name: '테아닌', note: '잠들기 전 편안한 루틴 쪽으로 함께 많이 봐요.' },
    { goalId: 'sleep', goalLabel: '수면', name: '멜라토닌', note: '취침 타이밍을 더 분명하게 잡고 싶을 때 많이 비교해요.' },
  ],
  fatigue: [
    { goalId: 'fatigue', goalLabel: '피로·활력', name: '비타민B군', note: '기본 활력 루틴에서 가장 먼저 많이 보는 편이에요.' },
    { goalId: 'fatigue', goalLabel: '피로·활력', name: '코엔자임Q10', note: '에너지 루틴 쪽으로 함께 많이 비교해요.' },
    { goalId: 'fatigue', goalLabel: '피로·활력', name: '홍삼', note: '일상 활력을 챙기고 싶을 때 자주 같이 봐요.' },
  ],
  gut: [
    { goalId: 'gut', goalLabel: '장·위 건강', name: '유산균', note: '장 건강 루틴에서 가장 기본처럼 많이 보는 성분이에요.' },
    { goalId: 'gut', goalLabel: '장·위 건강', name: '프리바이오틱스', note: '유산균과 함께 보는 조합으로 많이 찾아요.' },
    { goalId: 'gut', goalLabel: '장·위 건강', name: '소화효소', note: '식후 더부룩함 쪽으로 같이 많이 비교해요.' },
  ],
  immune: [
    { goalId: 'immune', goalLabel: '면역', name: '비타민C', note: '면역 루틴에서 가장 기본처럼 많이 비교해요.' },
    { goalId: 'immune', goalLabel: '면역', name: '아연', note: '비타민C와 함께 많이 보는 조합이에요.' },
    { goalId: 'immune', goalLabel: '면역', name: '프로폴리스', note: '컨디션 관리 루틴 쪽으로 자주 같이 봐요.' },
  ],
  skin: [
    { goalId: 'skin', goalLabel: '피부·헤어', name: '콜라겐', note: '피부 루틴에서 가장 먼저 많이 보는 대표 성분이에요.' },
    { goalId: 'skin', goalLabel: '피부·헤어', name: '비오틴', note: '헤어 쪽까지 같이 보고 싶을 때 자주 비교해요.' },
    { goalId: 'skin', goalLabel: '피부·헤어', name: '비타민C', note: '콜라겐 루틴과 함께 보는 기본 조합이에요.' },
  ],
  eye: [
    { goalId: 'eye', goalLabel: '눈 건강', name: '루테인', note: '눈 건강 루틴에서 가장 기본처럼 많이 보는 성분이에요.' },
    { goalId: 'eye', goalLabel: '눈 건강', name: '오메가3', note: '건조감이나 피로 루틴과 함께 비교해요.' },
    { goalId: 'eye', goalLabel: '눈 건강', name: '아스타잔틴', note: '루테인과 함께 자주 보는 성분이에요.' },
  ],
  fitness: [
    { goalId: 'fitness', goalLabel: '운동·근력', name: '크레아틴', note: '운동 퍼포먼스 루틴에서 가장 많이 보는 대표 성분이에요.' },
    { goalId: 'fitness', goalLabel: '운동·근력', name: '단백질', note: '기본 회복 루틴으로 함께 보는 경우가 많아요.' },
    { goalId: 'fitness', goalLabel: '운동·근력', name: 'BCAA', note: '운동 전후 루틴에서 자주 비교해요.' },
  ],
  liver: [
    { goalId: 'liver', goalLabel: '간 건강', name: '밀크씨슬', note: '간 건강 루틴에서 가장 기본처럼 많이 보는 성분이에요.' },
    { goalId: 'liver', goalLabel: '간 건강', name: '비타민B군', note: '기본 활력 루틴과 함께 같이 보기 좋아요.' },
    { goalId: 'liver', goalLabel: '간 건강', name: '헛개나무추출물', note: '컨디션 루틴 쪽으로 함께 많이 비교해요.' },
  ],
  bloodFlow: [],
  bloodSugar: [],
  boneJoint: [],
  women: [],
};

const overlapRules = [
  {
    supplements: ['멀티비타민', '비타민C'],
    text: '멀티비타민과 비타민C를 같이 먹는다면 비타민C가 이미 들어 있는지 먼저 확인해보는 게 좋아요.',
  },
  {
    supplements: ['멀티비타민', '비타민D'],
    text: '멀티비타민 안에 비타민D가 포함된 경우가 많아서 함량이 겹치지 않는지 한 번 보는 편이 좋아요.',
  },
  {
    supplements: ['멀티비타민', '아연'],
    text: '멀티비타민과 아연을 같이 먹는다면 아연 함량이 너무 높지 않은지 같이 보는 게 좋아요.',
  },
  {
    supplements: ['마그네슘', '칼슘'],
    text: '마그네슘과 칼슘은 같이 챙기는 경우가 많지만 제품별 함량 차이가 커서 1일 기준으로 비교해보는 게 좋아요.',
  },
  {
    supplements: ['루테인', '오메가3'],
    text: '루테인과 오메가3는 눈 건강 루틴에서 자주 함께 보지만 총 제품 수가 너무 많아지지 않게 정리하는 게 좋아요.',
  },
];

const supplementGoalMap: Record<string, GoalId> = {
  멀티비타민: 'immune',
  비타민C: 'immune',
  비타민D: 'boneJoint',
  비타민B군: 'fatigue',
  마그네슘: 'sleep',
  아연: 'immune',
  유산균: 'gut',
  오메가3: 'eye',
  루테인: 'eye',
  콜라겐: 'skin',
  바나바잎추출물: 'bloodSugar',
  비오틴: 'skin',
  철분: 'women',
  칼슘: 'boneJoint',
  프로폴리스: 'immune',
  코엔자임Q10: 'fatigue',
  홍삼: 'fatigue',
  테아닌: 'sleep',
  크레아틴: 'fitness',
  단백질: 'fitness',
};

function getGoalLabel(goalId: GoalId) {
  return goalOptions.find((goal) => goal.goalId === goalId)?.label ?? '면역';
}

function buildRecommendations(
  selectedGoalId: GoalId,
  selectedExtraGoalIds: GoalId[],
  selectedFollowUps: string[],
): RecommendedIngredient[] {
  const main = goalRecommendationMap[selectedGoalId] ?? [];
  const extra = selectedExtraGoalIds.flatMap((goalId) => (goalRecommendationMap[goalId] ?? []).slice(0, 1));

  const merged = [...main, ...extra].reduce<RecommendedIngredient[]>((acc, item) => {
    if (!acc.find((saved) => saved.name === item.name)) {
      acc.push(item);
    }
    return acc;
  }, []);

  if (selectedGoalId === 'sleep' && selectedFollowUps.includes('잠드는 데 시간이 오래 걸려요')) {
    return merged
      .map((item) =>
        item.name === '멜라토닌'
          ? { ...item, note: '잠드는 타이밍이 고민일 때 특히 많이 비교해요.' }
          : item,
      )
      .slice(0, 4);
  }

  if (selectedGoalId === 'gut' && selectedFollowUps.includes('속이 자주 더부룩해요')) {
    return merged
      .map((item) =>
        item.name === '소화효소'
          ? { ...item, note: '식후 더부룩함이 신경 쓰일 때 함께 많이 보는 성분이에요.' }
          : item,
      )
      .slice(0, 4);
  }

  if (selectedGoalId === 'fitness' && selectedFollowUps.includes('운동 목표가 근력 쪽에 가까워요')) {
    return merged
      .map((item) =>
        item.name === '크레아틴'
          ? { ...item, note: '근력과 퍼포먼스 루틴에서 가장 먼저 많이 비교해요.' }
          : item,
      )
      .slice(0, 4);
  }

  return merged.slice(0, 4);
}

function buildFeedbackReview(
  selectedCurrentSupplements: string[],
  selectedSupportGoalId: GoalId | null,
): FeedbackReview {
  const overlaps = overlapRules
    .filter((rule) => rule.supplements.every((supplement) => selectedCurrentSupplements.includes(supplement)))
    .map((rule) => rule.text);

  const selectedCount = selectedCurrentSupplements.length;
  const overlapCount = overlaps.length;
  const supportGoalLabel = selectedSupportGoalId ? getGoalLabel(selectedSupportGoalId) : '없음';

  let headline = '가볍게 잘 챙기고 있어요';
  let summary = '현재 조합은 비교적 단순해서, 필요한 목적만 덧붙여도 무리 없이 정리하기 좋아 보여요.';

  if (selectedCount >= 4 || overlapCount > 0) {
    headline = '조금 정리해보면 더 좋아요';
    summary = '지금 조합은 제품 수가 조금 많아졌거나 비슷한 축이 겹칠 수 있어 보여요. 함량과 목적을 한 번 정리해보는 게 좋아요.';
  }

  if (selectedCount === 0) {
    headline = '먼저 현재 조합부터 골라주세요';
    summary = '먹고 있는 영양제를 선택하면 겹칠 수 있는 성분과 더 챙겨볼 목적을 같이 정리해드릴게요.';
  }

  const checks: string[] = [];

  if (selectedCount === 0) {
    checks.push('현재 먹는 영양제가 없다면 목적 하나만 먼저 정하고 1~2개부터 가볍게 시작하는 편이 좋아요.');
  } else {
    checks.push(`지금 선택한 영양제는 ${selectedCount}종이에요. 너무 많아지면 복용 피로가 커질 수 있어서 핵심 목적 위주로 정리하는 게 좋아요.`);

    if (overlapCount > 0) {
      checks.push(...overlaps);
    } else {
      checks.push('눈에 띄는 중복 조합은 많지 않지만, 멀티비타민처럼 여러 성분이 들어 있는 제품은 함량을 한 번 더 확인해보는 편이 좋아요.');
    }

    if (selectedSupportGoalId) {
      checks.push(`추가로 챙기고 싶은 목적을 ${supportGoalLabel}로 골랐어요. 현재 조합을 크게 건드리기보다 이 목적에 맞는 성분 1개부터 같이 보는 방식이 더 편해요.`);
    } else {
      checks.push('추가로 챙기고 싶은 목적이 있다면 하나만 더 정해서 보완 성분을 붙이는 방식이 가장 깔끔해요.');
    }
  }

  const suggestionPool =
    selectedSupportGoalId && goalRecommendationMap[selectedSupportGoalId].length > 0
      ? goalRecommendationMap[selectedSupportGoalId]
      : selectedCurrentSupplements
          .map((supplement) => goalRecommendationMap[supplementGoalMap[supplement] ?? 'immune']?.[0])
          .filter(Boolean);

  const suggestions = suggestionPool.reduce<RecommendedIngredient[]>((acc, item) => {
    if (!item) {
      return acc;
    }

    if (
      !acc.find((saved) => saved.name === item.name) &&
      !selectedCurrentSupplements.includes(item.name)
    ) {
      acc.push(item);
    }

    return acc;
  }, []).slice(0, 3);

  return {
    headline,
    summary,
    badges: [
      { label: '현재 조합', value: selectedCount === 0 ? '미선택' : `${selectedCount}종` },
      { label: '중복 체크', value: overlapCount === 0 ? '가벼움' : `${overlapCount}개` },
      { label: '추가 목적', value: supportGoalLabel },
    ],
    checks,
    suggestions,
  };
}

export function PersonalScreen({
  isDarkMode,
  theme,
  onOpenIngredientDetail,
}: PersonalScreenProps) {
  const [selectedMode, setSelectedMode] = useState<PersonalMode>('recommend');
  const [selectedGoalId, setSelectedGoalId] = useState<GoalId>('sleep');
  const [selectedExtraGoalIds, setSelectedExtraGoalIds] = useState<GoalId[]>(['fatigue']);
  const [selectedFollowUps, setSelectedFollowUps] = useState<string[]>([]);
  const [selectedCurrentSupplements, setSelectedCurrentSupplements] = useState<string[]>(['마그네슘', '유산균']);
  const [selectedSupportGoalId, setSelectedSupportGoalId] = useState<GoalId | null>('sleep');

  const selectedGoal = goalOptions.find((goal) => goal.goalId === selectedGoalId) ?? goalOptions[0];

  const recommendations = useMemo(
    () => buildRecommendations(selectedGoalId, selectedExtraGoalIds, selectedFollowUps),
    [selectedGoalId, selectedExtraGoalIds, selectedFollowUps],
  );

  const feedbackReview = useMemo(
    () => buildFeedbackReview(selectedCurrentSupplements, selectedSupportGoalId),
    [selectedCurrentSupplements, selectedSupportGoalId],
  );

  const toggleFollowUp = (item: string) => {
    setSelectedFollowUps((prev) =>
      prev.includes(item) ? prev.filter((value) => value !== item) : [...prev, item],
    );
  };

  const toggleCurrentSupplement = (item: string) => {
    setSelectedCurrentSupplements((prev) =>
      prev.includes(item) ? prev.filter((value) => value !== item) : [...prev, item],
    );
  };

  const toggleExtraGoal = (goalId: GoalId) => {
    setSelectedExtraGoalIds((prev) => {
      if (prev.includes(goalId)) {
        return prev.filter((item) => item !== goalId);
      }

      if (prev.length >= 2) {
        return prev;
      }

      return [...prev, goalId];
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <View style={styles.resultsHeaderBlock}>
          <Text style={[styles.resultsHeaderTitle, { color: theme.textStrong, marginLeft: 0 }]}>
            개인맞춤
          </Text>
        </View>
        <View style={styles.topBarActions}>
          <Pressable style={styles.themeToggle}>
            <Ionicons
              name={isDarkMode ? 'moon-outline' : 'sparkles-outline'}
              size={18}
              color={theme.textStrong}
            />
          </Pressable>
        </View>
      </View>

      <View
        style={[
          styles.section,
          {
            backgroundColor: theme.surface,
            borderColor: theme.borderSoft,
          },
        ]}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textStrong }]}>어떤 도움을 받고 싶으세요?</Text>
        </View>

        <View style={styles.personalModeList}>
          <Pressable
            onPress={() => setSelectedMode('recommend')}
            style={[
              styles.personalModeCard,
              {
                backgroundColor: selectedMode === 'recommend' ? theme.iconSurface : theme.surfaceAlt,
                borderColor: selectedMode === 'recommend' ? theme.point : theme.borderSoft,
              },
            ]}
          >
            <View style={styles.personalModeIconWrap}>
              <Ionicons name="sparkles-outline" size={18} color={theme.point} />
            </View>
            <View style={styles.personalModeTextWrap}>
              <Text style={[styles.personalModeTitle, { color: theme.textStrong }]}>
                맞춤 영양제 추천받기
              </Text>
              <Text style={[styles.personalModeDescription, { color: theme.textSubtle }]}>
                지금 나한테 먼저 맞을 것 같은 영양제를 가볍게 추천받아보세요.
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => setSelectedMode('feedback')}
            style={[
              styles.personalModeCard,
              {
                backgroundColor: selectedMode === 'feedback' ? theme.iconSurface : theme.surfaceAlt,
                borderColor: selectedMode === 'feedback' ? theme.point : theme.borderSoft,
              },
            ]}
          >
            <View style={styles.personalModeIconWrap}>
              <Ionicons name="checkbox-outline" size={18} color={theme.point} />
            </View>
            <View style={styles.personalModeTextWrap}>
              <Text style={[styles.personalModeTitle, { color: theme.textStrong }]}>
                복용 중인 영양제 점검받기
              </Text>
              <Text style={[styles.personalModeDescription, { color: theme.textSubtle }]}>
                지금 먹고 있는 조합이 괜찮은지 한 번에 점검해보세요.
              </Text>
            </View>
          </Pressable>
        </View>
      </View>

      {selectedMode === 'recommend' ? (
        <>
          <View
            style={[
              styles.section,
              {
                backgroundColor: theme.surface,
                borderColor: theme.borderSoft,
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.textStrong }]}>
                먼저 챙기고 싶은 목적을 골라보세요
              </Text>
            </View>

            <View style={styles.goalGrid}>
              {goalOptions.map((option) => {
                const active = selectedGoalId === option.goalId;

                return (
                  <Pressable
                    key={option.goalId}
                    onPress={() => {
                      setSelectedGoalId(option.goalId);
                      setSelectedFollowUps([]);
                    }}
                    style={[
                      styles.personalChoiceChip,
                      {
                        backgroundColor: active ? theme.iconSurface : theme.surfaceAlt,
                        borderColor: active ? theme.point : theme.borderSoft,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.goalChipText,
                        { color: active ? theme.textStrong : theme.textMuted },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.personalCurrentWrap}>
              <Text style={[styles.personalCurrentLabel, { color: theme.textSubtle }]}>
                같이 보고 싶은 목적이 있다면 최대 2개까지 더 골라볼 수 있어요.
              </Text>
              <View style={styles.goalGrid}>
                {goalOptions
                  .filter((option) => option.goalId !== selectedGoalId)
                  .map((option) => {
                    const active = selectedExtraGoalIds.includes(option.goalId);
                    const disabled = !active && selectedExtraGoalIds.length >= 2;

                    return (
                      <Pressable
                        key={option.goalId}
                        onPress={() => toggleExtraGoal(option.goalId)}
                        style={[
                          styles.personalChoiceChip,
                          {
                            backgroundColor: active ? theme.iconSurface : theme.surfaceAlt,
                            borderColor: active ? theme.point : theme.borderSoft,
                            opacity: disabled ? 0.5 : 1,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.goalChipText,
                            { color: active ? theme.textStrong : theme.textMuted },
                          ]}
                        >
                          {option.label}
                        </Text>
                      </Pressable>
                    );
                  })}
              </View>
            </View>
          </View>

          <View
            style={[
              styles.section,
              {
                backgroundColor: theme.surface,
                borderColor: theme.borderSoft,
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.textStrong }]}>
                둘 중 더 가까운 쪽을 골라보세요
              </Text>
              <Text style={[styles.sectionLink, { color: theme.textSubtle }]}>
                {selectedGoal.label}
              </Text>
            </View>

            <View style={styles.personalOptionList}>
              {goalFollowUpMap[selectedGoal.goalId].map((item) => {
                const active = selectedFollowUps.includes(item);

                return (
                  <Pressable
                    key={item}
                    onPress={() => toggleFollowUp(item)}
                    style={[
                      styles.personalOptionRow,
                      {
                        backgroundColor: theme.surfaceAlt,
                        borderColor: active ? theme.point : theme.borderSoft,
                      },
                    ]}
                  >
                    <View style={styles.personalOptionTextWrap}>
                      <Text style={[styles.personalOptionTitle, { color: theme.textStrong }]}>{item}</Text>
                    </View>
                    <View
                      style={[
                        styles.personalCheckCircle,
                        {
                          backgroundColor: active ? theme.point : theme.surface,
                          borderColor: active ? theme.point : theme.borderSoft,
                        },
                      ]}
                    >
                      {active ? <Ionicons name="checkmark" size={14} color="#ffffff" /> : null}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View
            style={[
              styles.personalResultCard,
              {
                backgroundColor: theme.surface,
                borderColor: theme.borderSoft,
                shadowColor: theme.shadow,
              },
            ]}
          >
            <Text style={[styles.ingredientSectionEyebrow, { color: theme.point }]}>RECOMMEND</Text>
            <Text style={[styles.personalResultTitle, { color: theme.textStrong }]}>
              지금 먼저 보면 좋을 영양제예요
            </Text>
            <Text style={[styles.personalResultDescription, { color: theme.textMuted }]}>
              하나씩 눌러서 성분 설명과 제품 비교까지 바로 이어서 볼 수 있어요.
            </Text>

            <View style={styles.personalRecommendationList}>
              {recommendations.map((item) => (
                <Pressable
                  key={`${item.goalId}-${item.name}`}
                  onPress={() => onOpenIngredientDetail(item.goalId, item.goalLabel, item.name)}
                  style={[
                    styles.personalRecommendationItem,
                    {
                      backgroundColor: theme.surfaceAlt,
                      borderColor: theme.borderSoft,
                    },
                  ]}
                >
                  <View style={styles.personalRecommendationTextWrap}>
                    <Text style={[styles.personalRecommendationTitle, { color: theme.textStrong }]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.personalRecommendationNote, { color: theme.textSubtle }]}>
                      {item.note}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward-outline" size={18} color={theme.textMuted} />
                </Pressable>
              ))}
            </View>
          </View>
        </>
      ) : (
        <>
          <View
            style={[
              styles.section,
              {
                backgroundColor: theme.surface,
                borderColor: theme.borderSoft,
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.textStrong }]}>
                지금 먹고 있는 영양제를 골라보세요
              </Text>
            </View>

            <Text style={[styles.personalCurrentLabel, { color: theme.textSubtle }]}>
              보통 많이 먹는 영양제 위주로 넣어뒀어요. 해당되는 것만 가볍게 체크해보세요.
            </Text>

            <View style={styles.personalSupplementFrame}>
              <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                <View style={styles.personalSupplementGrid}>
                  {currentSupplementOptions.map((item) => {
                    const active = selectedCurrentSupplements.includes(item);

                    return (
                      <Pressable
                        key={item}
                        onPress={() => toggleCurrentSupplement(item)}
                        style={[
                          styles.personalChoiceChip,
                          {
                            backgroundColor: active ? theme.iconSurface : theme.surfaceAlt,
                            borderColor: active ? theme.point : theme.borderSoft,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.goalChipText,
                            { color: active ? theme.textStrong : theme.textMuted },
                          ]}
                        >
                          {item}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>

          <View
            style={[
              styles.section,
              {
                backgroundColor: theme.surface,
                borderColor: theme.borderSoft,
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.textStrong }]}>
                더 챙기고 싶은 목적이 있나요?
              </Text>
              <Text style={[styles.sectionLink, { color: theme.textSubtle }]}>선택 1개</Text>
            </View>

            <View style={styles.goalGrid}>
              {goalOptions.map((option) => {
                const active = selectedSupportGoalId === option.goalId;

                return (
                  <Pressable
                    key={option.goalId}
                    onPress={() => setSelectedSupportGoalId(active ? null : option.goalId)}
                    style={[
                      styles.personalChoiceChip,
                      {
                        backgroundColor: active ? theme.iconSurface : theme.surfaceAlt,
                        borderColor: active ? theme.point : theme.borderSoft,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.goalChipText,
                        { color: active ? theme.textStrong : theme.textMuted },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View
            style={[
              styles.personalResultCard,
              {
                backgroundColor: theme.surface,
                borderColor: theme.borderSoft,
                shadowColor: theme.shadow,
              },
            ]}
          >
            <Text style={[styles.ingredientSectionEyebrow, { color: theme.point }]}>REVIEW</Text>
            <Text style={[styles.personalResultTitle, { color: theme.textStrong }]}>
              {feedbackReview.headline}
            </Text>
            <Text style={[styles.personalResultDescription, { color: theme.textMuted }]}>
              {feedbackReview.summary}
            </Text>

            <View style={styles.personalInsightGrid}>
              {feedbackReview.badges.map((badge) => (
                <View
                  key={badge.label}
                  style={[
                    styles.personalInsightCard,
                    {
                      backgroundColor: theme.surfaceAlt,
                      borderColor: theme.borderSoft,
                    },
                  ]}
                >
                  <Text style={[styles.personalInsightLabel, { color: theme.textSubtle }]}>
                    {badge.label}
                  </Text>
                  <Text style={[styles.personalInsightValue, { color: theme.textStrong }]}>
                    {badge.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {feedbackReview.suggestions.length > 0 ? (
            <View
              style={[
                styles.section,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.borderSoft,
                },
              ]}
            >
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.textStrong }]}>
                  같이 보면 좋은 영양제
                </Text>
              </View>

              <View style={styles.personalRecommendationList}>
                {feedbackReview.suggestions.map((item) => (
                  <Pressable
                    key={`${item.goalId}-${item.name}`}
                    onPress={() => onOpenIngredientDetail(item.goalId, item.goalLabel, item.name)}
                    style={[
                      styles.personalRecommendationItem,
                      {
                        backgroundColor: theme.surfaceAlt,
                        borderColor: theme.borderSoft,
                      },
                    ]}
                  >
                    <View style={styles.personalRecommendationTextWrap}>
                      <Text style={[styles.personalRecommendationTitle, { color: theme.textStrong }]}>
                        {item.name}
                      </Text>
                      <Text style={[styles.personalRecommendationNote, { color: theme.textSubtle }]}>
                        {item.note}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward-outline" size={18} color={theme.textMuted} />
                  </Pressable>
                ))}
              </View>
            </View>
          ) : null}

          <View
            style={[
              styles.detailSection,
              {
                backgroundColor: theme.surface,
                borderColor: theme.borderSoft,
              },
            ]}
          >
            <Text style={[styles.detailSectionTitle, { color: theme.textStrong }]}>현재 조합 총평가</Text>
            <View style={styles.checkList}>
              {feedbackReview.checks.map((item) => (
                <View key={item} style={styles.checkRow}>
                  <Ionicons name="checkmark-circle-outline" size={18} color={theme.point} />
                  <Text style={[styles.checkText, { color: theme.textMuted }]}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}
