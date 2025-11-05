


// import { Icon } from '@gluestack-ui/themed';
// import { Tabs } from 'expo-router';
// import { House, ShoppingBag, User } from 'phosphor-react-native';
// import React from 'react';

// export default function Layout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarStyle: { backgroundColor: '#ffffffff', height: 60 },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <Icon
//               as={House}
//               h={28}
//               w={28}
//               color={focused ? '$black' : '$coolGray400'}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="products"
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <Icon
//               as={ShoppingBag}
//               h={28}
//               w={28}
//               color={focused ? '$black' : '$coolGray400'}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="account"
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <Icon
//               as={User}
//               h={28}
//               w={28}
//               color={focused ? '$black' : '$coolGray400'}
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }


import { Feather, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 64,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={26}
              color={focused ? '#000' : '#c9c9c9'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={26}
              color={focused ? '#000' : '#c9c9c9'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="product"
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="shopping-bag"
              size={26}
              color={focused ? '#000' : '#c9c9c9'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={26}
              color={focused ? '#000' : '#c9c9c9'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
