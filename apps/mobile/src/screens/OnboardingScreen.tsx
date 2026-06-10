import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';

import { styles } from '../styles';

type OnboardingScreenProps = {
  onStart: () => void;
  onBrowse: () => void;
};

export function OnboardingScreen({ onStart, onBrowse }: OnboardingScreenProps) {
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroTranslate = useRef(new Animated.Value(18)).current;
  const actionOpacity = useRef(new Animated.Value(0)).current;
  const actionTranslate = useRef(new Animated.Value(22)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heroOpacity, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(heroTranslate, {
        toValue: 0,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(actionOpacity, {
        toValue: 1,
        duration: 600,
        delay: 180,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(actionTranslate, {
        toValue: 0,
        duration: 600,
        delay: 180,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [actionOpacity, actionTranslate, heroOpacity, heroTranslate]);

  return (
    <View style={styles.onboardingScreen}>
      <View style={styles.onboardingBackgroundOrbLarge} />
      <View style={styles.onboardingBackgroundOrbSmall} />

      <Animated.View
        style={[
          styles.onboardingHero,
          {
            opacity: heroOpacity,
            transform: [{ translateY: heroTranslate }],
          },
        ]}
      >
        <Text style={styles.onboardingBrand}>VitaDay</Text>
        <View style={styles.onboardingCopyWrap}>
          <Text style={styles.onboardingHeadlineTop}>내 몸에 맞게, 상황에 맞게</Text>
          <Text style={styles.onboardingHeadlineBottom}>영양제를 고르는</Text>
          <Text style={styles.onboardingHeadlineBottom}>가장 쉬운 방법</Text>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.onboardingActionWrap,
          {
            opacity: actionOpacity,
            transform: [{ translateY: actionTranslate }],
          },
        ]}
      >
        <Pressable style={styles.onboardingPrimaryButton} onPress={onStart}>
          <Text style={styles.onboardingPrimaryButtonText}>시작하기</Text>
        </Pressable>

        <Pressable style={styles.onboardingSecondaryButton} onPress={onBrowse}>
          <Text style={styles.onboardingSecondaryButtonText}>로그인 없이 둘러보기</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
