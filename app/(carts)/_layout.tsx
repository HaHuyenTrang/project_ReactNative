import { Box, HStack, Icon, Pressable, Text } from "@gluestack-ui/themed";
import { Stack, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React from "react";

export default function CartsLayout() {
    const router = useRouter();

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

            {/* Header chung cho tất cả các trang trong group (carts) */}
            <HStack
                alignItems="center"
                justifyContent="space-between"
                px="$4"
                py="$3"
                borderBottomWidth={1}
                borderColor="$coolGray200"
                bg="$white"
            >
                <Pressable onPress={() => router.back()}>
                    <Icon as={ArrowLeft} size="xl" color="$black" />
                </Pressable>
                <Text fontSize="$lg" fontWeight="bold">
                    My Cart 🛒
                </Text>
                <Box w={24} /> {/* để cân bằng layout */}
            </HStack>

            {/* Stack cho phép từng màn hình con (order, payment...) render */}
            <Stack screenOptions={{ headerShown: false }} />

        </SafeAreaView>

    );
}
