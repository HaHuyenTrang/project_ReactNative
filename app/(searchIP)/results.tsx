import {
    Box,
    HStack,
    Icon,
    Image,
    Input,
    InputField,
    Pressable,
    Text,
    VStack
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import { ArrowLeft, MagnifyingGlass } from "phosphor-react-native";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchResults() {
    const router = useRouter();
    const [query, setQuery] = useState("Dresses");

    const products = [
        {
            name: "Linen Dress",
            price: 52.0,
            oldPrice: 60.0,
            rating: 4.8,
            img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        },
        {
            name: "Fitted Waist Dress",
            price: 47.9,
            oldPrice: 59.0,
            rating: 4.5,
            img: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
        },
        {
            name: "Modal Dress",
            price: 68.0,
            oldPrice: null,
            rating: 4.9,
            img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
        },
        {
            name: "Front Tie Mini Dress",
            price: 59.0,
            oldPrice: null,
            rating: 4.6,
            img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
        },
        {
            name: "Chiffon Dress",
            price: 85.0,
            oldPrice: null,
            rating: 4.7,
            img: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47",
        },
        {
            name: "Tie Back Mini Dress",
            price: 67.0,
            oldPrice: null,
            rating: 4.4,
            img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
        },
        {
            name: "Leaves Green Dress",
            price: 64.0,
            oldPrice: 70.0,
            rating: 4.8,
            img: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
        },
        {
            name: "Off Shoulder Dress",
            price: 78.9,
            oldPrice: 85.0,
            rating: 4.7,
            img: "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
        },
    ];

    const renderProduct = ({ item }: any) => (
        <Pressable
            bg="$white"
            rounded="$xl"
            shadowColor="$black"
            shadowOpacity={0.08}
            shadowRadius={5}
            p="$2"
            mb="$4"
            flex={1}
            mx="$1"
        >
            <Box position="relative">
                <Image
                    source={{ uri: item.img }}
                    alt={item.name}
                    w="100%"
                    h={180}
                    rounded="$lg"
                />
                <Pressable
                    position="absolute"
                    top={10}
                    right={10}
                    bg="$white"
                    p="$1.5"
                    rounded="$full"
                    shadowColor="$black"
                    shadowOpacity={0.1}
                    shadowRadius={4}
                >
                    <Icon as={Heart} color="$red500" size="sm" />
                </Pressable>
            </Box>

            <VStack space="xs" mt="$2">
                <Text fontWeight="500" numberOfLines={1}>
                    {item.name}
                </Text>

                <HStack space="sm" alignItems="center">
                    <Text fontWeight="bold" fontSize="$md">
                        ${item.price.toFixed(2)}
                    </Text>
                    {item.oldPrice && (
                        <Text
                            color="$coolGray500"
                            fontSize="$sm"
                            textDecorationLine="line-through"
                        >
                            ${item.oldPrice.toFixed(2)}
                        </Text>
                    )}
                </HStack>

                <HStack alignItems="center" space="xs">
                    <Text color="$green600" fontSize="$sm">
                        ★ {item.rating}
                    </Text>
                </HStack>
            </VStack>
        </Pressable>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>
            {/* Header */}
            <HStack
                alignItems="center"
                justifyContent="space-between"
                px="$4"
                py="$3"
                borderBottomWidth={1}
                borderColor="$coolGray200"
            >
                <HStack alignItems="center" space="sm">
                    <Pressable onPress={() => router.back()}>
                        <Icon as={ArrowLeft} size="xl" color="$black" />
                    </Pressable>
                    <Text fontSize="$lg" fontWeight="bold">
                        Dresses
                    </Text>
                </HStack>

                <Pressable
                    px="$3"
                    py="$1.5"
                    borderWidth={1}
                    borderColor="$coolGray300"
                    rounded="$full"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="row"
                >
                    {/* <Icon as={FunnelSimple} size="sm" color="$black" mr="$1" /> */}
                    <Text fontSize="$sm" color="$black">🔻 Filter
                    </Text>
                </Pressable>
            </HStack>

            {/* Search info */}
            <VStack px="$5" py="$3" space="xs">
                <Text fontSize="$md" color="$coolGray500">
                    Found
                </Text>
                <Text fontWeight="bold" fontSize="$lg">
                    152 Results
                </Text>
            </VStack>

            {/* Search input */}
            <HStack px="$5" mb="$3">
                <Input flex={1} rounded="$full" bg="$coolGray100" borderColor="$coolGray300">
                    <HStack alignItems="center" px="$3" space="sm">
                        <Icon as={MagnifyingGlass} size="md" color="$coolGray500" />
                        <InputField
                            placeholder="Search for items..."
                            value={query}
                            onChangeText={setQuery}
                        />
                    </HStack>
                </Input>
            </HStack>

            {/* Product grid */}
            <FlatList
                data={products}
                numColumns={2}
                keyExtractor={(item, i) => i.toString()}
                renderItem={renderProduct}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 12,
                    paddingBottom: 80,
                }}
            />
        </SafeAreaView>
    );
}
