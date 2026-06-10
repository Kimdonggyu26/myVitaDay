import { Text, View } from 'react-native';

import { styles } from '../styles';
import { AppTheme } from '../types';

type BrandWordmarkProps = {
  theme: AppTheme;
};

export function BrandWordmark({ theme }: BrandWordmarkProps) {
  return (
    <View style={styles.brandRow}>
      <Text style={[styles.brand, { color: theme.point }]}>V</Text>
      <Text style={[styles.brand, { color: theme.text }]}>ita</Text>
      <Text style={[styles.brand, { color: theme.point }]}>D</Text>
      <Text style={[styles.brand, { color: theme.text }]}>ay</Text>
    </View>
  );
}
