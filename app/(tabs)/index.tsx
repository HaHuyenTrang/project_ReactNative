

// import {
//   Box,
//   Button,
//   ButtonText,
//   HStack,
//   Icon,
//   Image,
//   Pressable,
//   ScrollView,
//   Text,
//   VStack,
// } from '@gluestack-ui/themed';
// import { router } from 'expo-router';
// import {
//   Baby,
//   Bell,
//   Grid,
//   Menu,
//   Shirt,
//   ShoppingBag,
//   Watch
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

//         {/* Category Tabs (Women, Men, etc.) */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           px="$5"
//           py="$2"
//           mt="$1"
//         >
//           {[
//             { name: 'Women', icon: Shirt },
//             { name: 'Men', icon: Grid },
//             { name: 'Accessories', icon: Watch },
//             { name: 'Kids', icon: Baby },
//             { name: 'Shoes', icon: ShoppingBag },
//           ].map((cat, i) => (
//             <Pressable
//               key={i}
//               alignItems="center"
//               justifyContent="center"
//               mr="$6"
//             >
//               <Icon as={cat.icon} size={22} color={i === 0 ? '$black' : '$coolGray500'} />
//               <Text
//                 mt="$1"
//                 fontSize="$sm"
//                 fontWeight={i === 0 ? 'bold' : 'normal'}
//                 color={i === 0 ? '$black' : '$coolGray500'}
//               >
//                 {cat.name}
//               </Text>
//             </Pressable>
//           ))}
//         </ScrollView>

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

//         {/* Top Collection */}
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
//         <Box px="$5" mb="$10">
//           <Button
//             w="100%"
//             rounded="$full"
//             bg="$black"
//             onPress={() => router.push("/(product)/product")}
//           >
//             <ButtonText color="$white" fontWeight="bold">
//               🛍️ Go To Store
//             </ButtonText>
//           </Button>
//         </Box>
//       </ScrollView>


//     </SafeAreaView>
//   );
// }


















import { Box, Button, ButtonText, HStack, Icon, Image, Pressable, ScrollView, Text, VStack } from "@gluestack-ui/themed"
import { router } from "expo-router"
import { Baby, Bell, ChevronRight, Grid, Menu, Shirt, ShoppingBag, Star, Watch } from "lucide-react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function HomePage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f6" }} edges={["top"]}>
      <ScrollView bg="#f8f8f6" flex={1}>
        {/* Header - Modern minimalist */}
        <HStack justifyContent="space-between" alignItems="center" px="$5" py="$5">
          <Pressable>
            <Icon as={Menu} size={28} color="#1a1a1a" />
          </Pressable>
          <VStack alignItems="center">
            <Text fontSize="$2xl" fontWeight="700" color="#1a1a1a" letterSpacing={2}>
              GEM
            </Text>
            <Text fontSize="$xs" color="#888" letterSpacing={1.5}>
              STORE
            </Text>
          </VStack>
          <Pressable>
            <Icon as={Bell} size={26} color="#1a1a1a" />
          </Pressable>
        </HStack>

        {/* Category Tabs - Enhanced with better visual feedback */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} px="$5" py="$3" mt="$2" scrollEventThrottle={16}>
          {[
            { name: "Women", icon: Shirt },
            { name: "Men", icon: Grid },
            { name: "Accessories", icon: Watch },
            { name: "Kids", icon: Baby },
            { name: "Shoes", icon: ShoppingBag },
          ].map((cat, i) => (
            <Pressable key={i} alignItems="center" justifyContent="center" mr="$6" opacity={i === 0 ? 1 : 0.6}>
              <Box bg={i === 0 ? "#d4a574" : "transparent"} p="$3" rounded="$full" mb="$2">
                <Icon as={cat.icon} size={24} color={i === 0 ? "$white" : "#1a1a1a"} />
              </Box>
              <Text fontSize="$sm" fontWeight={i === 0 ? "700" : "500"} color={i === 0 ? "#1a1a1a" : "#666"}>
                {cat.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Featured Banner - Modern design */}
        <Box px="$5" mt="$6" mb="$6">
          <Box
            position="relative"
            rounded="$3xl"
            overflow="hidden"
            bg="linear-gradient(135deg, #d4a574 0%, #8b7355 100%)"
            h={220}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
              }}
              alt="Autumn Collection"
              w="100%"
              h="100%"
              opacity={0.4}
            />
            <VStack position="absolute" left={0} top={0} right={0} bottom={0} justifyContent="flex-end" p="$6">
              <Text color="$white" fontSize="$sm" fontWeight="600" letterSpacing={1}>
                AUTUMN 2025
              </Text>
              <Text color="$white" fontSize="$3xl" fontWeight="700" mt="$2">
                New Season
              </Text>
              <Text color="$white" fontSize="$sm" mt="$2" opacity={0.9}>
                Discover the latest collection
              </Text>
            </VStack>
          </Box>
        </Box>

        {/* Feature Products */}
        <VStack px="$5" mt="$2" mb="$8">
          <HStack justifyContent="space-between" alignItems="center" mb="$4">
            <Text fontSize="$xl" fontWeight="700" color="#1a1a1a">
              Featured
            </Text>
            <Pressable>
              <HStack alignItems="center" space="sm">
                <Text color="#d4a574" fontSize="$sm" fontWeight="600">
                  See all
                </Text>
                <Icon as={ChevronRight} size={18} color="#d4a574" />
              </HStack>
            </Pressable>
          </HStack>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} space="md">
            {[
              {
                name: "Turtleneck Sweater",
                price: 39.99,
                img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
              },
              {
                name: "Long Sleeve Dress",
                price: 45.0,
                img: "https://images.unsplash.com/photo-1602810318383-e3b3b1a4cadd",
              },
              {
                name: "Summer Skirt",
                price: 38.0,
                img: "https://images.unsplash.com/photo-1585386959984-a4155223f7d2",
              },
            ].map((item, i) => (
              <VStack key={i} w={160}>
                <Box rounded="$2xl" overflow="hidden" bg="#fff" mb="$3">
                  <Image source={{ uri: item.img }} alt={item.name} w={160} h={200} />
                </Box>
                <Text fontWeight="600" fontSize="$sm" numberOfLines={2} color="#1a1a1a">
                  {item.name}
                </Text>
                <HStack justifyContent="space-between" alignItems="center" mt="$1">
                  <Text color="#d4a574" fontSize="$lg" fontWeight="700">
                    ${item.price.toFixed(2)}
                  </Text>
                  <Icon as={Star} size={18} color="#d4a574" fill="#d4a574" />
                </HStack>
              </VStack>
            ))}
          </ScrollView>
        </VStack>

        {/* Recommended */}
        <VStack px="$5" mb="$8">
          <HStack justifyContent="space-between" alignItems="center" mb="$4">
            <Text fontSize="$xl" fontWeight="700" color="#1a1a1a">
              Recommended
            </Text>
            <Pressable>
              <HStack alignItems="center" space="sm">
                <Text color="#d4a574" fontSize="$sm" fontWeight="600">
                  See all
                </Text>
                <Icon as={ChevronRight} size={18} color="#d4a574" />
              </HStack>
            </Pressable>
          </HStack>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} space="md">
            {[
              {
                name: "White basic hoodie",
                price: 29.99,
                img: "https://images.unsplash.com/photo-1618354691438-25bc0f9f98df",
              },
              {
                name: "Casual jacket",
                price: 50.0,
                img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
              },
            ].map((item, i) => (
              <VStack key={i} w={160}>
                <Box rounded="$2xl" overflow="hidden" bg="#fff" mb="$3">
                  <Image source={{ uri: item.img }} alt={item.name} w={160} h={200} />
                </Box>
                <Text fontWeight="600" fontSize="$sm" numberOfLines={2} color="#1a1a1a">
                  {item.name}
                </Text>
                <HStack justifyContent="space-between" alignItems="center" mt="$1">
                  <Text color="#d4a574" fontSize="$lg" fontWeight="700">
                    ${item.price.toFixed(2)}
                  </Text>
                  <Icon as={Star} size={18} color="#d4a574" fill="#d4a574" />
                </HStack>
              </VStack>
            ))}
          </ScrollView>
        </VStack>

        {/* Top Collection */}
        <VStack px="$5" mb="$10" space="lg">
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$xl" fontWeight="700" color="#1a1a1a">
              Top Collection
            </Text>
            <Pressable>
              <HStack alignItems="center" space="sm">
                <Text color="#d4a574" fontSize="$sm" fontWeight="600">
                  Explore
                </Text>
                <Icon as={ChevronRight} size={18} color="#d4a574" />
              </HStack>
            </Pressable>
          </HStack>

          {/* Large promo block */}
          <Box w="100%" rounded="$2xl" overflow="hidden" position="relative" h={220}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
              }}
              alt="For Slim & Beauty"
              w="100%"
              h="100%"
            />
            <Box position="absolute" left={0} top={0} right={0} bottom={0} bg="rgba(0,0,0,0.35)" />
            <VStack position="absolute" left="$5" bottom="$5">
              <Text color="$white" fontSize="$sm" fontWeight="600" letterSpacing={1}>
                SALE UP TO 40%
              </Text>
              <Text color="$white" fontSize="$2xl" fontWeight="700" mt="$1">
                SLIM & BEAUTY
              </Text>
            </VStack>
          </Box>

          {/* Sub collections */}
          <HStack space="lg">
            <VStack flex={1} space="lg">
              <Box rounded="$2xl" overflow="hidden" position="relative" h={140}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
                  }}
                  alt="Most sexy design"
                  w="100%"
                  h="100%"
                />
                <Box position="absolute" left={0} top={0} right={0} bottom={0} bg="rgba(0,0,0,0.3)" />
                <VStack position="absolute" left="$3" bottom="$3">
                  <Text color="$white" fontSize="$xs" opacity={0.9}>
                    Summer 2025
                  </Text>
                  <Text color="$white" fontSize="$sm" fontWeight="700" mt="$1">
                    New Designs
                  </Text>
                </VStack>
              </Box>

              <HStack space="lg">
                <VStack flex={1}>
                  <Box rounded="$2xl" overflow="hidden" h={130} bg="#fff" mb="$2">
                    <Image
                      source={{
                        uri: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
                      }}
                      alt="T-shirts"
                      w="100%"
                      h="100%"
                    />
                  </Box>
                  <Text fontWeight="600" textAlign="center" color="#1a1a1a" fontSize="$sm">
                    T-shirts
                  </Text>
                </VStack>
                <VStack flex={1}>
                  <Box rounded="$2xl" overflow="hidden" h={130} bg="#fff" mb="$2">
                    <Image
                      source={{
                        uri: "https://images.unsplash.com/photo-1602810318383-e3b3b1a4cadd",
                      }}
                      alt="Dresses"
                      w="100%"
                      h="100%"
                    />
                  </Box>
                  <Text fontWeight="600" textAlign="center" color="#1a1a1a" fontSize="$sm">
                    Dresses
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </HStack>
        </VStack>

        {/* CTA Button */}
        <Box px="$5" mb="$8">
          <Button
            w="100%"
            rounded="$full"
            bg="#1a1a1a"
            onPress={() => router.push("/(product)/product")}
            activeOpacity={0.8}
          >
            <ButtonText color="$white" fontWeight="700" fontSize="$lg">
              Start Shopping
            </ButtonText>
          </Button>
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}
