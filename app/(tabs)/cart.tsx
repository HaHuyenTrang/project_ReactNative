import {
    Box,
    HStack,
    Icon,
    Pressable,
    ScrollView,
    Text
} from "@gluestack-ui/themed";
import { Bell, List } from "phosphor-react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyOrders() {
    const [tab, setTab] = useState<"Pending" | "Delivered" | "Cancelled">("Pending");

    const data = {
        Pending: [
            { id: "#1524", date: "13/06/2023", tracking: "KB273846839", quantity: 2, subtotal: 110, status: "PENDING" },
            { id: "#1525", date: "14/06/2023", tracking: "KB273849023", quantity: 3, subtotal: 230, status: "PENDING" },
            { id: "#1526", date: "15/06/2023", tracking: "KB273846820", quantity: 6, subtotal: 490, status: "PENDING" },
        ],
        Delivered: [
            { id: "#1514", date: "13/05/2023", tracking: "KB27384531", quantity: 2, subtotal: 110, status: "DELIVERED" },
            { id: "#1679", date: "14/05/2023", tracking: "KB27382910", quantity: 3, subtotal: 450, status: "DELIVERED" },
            { id: "#1671", date: "15/05/2023", tracking: "KB27384681", quantity: 3, subtotal: 400, status: "DELIVERED" },
        ],
        Cancelled: [
            { id: "#1829", date: "10/05/2023", tracking: "KB273846531", quantity: 2, subtotal: 210, status: "CANCELLED" },
            { id: "#1824", date: "09/05/2023", tracking: "KB273848231", quantity: 3, subtotal: 120, status: "CANCELLED" },
        ],
    };

    const getColor = (status: string) => {
        switch (status) {
            case "DELIVERED":
                return "$green600";
            case "PENDING":
                return "$amber600";
            case "CANCELLED":
                return "$red600";
            default:
                return "$coolGray500";
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {/* Header */}
            <HStack
                px="$5"
                pt="$6"
                pb="$3"
                justifyContent="space-between"
                alignItems="center"
            >
                <Icon as={List} size="xl" color="$coolGray400" />
                <Text fontSize="$xl" fontWeight="bold">
                    My Orders
                </Text>
                <Icon as={Bell} size="xl" color="$black" />
            </HStack>

            {/* Tabs */}
            <HStack
                justifyContent="space-between"
                px="$5"
                py="$3"
                bg="$white"
                borderBottomWidth={1}
                borderColor="$coolGray200"
            >
                {["Pending", "Delivered", "Cancelled"].map((item) => (
                    <Pressable
                        key={item}
                        onPress={() => setTab(item as any)}
                        flex={1}
                        alignItems="center"
                    >
                        <Box
                            bg={tab === item ? "$black" : "$coolGray100"}
                            px="$5"
                            py="$2"
                            rounded="$full"
                        >
                            <Text
                                color={tab === item ? "$white" : "$black"}
                                fontWeight="600"
                                fontSize="$sm"
                                textAlign="center"
                            >
                                {item}
                            </Text>
                        </Box>
                    </Pressable>
                ))}
            </HStack>

            {/* Order List */}
            <ScrollView px="$5" mt="$4" showsVerticalScrollIndicator={false}>
                {data[tab].map((order, i) => (
                    <Box
                        key={i}
                        mb="$4"
                        borderWidth={1}
                        borderColor="$coolGray200"
                        rounded="$xl"
                        p="$4"
                    >
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text fontWeight="bold" fontSize="$sm">
                                Order {order.id}
                            </Text>
                            <Text color="$coolGray500" fontSize="$xs">
                                {order.date}
                            </Text>
                        </HStack>

                        <Text mt="$2" color="$coolGray600" fontSize="$sm">
                            Tracking number: {order.tracking}
                        </Text>
                        <Text color="$coolGray600" fontSize="$sm">
                            Quantity: {order.quantity}
                        </Text>

                        <HStack mt="$3" justifyContent="space-between" alignItems="center">
                            <Text fontWeight="bold" fontSize="$sm">
                                Subtotal: ${order.subtotal}
                            </Text>
                            <Pressable
                                borderWidth={1}
                                borderColor="$black"
                                rounded="$full"
                                px="$4"
                                py="$1"
                            >
                                <Text fontSize="$sm" color="$black" fontWeight="500">
                                    Details
                                </Text>
                            </Pressable>
                        </HStack>

                        <Text
                            mt="$3"
                            fontWeight="bold"
                            fontSize="$sm"
                            color={getColor(order.status)}
                        >
                            {order.status}
                        </Text>
                    </Box>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
