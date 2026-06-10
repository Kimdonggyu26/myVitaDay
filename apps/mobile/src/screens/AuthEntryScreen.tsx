import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { styles } from '../styles';
import { AppTheme } from '../types';

type AuthEntryScreenProps = {
  theme: AppTheme;
  onBack: () => void;
  onBrowse: () => void;
};

export function AuthEntryScreen({ theme, onBack, onBrowse }: AuthEntryScreenProps) {
  return (
    <View style={[styles.authScreen, { backgroundColor: '#63b4f2' }]}>
      <View style={styles.authTopBar}>
        <Pressable style={styles.authBackButton} onPress={onBack}>
          <Ionicons name="chevron-back" size={22} color="#ffffff" />
        </Pressable>
      </View>

      <View style={styles.authBody}>
        <Text style={styles.authBrand}>VitaDay</Text>
        <Text style={styles.authHeading}>어떻게 시작할까요?</Text>
        <Text style={styles.authDescription}>
          계정으로 시작하면 추천과 복용기록을 저장해둘 수 있어요.
        </Text>

        <View style={styles.authButtonGroup}>
          <Pressable
            style={[
              styles.authPrimaryButton,
              { backgroundColor: '#111111' },
            ]}
          >
            <Text style={styles.authPrimaryButtonText}>로그인</Text>
          </Pressable>

          <Pressable
            style={[
              styles.authOutlineButton,
              { borderColor: 'rgba(255,255,255,0.75)' },
            ]}
          >
            <Text style={styles.authOutlineButtonText}>회원가입</Text>
          </Pressable>

          <Pressable style={styles.authGhostButton} onPress={onBrowse}>
            <Text style={styles.authGhostButtonText}>로그인 없이 둘러보기</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
