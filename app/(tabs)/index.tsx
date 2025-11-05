// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <Link href="/modal">
//           <Link.Trigger>
//             <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//           </Link.Trigger>
//           <Link.Preview />
//           <Link.Menu>
//             <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
//             <Link.MenuAction
//               title="Share"
//               icon="square.and.arrow.up"
//               onPress={() => alert('Share pressed')}
//             />
//             <Link.Menu title="More" icon="ellipsis">
//               <Link.MenuAction
//                 title="Delete"
//                 icon="trash"
//                 destructive
//                 onPress={() => alert('Delete pressed')}
//               />
//             </Link.Menu>
//           </Link.Menu>
//         </Link>

//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });



import {
  Box,
  HStack,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { Bell, List } from 'phosphor-react-native';
import React from 'react';

export default function HomePage() {
  return (
    <ScrollView bg="$white" flex={1}>
      {/* Header */}
      <HStack justifyContent="space-between" alignItems="center" px="$5" py="$4">
        <Icon as={List} w={28} h={28} color="$black" />
        <Text fontSize="$2xl" fontWeight="bold">GemStore</Text>
        <Icon as={Bell} w={28} h={28} color="$black" />
      </HStack>

      {/* Banner */}
      <Box px="$5" mt="$2">
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6' }}
          alt="Autumn Collection"
          w="100%"
          h={180}
          rounded="$xl"
        />
        <Text mt="$3" fontSize="$xl" fontWeight="bold">
          Autumn Collection 2022
        </Text>
      </Box>

      {/* Feature Products */}
      <VStack px="$5" mt="$5">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$lg" fontWeight="bold">Feature Products</Text>
          <Pressable>
            <Text color="$coolGray500">Show all</Text>
          </Pressable>
        </HStack>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} mt="$3">
          {[
            {
              name: 'Turtleneck Sweater',
              price: 39.99,
              img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
            },
            {
              name: 'Long Sleeve Dress',
              price: 45.0,
              img: 'https://images.unsplash.com/photo-1602810318383-e3b3b1a4cadd',
            },
            {
              name: 'Summer Skirt',
              price: 38.0,
              img: 'https://images.unsplash.com/photo-1585386959984-a4155223f7d2',
            },
          ].map((item, i) => (
            <VStack key={i} mr="$4" w={140}>
              <Image
                source={{ uri: item.img }}
                alt={item.name}
                w={140}
                h={180}
                rounded="$xl"
              />
              <Text mt="$2" fontWeight="500">{item.name}</Text>
              <Text color="$coolGray600">${item.price.toFixed(2)}</Text>
            </VStack>
          ))}
        </ScrollView>
      </VStack>

      {/* Recommended */}
      <VStack px="$5" mt="$6">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$lg" fontWeight="bold">Recommended</Text>
          <Pressable>
            <Text color="$coolGray500">Show all</Text>
          </Pressable>
        </HStack>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} mt="$3">
          {[
            {
              name: 'White basic hoodie',
              price: 29.99,
              img: 'https://images.unsplash.com/photo-1618354691438-25bc0f9f98df',
            },
            {
              name: 'Casual jacket',
              price: 50.0,
              img: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb',
            },
          ].map((item, i) => (
            <VStack key={i} mr="$4" w={140}>
              <Image
                source={{ uri: item.img }}
                alt={item.name}
                w={140}
                h={180}
                rounded="$xl"
              />
              <Text mt="$2" fontWeight="500">{item.name}</Text>
              <Text color="$coolGray600">${item.price.toFixed(2)}</Text>
            </VStack>
          ))}
        </ScrollView>
      </VStack>

      {/* Top Collection */}
      <VStack px="$5" mt="$6" mb="$10">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$lg" fontWeight="bold">Top Collection</Text>
          <Pressable>
            <Text color="$coolGray500">Show all</Text>
          </Pressable>
        </HStack>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} mt="$3">
          {[
            {
              name: 'FOR SLIM & BEAUTY',
              img: 'https://images.unsplash.com/photo-1520975916090-3105956dac38',
            },
            {
              name: 'Most sexy design',
              img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
            },
          ].map((item, i) => (
            <VStack key={i} mr="$4" w={180}>
              <Image
                source={{ uri: item.img }}
                alt={item.name}
                w={180}
                h={200}
                rounded="$xl"
              />
              <Text mt="$2" fontWeight="500">{item.name}</Text>
            </VStack>
          ))}
        </ScrollView>
      </VStack>
    </ScrollView>
  );
}
