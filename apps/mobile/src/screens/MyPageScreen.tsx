import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { styles } from '../styles';
import { AppTheme } from '../types';

type MyPageScreenProps = {
  theme: AppTheme;
  isDarkMode: boolean;
  onOpenSettings: () => void;
  onToggleTheme: () => void;
};

const routineMenus = [
  { id: 'taking', label: '복용중인 영양제', meta: '6개 관리 중' },
  { id: 'calendar', label: '월간 복용 캘린더', meta: '이번 달 복용 흐름 보기' },
  { id: 'alert', label: '알림 루틴', meta: '아침 · 점심 · 저녁 알림' },
];

const savedMenus = [
  { id: 'saved', label: '저장한 제품', meta: '12개 저장됨' },
  { id: 'compare', label: '비교함', meta: '3개 담겨 있어요' },
  { id: 'recent', label: '최근 본 제품', meta: '다시 비교해보기' },
];

const personalMenus = [
  { id: 'retry', label: '개인맞춤 다시 하기', meta: '추천과 점검을 다시 시작해요' },
  { id: 'goals', label: '관심 목적 관리', meta: '수면 · 피로·활력 · 장·위 건강' },
];

const supportMenus = [
  { id: 'help', label: '문의하기', meta: '불편한 점이나 제안 보내기' },
  { id: 'terms', label: '이용약관', meta: '기본 약관 확인하기' },
  { id: 'policy', label: '개인정보처리방침', meta: '서비스 운영 정책 보기' },
  { id: 'logout', label: '로그아웃', meta: '현재 계정에서 로그아웃' },
];

function MenuSection({
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

export function MyPageScreen({
  theme,
  isDarkMode,
  onOpenSettings,
  onToggleTheme,
}: MyPageScreenProps) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.myPageContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topBar}>
        <View style={styles.myPageHeader}>
          <Text style={[styles.resultsHeaderTitle, { color: theme.textStrong }]}>마이페이지</Text>
          <Text style={[styles.myPageHeaderDescription, { color: theme.textMuted }]}>
            내 영양제와 관심 목적을 한곳에서 정리해보세요.
          </Text>
        </View>

        <Pressable style={styles.themeToggle} onPress={onOpenSettings}>
          <Ionicons name="settings-outline" size={22} color={theme.textStrong} />
        </Pressable>
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
              styles.myProfileAvatar,
              {
                backgroundColor: isDarkMode ? theme.mutedSurface : theme.softSurface,
              },
            ]}
          >
            <Text style={styles.myProfileAvatarText}>V</Text>
          </View>

          <View style={styles.myProfileTextWrap}>
            <Text style={[styles.myProfileName, { color: theme.textStrong }]}>코직님</Text>
            <Text style={[styles.myProfileMeta, { color: theme.textMuted }]}>
              오늘도 잊지 말고 영양제 천천히 챙겨봐요.
            </Text>
          </View>

          <Text style={[styles.myProfileRateText, { color: theme.point }]}>복용률 82%</Text>
        </View>

        <View style={styles.myProfileActionRow}>
          <Pressable style={styles.myProfileActionLink}>
            <Text style={[styles.myProfileActionText, { color: theme.textStrong }]}>정보 수정</Text>
          </Pressable>

          <Text style={[styles.myProfileActionDivider, { color: theme.textSubtle }]}>|</Text>

          <Pressable style={styles.myProfileActionLink}>
            <Text style={[styles.myProfileActionText, { color: theme.textStrong }]}>로그아웃</Text>
          </Pressable>

          <Text style={[styles.myProfileActionDivider, { color: theme.textSubtle }]}>|</Text>

          <Pressable style={styles.myProfileActionLink} onPress={onToggleTheme}>
            <Text style={[styles.myProfileActionText, { color: theme.textStrong }]}>
              {isDarkMode ? '라이트모드' : '다크모드'}
            </Text>
          </Pressable>
        </View>
      </View>

      <MenuSection title="내 루틴" items={routineMenus} theme={theme} />
      <MenuSection title="보관함" items={savedMenus} theme={theme} />
      <MenuSection title="개인맞춤" items={personalMenus} theme={theme} />
      <MenuSection title="도움 및 계정" items={supportMenus} theme={theme} />
    </ScrollView>
  );
}
