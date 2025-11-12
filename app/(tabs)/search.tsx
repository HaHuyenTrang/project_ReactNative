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
import { useRouter } from "expo-router";
import { Bell, List, MagnifyingGlass } from "phosphor-react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
    const router = useRouter();

    const discoverItems = [
        { id: 1, img: "https://images.unsplash.com/photo-1514995669114-6081e934b693" },
        { id: 2, img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb" },
        { id: 3, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
        { id: 4, img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Box flex={1} bg="$white">
                {/* Header */}
                <HStack
                    px="$5"
                    pt="$10"
                    pb="$4"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Icon as={List} size="xl" color="$gray800" />
                    <Text fontSize="$xl" fontWeight="bold" color="$black">
                        Discover
                    </Text>
                    <Icon as={Bell} size="xl" color="$gray800" />
                </HStack>

                {/* Search bar */}
                <HStack mx="$5" my="$3" alignItems="center" justifyContent="space-between">
                    <Pressable
                        onPress={() => router.push("/(searchIP)/search-input")}
                        flex={1}
                    >
                        <HStack
                            bg="$coolGray100"
                            rounded="$full"
                            px="$4"
                            py="$2.5"
                            alignItems="center"
                            space="sm"
                        >
                            <Icon as={MagnifyingGlass} size="lg" color="$coolGray500" />
                            <Text color="$coolGray600" fontSize="$md">
                                Search products, brands...
                            </Text>
                        </HStack>
                    </Pressable>


                </HStack>

                {/* Discover items */}
                <ScrollView mt="$5" showsVerticalScrollIndicator={false}>
                    <VStack space="4" px="$5" mb="$10">
                        {discoverItems.map((item) => (
                            <Image
                                key={item.id}
                                source={{ uri: item.img }}
                                alt={`discover-${item.id}`}
                                w="100%"
                                h={180}
                                rounded="$xl"
                            />
                        ))}
                    </VStack>

                </ScrollView>
            </Box>
        </SafeAreaView>
    );
}
