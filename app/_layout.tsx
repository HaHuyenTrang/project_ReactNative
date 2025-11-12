// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Stack } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, View } from 'react-native';

// import { config } from '@gluestack-ui/config';
// import { GluestackUIProvider } from '@gluestack-ui/themed';

// export default function RootLayout() {
//   const [isReady, setIsReady] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkLogin = async () => {
//       const token = await AsyncStorage.getItem('userToken');
//       setLoggedIn(!!token);
//       setIsReady(true);
//     };
//     checkLogin();
//   }, []);


//   if (!isReady) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="black" />
//       </View>
//     );
//   }

//   return (

//     <GluestackUIProvider config={config}>
//       <Stack screenOptions={{ headerShown: false }}>
//         {loggedIn ? (
//           <Stack.Screen name="(tabs)" />
//         ) : (
//           <Stack.Screen name="(auth)" />
//         )}
//       </Stack>
//     </GluestackUIProvider>
//   );
// }



import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../services/queryClient";
import { CheckoutProvider } from "./(carts)/CheckoutContext";
export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setLoggedIn(!!token);
      setIsReady(true);
    };
    checkLogin();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <CheckoutProvider>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config}>
          <Stack screenOptions={{ headerShown: false }}>
            {loggedIn ? (
              <Stack.Screen name="(tabs)" />
            ) : (
              <Stack.Screen name="(auth)" />
            )}
          </Stack>
        </GluestackUIProvider>
      </QueryClientProvider>
    </CheckoutProvider>
  );
}
