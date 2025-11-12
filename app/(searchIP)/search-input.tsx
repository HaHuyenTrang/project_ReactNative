


import {
    Box,
    HStack,
    Icon,
    Image,
    Input,
    InputField,
    Pressable,
    ScrollView,
    Text,
    VStack,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { ArrowLeft, MagnifyingGlass } from "phosphor-react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchInputScreen() {
    const [isSearching, setIsSearching] = useState(false);
    const [query, setQuery] = useState("");
    const router = useRouter();

    const recentSearches = ["Sunglasses", "Sweater", "Hoodie"];
    const popularItems = [
        {
            name: "Lihua Tunic White",
            price: 53.0,
            img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
        },
        {
            name: "Skirt Dress",
            price: 34.0,
            img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

            <Box flex={1} bg="$white">
                <ScrollView px="$5" py="$6" showsVerticalScrollIndicator={false}>

                    {/* Search bar */}
                    {!isSearching ? (
                        <Pressable onPress={() => setIsSearching(true)}>
                            <HStack
                                alignItems="center"
                                bg="$coolGray100"
                                rounded="$full"
                                px="$3"
                                py="$2"
                                space="sm"
                                justifyContent="space-between"
                                w="100%"
                            >
                                {/* Ô nhập search */}
                                <Pressable onPress={() => setIsSearching(true)} flex={1}>
                                    <HStack alignItems="center" space="sm">
                                        <Icon as={MagnifyingGlass} size="lg" color="$coolGray500" />
                                        <Text color="$coolGray500" fontSize="$md">
                                            Search..........
                                        </Text>
                                    </HStack>
                                </Pressable>

                                {/* Nút bấm search */}
                                <Pressable
                                    onPress={() => router.push("/(searchIP)/results")}
                                    bg="$white"
                                    borderWidth={1}
                                    borderColor="$coolGray300"
                                    p="$2"
                                    rounded="$full"
                                    ml="$2"
                                    shadowColor="$coolGray400"
                                    shadowOpacity={0.2}
                                    shadowRadius={2}
                                >
                                    <Text color="$coolGray800" fontSize="$lg">
                                        🔍
                                    </Text>
                                </Pressable>
                            </HStack>

                        </Pressable>

                    ) : (
                        <HStack alignItems="center" space="sm">

                            <Input flex={1} rounded="$full" bg="$coolGray100">
                                <InputField
                                    placeholder="Search"
                                    value={query}
                                    onChangeText={setQuery}
                                    autoFocus
                                />
                            </Input>
                        </HStack>
                    )}

                    {/* Recent Searches */}
                    <VStack mt="$6" space="md">
                        <Text fontWeight="bold" fontSize="$lg">
                            Recent Searches
                        </Text>
                        <HStack flexWrap="wrap" space="sm">
                            <Pressable onPress={() => router.back()}>
                                <Icon as={ArrowLeft} size="lg" color="$black" />
                            </Pressable>
                            {recentSearches.map((item, i) => (
                                <Box
                                    key={i}
                                    bg="$coolGray100"
                                    px="$3"
                                    py="$1"
                                    rounded="$full"
                                    mr="$2"
                                    mb="$2"
                                >
                                    <Text>{item}</Text>
                                </Box>
                            ))}
                        </HStack>
                    </VStack>

                    {/* Popular this week */}
                    <VStack mt="$6">
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text fontSize="$lg" fontWeight="bold">
                                Popular this week
                            </Text>
                            <Text color="$coolGray500">Show all</Text>
                        </HStack>

                        <HStack mt="$4" space="lg">
                            {popularItems.map((item, index) => (
                                <VStack key={index} w={150}>
                                    <Image
                                        source={{ uri: item.img }}
                                        alt={item.name}
                                        w={150}
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
            </Box>
        </SafeAreaView>
    );
}


