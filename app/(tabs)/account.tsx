// import { getUserProfile } from "@/services/user";
// import {
//     Avatar,
//     AvatarFallbackText,
//     Button,
//     Center,
//     HStack,
//     Spinner,
//     Text,
//     VStack,
// } from "@gluestack-ui/themed";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { Alert } from "react-native";

// export default function AccountScreen() {
//     const [user, setUser] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const data = await getUserProfile();
//                 setUser(data);
//             } catch (error: any) {
//                 Alert.alert("Error", error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, []);

//     const handleLogout = async () => {
//         await AsyncStorage.removeItem("userToken");
//         Alert.alert("Logged out", "You have been logged out successfully.");
//         router.replace("/(auth)/login");
//     };

//     if (loading) {
//         return (
//             <Center flex={1}>
//                 <Spinner size="large" />
//             </Center>
//         );
//     }

//     if (!user) {
//         return (
//             <Center flex={1}>
//                 <Text color="$coolGray600">No user data found</Text>
//                 <Button mt="$4" onPress={handleLogout}>
//                     <Text color="$white">Back to Login</Text>
//                 </Button>
//             </Center>
//         );
//     }

//     return (
//         <Center flex={1} bg="$white" px="$6">
//             <VStack space="xl" w="100%" alignItems="center" mt="$10">
//                 <Avatar size="xl" bg="$coolGray200">
//                     <AvatarFallbackText>{user.fullName?.charAt(0) || "U"}</AvatarFallbackText>
//                 </Avatar>

//                 <VStack space="xs" alignItems="center">
//                     <Text fontSize="$xl" fontWeight="bold">
//                         {user.fullName}
//                     </Text>
//                     <Text color="$coolGray600">{user.email}</Text>
//                 </VStack>

//                 <VStack space="sm" w="100%" mt="$8">
//                     <HStack justifyContent="space-between">
//                         <Text color="$coolGray600">Phone:</Text>
//                         <Text>{user.phone || "-"}</Text>
//                     </HStack>
//                     <HStack justifyContent="space-between">
//                         <Text color="$coolGray600">Address:</Text>
//                         <Text>{user.address || "-"}</Text>
//                     </HStack>
//                 </VStack>

//                 <Button
//                     mt="$10"
//                     bg="$black"
//                     rounded="$full"
//                     w="100%"
//                     py="$3"
//                     onPress={handleLogout}
//                 >
//                     <Text color="$white" fontWeight="bold">
//                         LOG OUT
//                     </Text>
//                 </Button>
//             </VStack>
//         </Center>
//     );
// }




import { getUserProfile } from "@/services/user";
import {
    Avatar,
    AvatarFallbackText,
    Box,
    Button,
    Center,
    Divider,
    HStack,
    Icon,
    Pressable,
    Spinner,
    Text,
    VStack,
} from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
    CreditCard,
    Gift,
    Heart,
    LogOut,
    MapPin,
    Star,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                setUser(data);
            } catch (error: any) {
                Alert.alert("Error", error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        Alert.alert("Confirm", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                onPress: async () => {
                    await AsyncStorage.removeItem("userToken");
                    router.replace("/(auth)/login");
                },
            },
        ]);
    };

    if (loading) {
        return (
            <Center flex={1}>
                <Spinner size="large" />
            </Center>
        );
    }

    if (!user) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <Center flex={1}>
                    <Text color="$coolGray600">No user data found</Text>
                    <Button mt="$4" onPress={handleLogout}>
                        <Text color="$white">Back to Login</Text>
                    </Button>
                </Center>
            </SafeAreaView>
        );
    }

    return (
        <Box flex={1} bg="$white" safeArea>
            <VStack px="$6" py="$6" alignItems="center">
                <Avatar size="xl" bg="$coolGray200">
                    <AvatarFallbackText>{user.fullName?.charAt(0) || "U"}</AvatarFallbackText>
                </Avatar>

                <Text mt="$3" fontSize="$xl" fontWeight="bold">
                    {user.fullName}
                </Text>
                <Text color="$coolGray600">{user.email}</Text>
            </VStack>

            <Divider my="$2" />

            {/* Thông tin cơ bản */}
            <VStack space="sm" px="$6" py="$2">
                <HStack justifyContent="space-between">
                    <Text color="$coolGray600">Phone:</Text>
                    <Text>{user.phone || "-"}</Text>
                </HStack>
                <HStack justifyContent="space-between">
                    <Text color="$coolGray600">Address:</Text>
                    <Text>{user.address || "-"}</Text>
                </HStack>
            </VStack>

            <Divider my="$4" />

            {/* Menu giống ảnh */}
            <VStack space="md" px="$5">
                <MenuItem icon={MapPin} label="Address" />
                <MenuItem icon={CreditCard} label="Payment method" />
                <MenuItem icon={Gift} label="Voucher" />
                <MenuItem icon={Heart} label="My Wishlist" />
                <MenuItem icon={Star} label="Rate this app" />
                <MenuItem icon={LogOut} label="Log out" color="$red600" onPress={handleLogout} />
            </VStack>
        </Box>
    );
}

const MenuItem = ({ icon: IconCmp, label, onPress, color = "$black" }: any) => (
    <Pressable onPress={onPress}>
        <HStack
            justifyContent="space-between"
            alignItems="center"
            py="$3"
            borderBottomWidth={0.5}
            borderColor="$gray200"
        >
            <HStack space="md" alignItems="center">
                <Icon as={IconCmp} size="md" color={color} />
                <Text fontSize="$md" color={color}>
                    {label}
                </Text>
            </HStack>
        </HStack>
    </Pressable>
);
