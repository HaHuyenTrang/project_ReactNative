// // import {
// //   Box,
// //   HStack,
// //   Image,
// //   Pressable,
// //   ScrollView,
// //   Text,
// //   VStack
// // } from '@gluestack-ui/themed';
// // import React from 'react';
// // import { SafeAreaView } from 'react-native-safe-area-context';

// // export default function HomePage() {
// //   return (
// //     <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>

// //       <ScrollView bg="$white" flex={1}>
// //         {/* Header */}
// //         <HStack justifyContent="space-between" alignItems="center" px="$5" py="$4">
// //           {/* <Icon as={List} w={28} h={28} color="$black" /> */}
// //           <Text fontSize="$2xl" fontWeight="bold">📑</Text>

// //           <Text fontSize="$2xl" fontWeight="bold">GemStore</Text>
// //           <Text fontSize="$2xl" fontWeight="bold">🛎️</Text>

// //           {/* <Icon as={Bell} w={28} h={28} color="$black" /> */}
// //         </HStack>

// //         {/* Banner */}
// //         <Box px="$5" mt="$2">
// //           <Image
// //             source={{ uri: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6' }}
// //             alt="Autumn Collection"
// //             w="100%"
// //             h={180}
// //             rounded="$xl"
// //           />
// //           <Text mt="$3" fontSize="$xl" fontWeight="bold">
// //             Autumn Collection 2022
// //           </Text>
// //         </Box>

// //         {/* Feature Products */}
// //         <VStack px="$5" mt="$5">
// //           <HStack justifyContent="space-between" alignItems="center">
// //             <Text fontSize="$lg" fontWeight="bold">Feature Products</Text>
// //             <Pressable>
// //               <Text color="$coolGray500">Show all</Text>
// //             </Pressable>
// //           </HStack>

// //           <ScrollView horizontal showsHorizontalScrollIndicator={false} mt="$3">
// //             {[
// //               {
// //                 name: 'Turtleneck Sweater',
// //                 price: 39.99,
// //                 img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
// //               },
// //               {
// //                 name: 'Long Sleeve Dress',
// //                 price: 45.0,
// //                 img: 'https://images.unsplash.com/photo-1602810318383-e3b3b1a4cadd',
// //               },
// //               {
// //                 name: 'Summer Skirt',
// //                 price: 38.0,
// //                 img: 'https://images.unsplash.com/photo-1585386959984-a4155223f7d2',
// //               },
// //             ].map((item, i) => (
// //               <VStack key={i} mr="$4" w={140}>
// //                 <Image
// //                   source={{ uri: item.img }}
// //                   alt={item.name}
// //                   w={140}
// //                   h={180}
// //                   rounded="$xl"
// //                 />
// //                 <Text mt="$2" fontWeight="500">{item.name}</Text>
// //                 <Text color="$coolGray600">${item.price.toFixed(2)}</Text>
// //               </VStack>
// //             ))}
// //           </ScrollView>
// //         </VStack>

// //         {/* Recommended */}
// //         <VStack px="$5" mt="$6">
// //           <HStack justifyContent="space-between" alignItems="center">
// //             <Text fontSize="$lg" fontWeight="bold">Recommended</Text>
// //             <Pressable>
// //               <Text color="$coolGray500">Show all</Text>
// //             </Pressable>
// //           </HStack>

// //           <ScrollView horizontal showsHorizontalScrollIndicator={false} mt="$3">
// //             {[
// //               {
// //                 name: 'White basic hoodie',
// //                 price: 29.99,
// //                 img: 'https://images.unsplash.com/photo-1618354691438-25bc0f9f98df',
// //               },
// //               {
// //                 name: 'Casual jacket',
// //                 price: 50.0,
// //                 img: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb',
// //               },
// //             ].map((item, i) => (
// //               <VStack key={i} mr="$4" w={140}>
// //                 <Image
// //                   source={{ uri: item.img }}
// //                   alt={item.name}
// //                   w={140}
// //                   h={180}
// //                   rounded="$xl"
// //                 />
// //                 <Text mt="$2" fontWeight="500">{item.name}</Text>
// //                 <Text color="$coolGray600">${item.price.toFixed(2)}</Text>
// //               </VStack>
// //             ))}
// //           </ScrollView>
// //         </VStack>

// //         {/* Top Collection */}
// //         <VStack px="$5" mt="$6" mb="$10">
// //           <HStack justifyContent="space-between" alignItems="center">
// //             <Text fontSize="$lg" fontWeight="bold">Top Collection</Text>
// //             <Pressable>
// //               <Text color="$coolGray500">Show all</Text>
// //             </Pressable>
// //           </HStack>

// //           <ScrollView horizontal showsHorizontalScrollIndicator={false} mt="$3">
// //             {[
// //               {
// //                 name: 'FOR SLIM & BEAUTY',
// //                 img: 'https://images.unsplash.com/photo-1520975916090-3105956dac38',
// //               },
// //               {
// //                 name: 'Most sexy design',
// //                 img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
// //               },
// //             ].map((item, i) => (
// //               <VStack key={i} mr="$4" w={180}>
// //                 <Image
// //                   source={{ uri: item.img }}
// //                   alt={item.name}
// //                   w={180}
// //                   h={200}
// //                   rounded="$xl"
// //                 />
// //                 <Text mt="$2" fontWeight="500">{item.name}</Text>
// //               </VStack>
// //             ))}
// //           </ScrollView>
// //         </VStack>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }







// import {
//   Box,
//   HStack,
//   Icon,
//   Image,
//   Pressable,
//   ScrollView,
//   Text,
//   VStack,
// } from '@gluestack-ui/themed';
// import {
//   Bell,
//   Menu
// } from 'lucide-react-native';
// import React from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export default function HomePage() {
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
//       <ScrollView bg="$white" flex={1}>
//         {/* Header */}
//         <HStack justifyContent="space-between" alignItems="center" px="$5" py="$4">
//           <Pressable>
//             <Icon as={Menu} size={28} color="$black" />
//           </Pressable>
//           <Text fontSize="$2xl" fontWeight="bold">GemStore</Text>
//           <Pressable>
//             <Icon as={Bell} size={26} color="$black" />
//           </Pressable>
//         </HStack>

//         {/* Banner */}
//         <Box px="$5" mt="$2">
//           <Image
//             source={{
//               uri: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6',
//             }}
//             alt="Autumn Collection"
//             w="100%"
//             h={180}
//             rounded="$2xl"
//           />
//           <Text mt="$3" fontSize="$xl" fontWeight="bold">
//             Autumn Collection 2025
//           </Text>
//         </Box>

//         {/* Feature Products */}
//         <VStack px="$5" mt="$6">
//           <HStack justifyContent="space-between" alignItems="center">
//             <Text fontSize="$lg" fontWeight="bold">Feature Products</Text>
//             <Pressable>
//               <Text color="$coolGray500" fontSize="$sm">Show all</Text>
//             </Pressable>
//           </HStack>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false} mt="$3">
//             {[
//               {
//                 name: 'Turtleneck Sweater',
//                 price: 39.99,
//                 img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
//               },
//               {
//                 name: 'Long Sleeve Dress',
//                 price: 45.0,
//                 img: 'https://images.unsplash.com/photo-1602810318383-e3b3b1a4cadd',
//               },
//               {
//                 name: 'Summer Skirt',
//                 price: 38.0,
//                 img: 'https://images.unsplash.com/photo-1585386959984-a4155223f7d2',
//               },
//             ].map((item, i) => (
//               <VStack key={i} mr="$4" w={150}>
//                 <Image
//                   source={{ uri: item.img }}
//                   alt={item.name}
//                   w={150}
//                   h={190}
//                   rounded="$2xl"
//                 />
//                 <Text mt="$2" fontWeight="600" numberOfLines={1}>{item.name}</Text>
//                 <Text color="$coolGray600">${item.price.toFixed(2)}</Text>
//               </VStack>
//             ))}
//           </ScrollView>
//         </VStack>

//         {/* Recommended */}
//         <VStack px="$5" mt="$6">
//           <HStack justifyContent="space-between" alignItems="center">
//             <Text fontSize="$lg" fontWeight="bold">Recommended</Text>
//             <Pressable>
//               <Text color="$coolGray500" fontSize="$sm">Show all</Text>
//             </Pressable>
//           </HStack>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false} mt="$3">
//             {[
//               {
//                 name: 'White basic hoodie',
//                 price: 29.99,
//                 img: 'https://images.unsplash.com/photo-1618354691438-25bc0f9f98df',
//               },
//               {
//                 name: 'Casual jacket',
//                 price: 50.0,
//                 img: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb',
//               },
//             ].map((item, i) => (
//               <VStack key={i} mr="$4" w={150}>
//                 <Image
//                   source={{ uri: item.img }}
//                   alt={item.name}
//                   w={150}
//                   h={190}
//                   rounded="$2xl"
//                 />
//                 <Text mt="$2" fontWeight="600" numberOfLines={1}>{item.name}</Text>
//                 <Text color="$coolGray600">${item.price.toFixed(2)}</Text>
//               </VStack>
//             ))}
//           </ScrollView>
//         </VStack>

//         {/* Top Collection - styled like GemStore */}
//         <VStack px="$5" mt="$6" mb="$20" space="lg">
//           <HStack justifyContent="space-between" alignItems="center">
//             <Text fontSize="$lg" fontWeight="bold">Top Collection</Text>
//             <Pressable>
//               <Text color="$coolGray500" fontSize="$sm">Show all</Text>
//             </Pressable>
//           </HStack>

//           {/* Large promo block */}
//           <Box w="100%" rounded="$2xl" overflow="hidden">
//             <Image
//               source={{
//                 uri: 'https://images.unsplash.com/photo-1520975916090-3105956dac38',
//               }}
//               alt="For Slim & Beauty"
//               w="100%"
//               h={200}
//             />
//             <Box position="absolute" left={20} top={20}>
//               <Text color="$white" fontSize="$sm">
//                 Sale up to 40%
//               </Text>
//               <Text color="$white" fontSize="$2xl" fontWeight="bold">
//                 FOR SLIM & BEAUTY
//               </Text>
//             </Box>
//           </Box>

//           {/* Sub collections */}
//           <HStack space="lg" mt="$4">
//             <VStack flex={1} space="lg">
//               <Box rounded="$2xl" overflow="hidden">
//                 <Image
//                   source={{
//                     uri: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
//                   }}
//                   alt="Most sexy design"
//                   w="100%"
//                   h={120}
//                 />
//                 <Box position="absolute" left={12} top={12}>
//                   <Text color="$white" fontSize="$xs">Summer Collection 2025</Text>
//                   <Text color="$white" fontSize="$md" fontWeight="bold">
//                     Most sexy &{'\n'}fabulous design
//                   </Text>
//                 </Box>
//               </Box>

//               <HStack space="lg">
//                 <VStack flex={1}>
//                   <Image
//                     source={{
//                       uri: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
//                     }}
//                     alt="T-shirts"
//                     w="100%"
//                     h={120}
//                     rounded="$2xl"
//                   />
//                   <Text mt="$2" fontWeight="500" textAlign="center">T-shirts</Text>
//                 </VStack>
//                 <VStack flex={1}>
//                   <Image
//                     source={{
//                       uri: 'https://images.unsplash.com/photo-1602810318383-e3b3b1a4cadd',
//                     }}
//                     alt="Dresses"
//                     w="100%"
//                     h={120}
//                     rounded="$2xl"
//                   />
//                   <Text mt="$2" fontWeight="500" textAlign="center">Dresses</Text>
//                 </VStack>
//               </HStack>
//             </VStack>
//           </HStack>
//         </VStack>
//       </ScrollView>


//     </SafeAreaView>
//   );
// }


import {
  Box,
  Button,
  ButtonText,
  HStack,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { router } from 'expo-router';
import {
  Baby,
  Bell,
  Grid,
  Menu,
  Shirt,
  ShoppingBag,
  Watch
} from 'lucide-react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      <ScrollView bg="$white" flex={1}>
        {/* Header */}
        <HStack justifyContent="space-between" alignItems="center" px="$5" py="$4">
          <Pressable>
            <Icon as={Menu} size={28} color="$black" />
          </Pressable>
          <Text fontSize="$2xl" fontWeight="bold">GemStore</Text>
          <Pressable>
            <Icon as={Bell} size={26} color="$black" />
          </Pressable>
        </HStack>

        {/* Category Tabs (Women, Men, etc.) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          px="$5"
          py="$2"
          mt="$1"
        >
          {[
            { name: 'Women', icon: Shirt },
            { name: 'Men', icon: Grid },
            { name: 'Accessories', icon: Watch },
            { name: 'Kids', icon: Baby },
            { name: 'Shoes', icon: ShoppingBag },
          ].map((cat, i) => (
            <Pressable
              key={i}
              alignItems="center"
              justifyContent="center"
              mr="$6"
            >
              <Icon as={cat.icon} size={22} color={i === 0 ? '$black' : '$coolGray500'} />
              <Text
                mt="$1"
                fontSize="$sm"
                fontWeight={i === 0 ? 'bold' : 'normal'}
                color={i === 0 ? '$black' : '$coolGray500'}
              >
                {cat.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Banner */}
        <Box px="$5" mt="$2">
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6',
            }}
            alt="Autumn Collection"
            w="100%"
            h={180}
            rounded="$2xl"
          />
          <Text mt="$3" fontSize="$xl" fontWeight="bold">
            Autumn Collection 2025
          </Text>
        </Box>

        {/* Feature Products */}
        <VStack px="$5" mt="$6">
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$lg" fontWeight="bold">Feature Products</Text>
            <Pressable>
              <Text color="$coolGray500" fontSize="$sm">Show all</Text>
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
              <VStack key={i} mr="$4" w={150}>
                <Image
                  source={{ uri: item.img }}
                  alt={item.name}
                  w={150}
                  h={190}
                  rounded="$2xl"
                />
                <Text mt="$2" fontWeight="600" numberOfLines={1}>{item.name}</Text>
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
              <Text color="$coolGray500" fontSize="$sm">Show all</Text>
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
              <VStack key={i} mr="$4" w={150}>
                <Image
                  source={{ uri: item.img }}
                  alt={item.name}
                  w={150}
                  h={190}
                  rounded="$2xl"
                />
                <Text mt="$2" fontWeight="600" numberOfLines={1}>{item.name}</Text>
                <Text color="$coolGray600">${item.price.toFixed(2)}</Text>
              </VStack>
            ))}
          </ScrollView>
        </VStack>

        {/* Top Collection */}
        <VStack px="$5" mt="$6" mb="$20" space="lg">
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$lg" fontWeight="bold">Top Collection</Text>
            <Pressable>
              <Text color="$coolGray500" fontSize="$sm">Show all</Text>
            </Pressable>
          </HStack>

          {/* Large promo block */}
          <Box w="100%" rounded="$2xl" overflow="hidden">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1520975916090-3105956dac38',
              }}
              alt="For Slim & Beauty"
              w="100%"
              h={200}
            />
            <Box position="absolute" left={20} top={20}>
              <Text color="$white" fontSize="$sm">
                Sale up to 40%
              </Text>
              <Text color="$white" fontSize="$2xl" fontWeight="bold">
                FOR SLIM & BEAUTY
              </Text>
            </Box>
          </Box>

          {/* Sub collections */}
          <HStack space="lg" mt="$4">
            <VStack flex={1} space="lg">
              <Box rounded="$2xl" overflow="hidden">
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
                  }}
                  alt="Most sexy design"
                  w="100%"
                  h={120}
                />
                <Box position="absolute" left={12} top={12}>
                  <Text color="$white" fontSize="$xs">Summer Collection 2025</Text>
                  <Text color="$white" fontSize="$md" fontWeight="bold">
                    Most sexy &{'\n'}fabulous design
                  </Text>
                </Box>
              </Box>

              <HStack space="lg">
                <VStack flex={1}>
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
                    }}
                    alt="T-shirts"
                    w="100%"
                    h={120}
                    rounded="$2xl"
                  />
                  <Text mt="$2" fontWeight="500" textAlign="center">T-shirts</Text>
                </VStack>
                <VStack flex={1}>
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1602810318383-e3b3b1a4cadd',
                    }}
                    alt="Dresses"
                    w="100%"
                    h={120}
                    rounded="$2xl"
                  />
                  <Text mt="$2" fontWeight="500" textAlign="center">Dresses</Text>
                </VStack>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
        <Box px="$5" mb="$10">
          <Button
            w="100%"
            rounded="$full"
            bg="$black"
            onPress={() => router.push("/(product)/product")}
          >
            <ButtonText color="$white" fontWeight="bold">
              🛍️ Go To Store
            </ButtonText>
          </Button>
        </Box>
      </ScrollView>


    </SafeAreaView>
  );
}
