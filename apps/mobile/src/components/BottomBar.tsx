import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { tabs } from '../data/mockCatalog';
import { styles } from '../styles';
import { AppTheme } from '../types';

type BottomBarProps = {
  isDarkMode: boolean;
  theme: AppTheme;
  currentTab: 'home' | 'personal' | 'intake' | 'mypage';
  onPressHome: () => void;
  onPressPersonal: () => void;
  onPressIntake: () => void;
  onPressMyPage: () => void;
};

export function BottomBar({
  isDarkMode,
  theme,
  currentTab,
  onPressHome,
  onPressPersonal,
  onPressIntake,
  onPressMyPage,
}: BottomBarProps) {
  return (
    <View
      style={[
        styles.bottomBar,
        {
          backgroundColor: isDarkMode
            ? 'rgba(23,26,29,0.98)'
            : 'rgba(255,255,255,0.98)',
          borderColor: theme.borderSoft,
        },
      ]}
      >
      {tabs.map((tab) => (
        <Pressable
          key={tab.id}
          style={styles.tabItem}
          onPress={
            tab.id === 'personal'
              ? onPressPersonal
              : tab.id === 'intake'
                ? onPressIntake
                : tab.id === 'mypage'
                  ? onPressMyPage
                  : onPressHome
          }
        >
          <Ionicons
            name={tab.icon}
            size={18}
            color={tab.id === currentTab ? theme.point : theme.tabMuted}
            style={styles.tabIcon}
          />
          <Text
            style={[
              styles.tabLabel,
              { color: tab.id === currentTab ? theme.point : theme.tabMuted },
              tab.id === currentTab ? styles.tabLabelActive : null,
            ]}
          >
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
