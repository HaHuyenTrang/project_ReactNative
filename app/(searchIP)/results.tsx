import {
    Box,
    HStack,
    Icon,
    Image,
    Input,
    InputField,
    InputIcon,
    InputSlot,
    Pressable,
    Spinner,
    Text,
    VStack
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import { ArrowLeft, MagnifyingGlass } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProducts } from "../../services/product";


export default function SearchResults() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState<any[]>([]);

    // 🔹 Lấy danh sách sản phẩm thật từ API
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts(query);
            setProducts(data.content || data);
        } catch (error) {
            console.error("Failed to load products:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Gọi API ban đầu + debounce tìm kiếm khi gõ
    useEffect(() => {
        const delaySearch = setTimeout(() => {
            fetchProducts();
        }, 500); // 0.5s sau khi người dùng ngừng gõ mới gọi API

        return () => clearTimeout(delaySearch); // nếu vẫn đang gõ thì reset lại
    }, [query]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchProducts();
        setRefreshing(false);
    };

    const renderProduct = ({ item }: any) => {
        const discount = item.oldPrice
            ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)
            : 0;
        const rating = item.rating || 4.7;

        return (
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
                onPress={() =>
                    router.push({
                        pathname: "/(product)/detail",
                        params: {
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            img: item.imageUrl,
                        },
                    })
                }
            >
                <Box position="relative">
                    <Image
                        source={{ uri: item.imageUrl }}
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
                        {discount > 0 && (
                            <Text color="$red500" fontSize="$sm" fontWeight="bold">
                                -{discount}%
                            </Text>
                        )}
                    </HStack>

                    <HStack alignItems="center" space="xs">
                        <Text color="$green600" fontSize="$sm">
                            ★ {rating}
                        </Text>
                    </HStack>
                </VStack>
            </Pressable>
        );
    };

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
                        Store 🛎️
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
                    <Text fontSize="$sm" color="$black">
                        🔻 Filter
                    </Text>
                </Pressable>
            </HStack>

            {/* Search bar */}
            <HStack px="$5" mb="$3">
                <Input
                    flex={1}
                    rounded="$full"
                    bg="$coolGray100"
                    borderColor="$coolGray300"
                    borderWidth={1}
                >
                    <InputSlot pl="$3">
                        <InputIcon as={MagnifyingGlass} size="md" color="$coolGray500" />
                    </InputSlot>
                    <InputField
                        placeholder="Search for items..."
                        value={query}
                        onChangeText={setQuery}
                    />
                </Input>
            </HStack>


            {/* Product grid */}
            {loading ? (
                <VStack flex={1} alignItems="center" justifyContent="center">
                    <Spinner size="large" />
                    <Text mt="$2">Loading products...</Text>
                </VStack>
            ) : (
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
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            )}
        </SafeAreaView>
    );
}












// import {
//     Box,
//     HStack,
//     Icon,
//     Image,
//     Input,
//     InputField,
//     Pressable,
//     Spinner,
//     Text,
//     VStack
// } from "@gluestack-ui/themed";
// import { useRouter } from "expo-router";
// import { Heart } from "lucide-react-native";
// import { ArrowLeft, MagnifyingGlass } from "phosphor-react-native";
// import React, { useEffect, useState } from "react";
// import { FlatList, RefreshControl } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { getProducts } from "../../services/product";

// export default function SearchResults() {
//     const router = useRouter();
//     const [query, setQuery] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [refreshing, setRefreshing] = useState(false);
//     const [products, setProducts] = useState<any[]>([]);

//     // 🔹 Lấy danh sách sản phẩm thật từ API
//     const fetchProducts = async () => {
//         try {
//             setLoading(true);
//             const data = await getProducts(query);
//             setProducts(data.content || data); // nếu backend trả Page hoặc list
//         } catch (error) {
//             console.error("Failed to load products:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const onRefresh = async () => {
//         setRefreshing(true);
//         await fetchProducts();
//         setRefreshing(false);
//     };

//     const renderProduct = ({ item }: any) => {
//         const discount = item.oldPrice
//             ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)
//             : 0;
//         const rating = item.rating || 4.7; // giả rating nếu backend chưa có

//         return (
//             <Pressable
//                 bg="$white"
//                 rounded="$xl"
//                 shadowColor="$black"
//                 shadowOpacity={0.08}
//                 shadowRadius={5}
//                 p="$2"
//                 mb="$4"
//                 flex={1}
//                 mx="$1"
//                 onPress={() =>
//                     router.push({
//                         pathname: "/(product)/detail",
//                         params: {
//                             id: item.id,
//                             name: item.name,
//                             price: item.price,
//                             img: item.imageUrl,
//                         },
//                     })
//                 }
//             >
//                 <Box position="relative">
//                     <Image
//                         source={{ uri: item.imageUrl }}
//                         alt={item.name}
//                         w="100%"
//                         h={180}
//                         rounded="$lg"
//                     />
//                     <Pressable
//                         position="absolute"
//                         top={10}
//                         right={10}
//                         bg="$white"
//                         p="$1.5"
//                         rounded="$full"
//                         shadowColor="$black"
//                         shadowOpacity={0.1}
//                         shadowRadius={4}
//                     >
//                         <Icon as={Heart} color="$red500" size="sm" />
//                     </Pressable>
//                 </Box>

//                 <VStack space="xs" mt="$2">
//                     <Text fontWeight="500" numberOfLines={1}>
//                         {item.name}
//                     </Text>

//                     <HStack space="sm" alignItems="center">
//                         <Text fontWeight="bold" fontSize="$md">
//                             ${item.price.toFixed(2)}
//                         </Text>
//                         {item.oldPrice && (
//                             <Text
//                                 color="$coolGray500"
//                                 fontSize="$sm"
//                                 textDecorationLine="line-through"
//                             >
//                                 ${item.oldPrice.toFixed(2)}
//                             </Text>
//                         )}
//                         {discount > 0 && (
//                             <Text color="$red500" fontSize="$sm" fontWeight="bold">
//                                 -{discount}%
//                             </Text>
//                         )}
//                     </HStack>

//                     <HStack alignItems="center" space="xs">
//                         <Text color="$green600" fontSize="$sm">
//                             ★ {rating}
//                         </Text>
//                     </HStack>
//                 </VStack>
//             </Pressable>
//         );
//     };

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>
//             {/* Header */}
//             <HStack
//                 alignItems="center"
//                 justifyContent="space-between"
//                 px="$4"
//                 py="$3"
//                 borderBottomWidth={1}
//                 borderColor="$coolGray200"
//             >
//                 <HStack alignItems="center" space="sm">
//                     <Pressable onPress={() => router.back()}>
//                         <Icon as={ArrowLeft} size="xl" color="$black" />
//                     </Pressable>
//                     <Text fontSize="$lg" fontWeight="bold">
//                         Store 🛎️
//                     </Text>
//                 </HStack>

//                 <Pressable
//                     px="$3"
//                     py="$1.5"
//                     borderWidth={1}
//                     borderColor="$coolGray300"
//                     rounded="$full"
//                     alignItems="center"
//                     justifyContent="center"
//                     flexDirection="row"
//                 >
//                     <Text fontSize="$sm" color="$black">
//                         🔻 Filter
//                     </Text>
//                 </Pressable>
//             </HStack>

//             {/* Search bar */}
//             <HStack px="$5" mb="$3">
//                 <Input flex={1} rounded="$full" bg="$coolGray100" borderColor="$coolGray300">
//                     <HStack alignItems="center" px="$3" space="sm">
//                         <Icon as={MagnifyingGlass} size="md" color="$coolGray500" />
//                         <InputField
//                             placeholder="Search for items..."
//                             value={query}
//                             onChangeText={setQuery}
//                             onSubmitEditing={fetchProducts}
//                         />
//                     </HStack>
//                 </Input>
//             </HStack>

//             {/* Product grid */}
//             {loading ? (
//                 <VStack flex={1} alignItems="center" justifyContent="center">
//                     <Spinner size="large" />
//                     <Text mt="$2">Loading products...</Text>
//                 </VStack>
//             ) : (
//                 <FlatList
//                     data={products}
//                     numColumns={2}
//                     keyExtractor={(item, i) => i.toString()}
//                     renderItem={renderProduct}
//                     showsVerticalScrollIndicator={false}
//                     contentContainerStyle={{
//                         paddingHorizontal: 12,
//                         paddingBottom: 80,
//                     }}
//                     refreshControl={
//                         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//                     }
//                 />
//             )}
//         </SafeAreaView>
//     );
// }

