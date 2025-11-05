// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/use-color-scheme';

// export const unstable_settings = {
//   anchor: '(tabs)',
// };

// export default function RootLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }



// import { StyledProvider } from "@gluestack-style/react";
// import { config } from "@gluestack-ui/config";
// import { GluestackUIProvider } from "@gluestack-ui/themed";
// import { Slot } from "expo-router";

// export default function RootLayout() {
//   return (
//     <StyledProvider config={config}>
//       <GluestackUIProvider config={config}>
//         <Slot />
//       </GluestackUIProvider>
//     </StyledProvider>
//   );
// }


// import { StyledProvider } from "@gluestack-style/react";
// import { config } from "@gluestack-ui/config";
// import { GluestackUIProvider } from "@gluestack-ui/themed";
// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     <StyledProvider config={config}>
//       <GluestackUIProvider config={config}>
//         <Stack screenOptions={{ headerShown: false }} />
//       </GluestackUIProvider>
//     </StyledProvider>
//   );
// }


// app/_layout.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setLoggedIn(!!token);
      setIsReady(true);
    };
    checkLogin();
  }, []);


  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (

    <GluestackUIProvider config={config}>
      <Stack screenOptions={{ headerShown: false }}>
        {loggedIn ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="(auth)" />
        )}
      </Stack>
    </GluestackUIProvider>
  );
}
