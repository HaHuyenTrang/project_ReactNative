// import { HStack, Image, ScrollView, Text, VStack } from "@gluestack-ui/themed";
// import { useLocalSearchParams } from "expo-router";
// import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function CategoryPage() {
//     const { category } = useLocalSearchParams();

//     const products = [
//         {
//             name: "Red Dress",
//             price: 59.0,
//             img: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
//         },
//         {
//             name: "Classic Blazer",
//             price: 120.0,
//             img: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
//         },
//     ];

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
//             <ScrollView px="$5" py="$5">
//                 <Text fontSize="$xl" fontWeight="bold" mb="$4" textTransform="capitalize">
//                     {category}
//                 </Text>
//                 <HStack flexWrap="wrap" justifyContent="space-between">
//                     {products.map((item, i) => (
//                         <VStack key={i} mb="$5" w="48%">
//                             <Image
//                                 source={{ uri: item.img }}
//                                 alt={item.name}
//                                 w="100%"
//                                 h={180}
//                                 rounded="$xl"
//                             />
//                             <Text mt="$2" fontWeight="500">{item.name}</Text>
//                             <Text color="$coolGray600">${item.price.toFixed(2)}</Text>
//                         </VStack>
//                     ))}
//                 </HStack>
//             </ScrollView>
//         </SafeAreaView>
//     );
// }





import {
    Box,
    HStack,
    Icon,
    Image,
    Pressable,
    ScrollView,
    Text,
    VStack,
} from "@gluestack-ui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Bell } from "phosphor-react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryPage() {
    const router = useRouter();
    const { category } = useLocalSearchParams();

    // 🧩 Giả lập dữ liệu sản phẩm theo category
    const productsByCategory = {
        women: [
            {
                name: "Floral Summer Dress",
                price: 58.0,
                img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
            },
            {
                name: "Elegant Maxi Dress",
                price: 75.0,
                img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
            },
        ],
        men: [
            {
                name: "Casual Shirt",
                price: 45.0,
                img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
            },
            {
                name: "Denim Jacket",
                price: 68.0,
                img: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
            },
        ],
        accessories: [
            {
                name: "Gold Necklace",
                price: 110.0,
                img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
            },
            {
                name: "Stylish Hat",
                price: 32.0,
                img: "https://images.unsplash.com/photo-1592878904946-0e5d2d5d9b17",
            },
        ],
        beauty: [
            {
                name: "Red Lipstick",
                price: 25.0,
                img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
            },
            {
                name: "Perfume Set",
                price: 80.0,
                img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
            },
        ],
    };

    const items = productsByCategory[category?.toString() || "women"] || [];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>
            <ScrollView bg="$white" flex={1} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <HStack justifyContent="space-between" alignItems="center" px="$5" py="$4">
                    <Pressable onPress={() => router.back()}>
                        <Icon as={ArrowLeft} size="xl" color="$black" />
                    </Pressable>
                    <Text fontSize="$xl" fontWeight="bold" textTransform="capitalize">
                        {category}
                    </Text>
                    <Icon as={Bell} size="xl" color="#FF5A8A" />
                </HStack>

                {/* Banner */}
                <Box px="$5" mt="$3">
                    <Image
                        source={{
                            uri:
                                category === "men"
                                    ? "https://images.unsplash.com/photo-1514995669114-6081e934b693"
                                    : "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
                        }}
                        alt="Category banner"
                        w="100%"
                        h={180}
                        rounded="$xl"
                    />
                    <Text mt="$3" fontSize="$xl" fontWeight="bold">
                        {category?.toString().charAt(0).toUpperCase() + category?.toString().slice(1)} Collection
                    </Text>
                </Box>

                {/* Products Grid */}
                <VStack px="$5" mt="$5" mb="$10" space="md">
                    <Text fontSize="$lg" fontWeight="bold">
                        Featured Products
                    </Text>
                    <HStack flexWrap="wrap" justifyContent="space-between">
                        {items.map((item, i) => (
                            <VStack key={i} mb="$5" w="48%">
                                <Image
                                    source={{ uri: item.img }}
                                    alt={item.name}
                                    w="100%"
                                    h={180}
                                    rounded="$xl"
                                />
                                <Text mt="$2" fontWeight="500">
                                    {item.name}
                                </Text>
                                <Text color="$coolGray600">${item.price.toFixed(2)}</Text>
                            </VStack>
                        ))}
                    </HStack>
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}
