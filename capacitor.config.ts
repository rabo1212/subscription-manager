import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mitdok.app',
  appName: '믿독',
  webDir: 'dist',
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#0a0a0a',
  },
};

export default config;
