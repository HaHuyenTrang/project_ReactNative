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
                    router.push("/(auth)/login");
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
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top", "left", "right"]}>
            <Box flex={1}>
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

                <VStack space="md" px="$5">
                    <MenuItem icon={MapPin} label="Address" />
                    <MenuItem icon={CreditCard} label="Payment method" />
                    <MenuItem icon={Gift} label="Voucher" />
                    <MenuItem icon={Heart} label="My Wishlist" onPress={() => router.push(`/(whishlist)/lovelist`)} />
                    <MenuItem icon={Star} label="Rate this app" />
                    <MenuItem icon={LogOut} label="Log out" color="$red600" onPress={handleLogout} />
                </VStack>
            </Box>
        </SafeAreaView>
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
