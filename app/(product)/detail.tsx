

import api from "@/services/api";
import { addToCart, updateCartItem } from "@/services/cart";
import { useCheckout } from "../(carts)/CheckoutContext";

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

import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Heart } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function ProductDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams(); // 👈 Lấy productId từ router param
    const [product, setProduct] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedColor, setSelectedColor] = useState("#D7A98C");
    const [selectedSize, setSelectedSize] = useState("L");
    const [showFullDesc, setShowFullDesc] = useState(false);
    const { cartItems, setCartItems } = useCheckout();

    // ⚙️ Gọi API lấy chi tiết sản phẩm và comment
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi song song 2 API
                const prodRes = await api.get(`/products/${id}`);
                const cmtRes = await api.get(`/products/${id}/comments`);

                setProduct(prodRes.data);
                setComments(cmtRes.data.content || cmtRes.data);

            } catch (err) {
                console.error("Error fetching product:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="black" />
            </SafeAreaView>
        );
    }

    if (!product) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text color="$red600">Product not found.</Text>
            </SafeAreaView>
        );
    }

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
                {/* 🖼 Ảnh sản phẩm */}
                <Box w={width} h={400} position="relative">
                    <Image
                        source={{ uri: product.imageUrl }}
                        alt={product.name}
                        w="100%"
                        h="100%"
                        resizeMode="cover"
                    />
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

                {/* 🛍 Thông tin sản phẩm */}
                <VStack px="$5" py="$4" space="md">
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text fontSize="$xl" fontWeight="bold">
                            {product.name}
                        </Text>
                        <Text fontSize="$xl" fontWeight="bold">
                            ${product.price?.toFixed(2)}
                        </Text>
                    </HStack>

                    <HStack alignItems="center" space="sm">
                        <Text color="$green600">★★★★☆</Text>
                        <Text color="$coolGray500">(83)</Text>
                    </HStack>

                    {/* 🎨 Màu & Kích thước (giữ nguyên) */}
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
                                            color={selectedSize === s ? "$black" : "$coolGray500"}
                                            fontWeight="500"
                                        >
                                            {s}
                                        </Text>
                                    </Pressable>
                                ))}
                            </HStack>
                        </VStack>
                    </HStack>

                    {/* 📜 Mô tả sản phẩm */}
                    <VStack mt="$5" space="sm">
                        <Text fontWeight="600" fontSize="$lg">
                            Description
                        </Text>
                        <Text color="$coolGray600" lineHeight="$md">
                            {showFullDesc
                                ? product.description
                                : product.description?.substring(0, 120) + "..."}
                            {!showFullDesc && (
                                <Text color="$blue600" onPress={() => setShowFullDesc(true)}>
                                    {" "}Read more
                                </Text>
                            )}
                        </Text>
                    </VStack>

                    {/* ⭐ Thống kê đánh giá (giữ nguyên) */}
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

                        {/* 💬 Comment thật từ API */}
                        <VStack mt="$5" space="lg">
                            {comments.length > 0 ? (
                                comments.map((cmt, i) => (
                                    <VStack key={i}>
                                        <HStack alignItems="center" justifyContent="space-between">
                                            <Text fontWeight="600">{cmt.userName || "Anonymous"}</Text>
                                            <Text color="$coolGray400" fontSize="$sm">
                                                {new Date(cmt.createdAt).toLocaleDateString()}
                                            </Text>
                                        </HStack>
                                        <Text color="$coolGray600" mt="$1">
                                            {cmt.content}
                                        </Text>
                                    </VStack>
                                ))
                            ) : (
                                <Text color="$coolGray500">No comments yet.</Text>
                            )}
                        </VStack>
                    </VStack>

                    {/* 🛍 Similar products (giữ nguyên) */}
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

            {/* 🛒 Nút Add to Cart (giữ nguyên) */}
            {/* <HStack
                justifyContent="space-between"
                alignItems="center"
                px="$5"
                py="$3"
                borderTopWidth={1}
                borderColor="$coolGray200"
                bg="$white"
            >
                <Text fontSize="$lg" fontWeight="bold">
                    ${product.price?.toFixed(2)}
                </Text>
                <Button
                    bg="$black"
                    rounded="$full"
                    px="$10"
                    py="$3"
                    onPress={async () => {
                        try {
                            const result = await addToCart(product.id, 1);
                            console.log("Added to cart:", result);
                        } catch (err) {
                            console.error(err);
                        }
                    }}
                >
                    <ButtonText color="$white" fontWeight="bold">
                        🛒 Add To Cart
                    </ButtonText>
                </Button>

            </HStack> */}


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
                    ${product.price?.toFixed(2)}
                </Text>
                {/* <Button
                    bg="$black"
                    rounded="$full"
                    px="$10"
                    py="$3"
                    onPress={async () => {
                        try {
                            const existing = cartItems.find(item => item.productId === product.id);

                            if (existing) {
                                await updateCartItem(existing.id, existing.quantity + 1);
                                setCartItems(prev =>
                                    prev.map(item =>
                                        item.id === existing.id
                                            ? { ...item, quantity: item.quantity + 1 }
                                            : item
                                    )
                                );
                                Alert.alert("Thành công!", "Sản phẩm đã được thêm vào giỏ!");

                            } else {
                                const added = await addToCart(product.id, 1);
                                setCartItems(prev => [...prev, added]);
                            }
                        } catch (err) {
                            console.error("Add to cart failed:", err);
                        }
                    }}
                >
                    <ButtonText color="$white" fontWeight="bold">
                        🛒 Add To Cart
                    </ButtonText>
                </Button> */}


                <Button
                    bg="$black"
                    rounded="$full"
                    px="$10"
                    py="$3"
                    onPress={async () => {
                        try {
                            const existing = cartItems.find(item => item.productId === product.id);

                            if (existing) {
                                await updateCartItem(existing.id, existing.quantity + 1);
                                setCartItems(prev =>
                                    prev.map(item =>
                                        item.id === existing.id
                                            ? { ...item, quantity: item.quantity + 1 }
                                            : item
                                    )
                                );
                                Alert.alert("Thành công!", "Đã cập nhật số lượng sản phẩm trong giỏ!");
                            } else {
                                const added = await addToCart(product.id, 1);
                                setCartItems(prev => [...prev, added]);
                                Alert.alert("Thành công!", "Sản phẩm đã được thêm vào giỏ hàng!");
                            }
                        } catch (err) {
                            console.error("Add to cart failed:", err);
                            Alert.alert("Lỗi", "Không thể thêm sản phẩm vào giỏ hàng");
                        }
                    }}
                >
                    <ButtonText color="$white" fontWeight="bold">
                        🛒 Add To Cart
                    </ButtonText>
                </Button>

            </HStack>

        </SafeAreaView >
    );
}
