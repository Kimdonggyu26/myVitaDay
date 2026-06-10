import React from 'react';
import { ScrollView, Text, View } from 'react-native';

type AppErrorBoundaryProps = {
  children: React.ReactNode;
};

type AppErrorBoundaryState = {
  error: Error | null;
};

export class AppErrorBoundary extends React.Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error('App render error:', error);
  }

  render() {
    if (this.state.error) {
      return (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: '#ffffff',
            paddingHorizontal: 24,
            paddingVertical: 32,
          }}
        >
          <View style={{ gap: 12 }}>
            <Text style={{ color: '#111111', fontSize: 24, fontWeight: '800' }}>
              화면 렌더링 오류
            </Text>
            <Text style={{ color: '#4b5563', fontSize: 14, lineHeight: 20 }}>
              아래 오류를 기준으로 바로 수정할게요.
            </Text>
            <View
              style={{
                backgroundColor: '#f6f8fb',
                borderColor: '#dbe2ea',
                borderRadius: 16,
                borderWidth: 1,
                padding: 16,
              }}
            >
              <Text style={{ color: '#111111', fontSize: 14, lineHeight: 20 }}>
                {this.state.error.message}
              </Text>
            </View>
          </View>
        </ScrollView>
      );
    }

    return this.props.children;
  }
}
