import { initI18n } from '@/i18n';
import { ThemeProvider } from '@/theme/context';
import { customFontsToLoad } from '@/theme/typography';
import { loadDateFnsLocale } from '@/utils/formatDate';
import { useFonts } from '@expo-google-fonts/space-grotesk';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad);
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale());
  }, []);

  const loaded = fontsLoaded && isI18nInitialized;

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
