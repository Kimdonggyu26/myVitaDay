import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { styles } from '../styles';
import { AppTheme } from '../types';

type SettingsScreenProps = {
  theme: AppTheme;
  isDarkMode: boolean;
  onBack: () => void;
};

const settingGroups = [
  {
    title: '앱 설정',
    items: [
      { id: 'theme', label: '다크모드', meta: '밝은 화면 / 어두운 화면' },
      { id: 'push', label: '푸시 알림', meta: '복용 알림과 가격 알림 받기' },
    ],
  },
  {
    title: '복용 설정',
    items: [
      { id: 'routine', label: '기본 복용 시간', meta: '아침 · 점심 · 저녁 루틴 정하기' },
      { id: 'calendar', label: '캘린더 시작 요일', meta: '일요일 시작' },
    ],
  },
];

function SettingSection({
  title,
  items,
  theme,
}: {
  title: string;
  items: Array<{ id: string; label: string; meta: string }>;
  theme: AppTheme;
}) {
  return (
    <View
      style={[
        styles.detailSection,
        {
          backgroundColor: theme.surface,
          borderColor: theme.borderSoft,
        },
      ]}
    >
      <View style={styles.sectionHeader}>
        <Text style={[styles.detailSectionTitle, { color: theme.textStrong }]}>{title}</Text>
      </View>

      <View style={styles.mySettingList}>
        {items.map((menu, index) => (
          <Pressable
            key={menu.id}
            style={[
              styles.mySettingRow,
              {
                borderBottomWidth: index === items.length - 1 ? 0 : 1,
                borderColor: theme.borderSoft,
              },
            ]}
          >
            <View style={styles.mySettingTextWrap}>
              <Text style={[styles.mySettingTitle, { color: theme.textStrong }]}>{menu.label}</Text>
              <Text style={[styles.mySettingMeta, { color: theme.textMuted }]}>{menu.meta}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textSubtle} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export function SettingsScreen({ theme, isDarkMode, onBack }: SettingsScreenProps) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.myPageContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.resultsTopBar}>
        <Pressable style={styles.resultsBackButton} onPress={onBack}>
          <Ionicons name="chevron-back" size={22} color={theme.textStrong} />
        </Pressable>
        <Text style={[styles.resultsHeaderTitle, { color: theme.textStrong }]}>설정</Text>
        <View style={styles.resultsBackButton} />
      </View>

      <View
        style={[
          styles.myProfileCard,
          {
            backgroundColor: theme.surface,
            borderColor: theme.borderSoft,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <View style={styles.myProfileTopRow}>
          <View
            style={[
              styles.myQuickIconWrap,
              {
                backgroundColor: isDarkMode ? theme.mutedSurface : theme.softSurface,
              },
            ]}
          >
            <Ionicons name="settings-outline" size={18} color={theme.point} />
          </View>

          <View style={styles.myProfileTextWrap}>
            <Text style={[styles.myProfileName, { color: theme.textStrong }]}>기본 환경 설정</Text>
            <Text style={[styles.myProfileMeta, { color: theme.textMuted }]}>
              앱 화면, 알림, 복용 루틴 기본값을 정리해둘 수 있어요.
            </Text>
          </View>
        </View>
      </View>

      {settingGroups.map((group) => (
        <SettingSection key={group.title} title={group.title} items={group.items} theme={theme} />
      ))}
    </ScrollView>
  );
}
