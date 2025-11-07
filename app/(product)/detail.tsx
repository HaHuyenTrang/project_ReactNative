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
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { ArrowLeft, Heart } from "lucide-react-native";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function ProductDetail() {
    const router = useRouter();
    const [selectedColor, setSelectedColor] = useState("beige");
    const [selectedSize, setSelectedSize] = useState("L");
    const [showFullDesc, setShowFullDesc] = useState(false);

    const images = [
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
        "https://images.unsplash.com/photo-1602810318383-e3b3b1a4cadd",
        "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    ];

    const similarProducts = [
        {
            name: "Rise Crop Hoodie",
            price: 43.0,
            img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
        },
        {
            name: "Gym Crop Top",
            price: 39.99,
            img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
        },
        {
            name: "Sport Sweatshirt",
            price: 47.99,
            img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>
            <ScrollView>
                {/* Image Carousel */}
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                >
                    {images.map((uri, i) => (
                        <Box key={i} w={width} h={400} position="relative">
                            <Image
                                source={{ uri }}
                                alt={`product-${i}`}
                                w="100%"
                                h="100%"
                                resizeMode="cover"
                            />
                            {/* Top buttons */}
                            <HStack
                                position="absolute"
                                top={50}
                                left={20}
                                right={20}
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Pressable
                                    bg="$white"
                                    p="$2"
                                    rounded="$full"
                                    shadowColor="$black"
                                    shadowOpacity={0.1}
                                    shadowRadius={5}
                                    onPress={() => router.back()}
                                >
                                    <Icon as={ArrowLeft} size="xl" color="$black" />
                                </Pressable>

                                <Pressable
                                    bg="$white"
                                    p="$2"
                                    rounded="$full"
                                    shadowColor="$black"
                                    shadowOpacity={0.1}
                                    shadowRadius={5}
                                >
                                    <Icon as={Heart} size="xl" color="$red500" />
                                </Pressable>
                            </HStack>
                        </Box>
                    ))}
                </ScrollView>

                {/* Product Info */}
                <VStack px="$5" py="$4" space="md">
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text fontSize="$xl" fontWeight="bold">
                            Sportwear Set
                        </Text>
                        <Text fontSize="$xl" fontWeight="bold">
                            $80.00
                        </Text>
                    </HStack>

                    <HStack alignItems="center" space="sm">
                        <Text color="$green600">★★★★☆</Text>
                        <Text color="$coolGray500">(83)</Text>
                    </HStack>

                    {/* Color & Size */}
                    <HStack justifyContent="space-between" mt="$3">
                        <VStack>
                            <Text fontWeight="500">Color</Text>
                            <HStack space="sm" mt="$2">
                                {["#D7A98C", "#000000", "#FBE6E6"].map((color, i) => (
                                    <Pressable
                                        key={i}
                                        w={8}
                                        h={8}
                                        rounded="$full"
                                        borderWidth={selectedColor === color ? 2 : 0}
                                        borderColor="$black"
                                        bg={color}
                                        onPress={() => setSelectedColor(color)}
                                    />
                                ))}
                            </HStack>
                        </VStack>

                        <VStack>
                            <Text fontWeight="500">Size</Text>
                            <HStack space="sm" mt="$2">
                                {["S", "M", "L"].map((s) => (
                                    <Pressable
                                        key={s}
                                        px="$3"
                                        py="$2"
                                        rounded="$full"
                                        borderWidth={1}
                                        borderColor={selectedSize === s ? "$black" : "$coolGray300"}
                                        onPress={() => setSelectedSize(s)}
                                    >
                                        <Text
                                            color={
                                                selectedSize === s ? "$black" : "$coolGray500"
                                            }
                                            fontWeight="500"
                                        >
                                            {s}
                                        </Text>
                                    </Pressable>
                                ))}
                            </HStack>
                        </VStack>
                    </HStack>

                    {/* Description */}
                    <VStack mt="$5" space="sm">
                        <Text fontWeight="600" fontSize="$lg">
                            Description
                        </Text>
                        <Text color="$coolGray600" lineHeight="$md">
                            Sportwear is no longer under culture. It is no longer mixed or
                            cobbled together as it once was. Sport is fashion today. This top
                            is oversized in fit and style, may need to size down.
                            {!showFullDesc && (
                                <Text
                                    color="$blue600"
                                    onPress={() => setShowFullDesc(true)}
                                >
                                    {" "}
                                    Read more
                                </Text>
                            )}
                            {showFullDesc && (
                                <Text>
                                    {" "}
                                    The premium material ensures comfort and durability, making it
                                    ideal for any occasion.
                                </Text>
                            )}
                        </Text>
                    </VStack>

                    {/* Reviews */}
                    <VStack mt="$6">
                        <Text fontWeight="600" fontSize="$lg">
                            Reviews
                        </Text>

                        <HStack justifyContent="space-between" alignItems="center" mt="$3">
                            <VStack>
                                <Text fontSize="$3xl" fontWeight="bold">
                                    4.9
                                </Text>
                                <Text color="$coolGray500">OUT OF 5</Text>
                            </VStack>

                            <VStack flex={1} ml="$5" space="xs">
                                {[80, 12, 7, 2, 0].map((val, i) => (
                                    <HStack alignItems="center" key={i}>
                                        <Text w={20}>{5 - i} ★</Text>
                                        <Box flex={1} h={3} bg="$coolGray200" rounded="$full">
                                            <Box
                                                w={`${val}%`}
                                                h="100%"
                                                bg="$green500"
                                                rounded="$full"
                                            />
                                        </Box>
                                        <Text w={10} textAlign="right">
                                            {val}%
                                        </Text>
                                    </HStack>
                                ))}
                            </VStack>
                        </HStack>

                        {/* Reviewer comments */}
                        <VStack mt="$5" space="lg">
                            {[
                                {
                                    name: "Jennifer Rose",
                                    comment:
                                        "I love it. Awesome customer service! Helped me out with adding an additional item to my order.",
                                },
                                {
                                    name: "Kelly Rihanna",
                                    comment:
                                        "I'm very happy with order. It was delivered on time and good quality. Recommended!",
                                },
                            ].map((r, i) => (
                                <VStack key={i}>
                                    <HStack alignItems="center" justifyContent="space-between">
                                        <Text fontWeight="600">{r.name}</Text>
                                        <Text color="$coolGray400" fontSize="$sm">
                                            {i === 0 ? "5m ago" : "8m ago"}
                                        </Text>
                                    </HStack>
                                    <Text color="$coolGray600" mt="$1">
                                        {r.comment}
                                    </Text>
                                </VStack>
                            ))}
                        </VStack>
                    </VStack>

                    {/* Similar Products */}
                    <VStack mt="$7">
                        <Text fontWeight="600" fontSize="$lg" mb="$3">
                            Similar Product
                        </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {similarProducts.map((item, i) => (
                                <VStack key={i} mr="$4" w={140}>
                                    <Image
                                        source={{ uri: item.img }}
                                        alt={item.name}
                                        w={140}
                                        h={180}
                                        rounded="$xl"
                                    />
                                    <Text mt="$2" fontWeight="500">
                                        {item.name}
                                    </Text>
                                    <Text color="$coolGray600">${item.price.toFixed(2)}</Text>
                                </VStack>
                            ))}
                        </ScrollView>
                    </VStack>
                </VStack>
            </ScrollView>

            {/* Bottom CTA */}
            <HStack
                justifyContent="space-between"
                alignItems="center"
                px="$5"
                py="$3"
                borderTopWidth={1}
                borderColor="$coolGray200"
                bg="$white"
            >
                <Text fontSize="$lg" fontWeight="bold">
                    $80.00
                </Text>
                <Button
                    bg="$black"
                    rounded="$full"
                    px="$10"
                    py="$3"
                    onPress={() => { }}
                >
                    <ButtonText color="$white" fontWeight="bold">
                        🛒 Add To Cart
                    </ButtonText>
                </Button>
            </HStack>
        </SafeAreaView>
    );
}
