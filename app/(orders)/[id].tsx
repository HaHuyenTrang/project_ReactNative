import { getOrder, Order } from "@/services/order";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Package } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderDetailScreen() {


    const { id } = useLocalSearchParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await getOrder(Number(id));
                setOrder(data);
            } catch (error) {
                console.error("Load order error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

            <ScrollView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}>
                        <ChevronLeft size={20} color="#374151" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Order #{order?.id}</Text>

                </View>

                {/* Status Card */}
                <View style={styles.statusCard}>
                    <View>
                        <Text style={styles.statusTitle}>{order?.status}</Text>

                        <Text style={styles.statusSub}>Rate product to get 5 points for rebate.</Text>
                    </View>
                    <Package size={32} color="white" />
                </View>

                {/* Order Details */}
                <View style={styles.detailContainer}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Order number</Text>
                        <Text style={styles.detailValue}>#{order?.id}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Tracking number</Text>
                        <Text style={styles.detailValue}>{order?.trackingNumber || "N/A"}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Delivery address</Text>
                        <Text style={[styles.detailValue, { textAlign: "right" }]}>{order?.shippingAddress || "N/A"}</Text>
                    </View>
                </View>




                {/* Items */}
                {/* <View style={styles.section}>
                <View style={styles.itemRow}>
                    <Text style={styles.itemName}>Maxi Dress</Text>
                    <View style={styles.itemRight}>
                        <Text style={styles.itemQty}>x1</Text>
                        <Text style={styles.itemPrice}>$68.00</Text>
                    </View>
                </View>
                <View style={styles.itemRow}>
                    <Text style={styles.itemName}>Linen Dress</Text>
                    <View style={styles.itemRight}>
                        <Text style={styles.itemQty}>x1</Text>
                        <Text style={styles.itemPrice}>$52.00</Text>
                    </View>
                </View>
            </View> */}

                {
                    order?.items.map((item, index) => (
                        <View key={index} style={styles.itemRow}>
                            <Text style={styles.itemName}>{item.productName}</Text>
                            <View style={styles.itemRight}>
                                <Text style={styles.itemQty}>x{item.quantity}</Text>
                                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                            </View>
                        </View>
                    ))
                }


                {/* Pricing */}
                <View style={styles.pricing}>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceValue}>${order?.totalAmount?.toFixed(2) || "0.00"}</Text>

                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Shipping</Text>
                        <Text style={styles.priceValue}>$0.00</Text>
                    </View>
                </View>

                {/* Total */}
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.priceValue}>${order?.totalAmount?.toFixed(2) || "0.00"}</Text>

                </View>

                {/* Actions */}
                <View style={styles.actionContainer}>
                    <TouchableOpacity onPress={() => router.push(`/(tabs)`)} style={styles.btnOutline}>
                        <Text style={styles.btnOutlineText}>Return home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSolid}>
                        <Text style={styles.btnSolidText}>Rate</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
        gap: 12,
    },
    backButton: {
        padding: 6,
        borderRadius: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#111827",
    },
    statusCard: {
        backgroundColor: "#374151",
        borderRadius: 12,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    statusTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#fff",
        marginBottom: 4,
    },
    statusSub: {
        fontSize: 12,
        color: "#D1D5DB",
    },
    detailContainer: {
        marginBottom: 24,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    detailLabel: {
        color: "#6B7280",
        fontSize: 14,
    },
    detailValue: {
        color: "#111827",
        fontSize: 14,
        fontWeight: "500",
    },
    section: {
        borderTopWidth: 1,
        borderColor: "#E5E7EB",
        paddingTop: 16,
        marginBottom: 24,
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    itemName: {
        color: "#374151",
        fontSize: 14,
    },
    itemRight: {
        flexDirection: "row",
        gap: 16,
    },
    itemQty: {
        color: "#6B7280",
        fontSize: 14,
    },
    itemPrice: {
        color: "#111827",
        fontSize: 14,
        fontWeight: "600",
        width: 60,
        textAlign: "right",
    },
    pricing: {
        borderTopWidth: 1,
        borderColor: "#E5E7EB",
        paddingTop: 12,
        marginBottom: 24,
    },
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    priceLabel: {
        color: "#6B7280",
        fontSize: 14,
    },
    priceValue: {
        color: "#111827",
        fontWeight: "600",
    },
    totalRow: {
        borderTopWidth: 1,
        borderColor: "#E5E7EB",
        paddingTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    totalLabel: {
        color: "#374151",
        fontSize: 16,
        fontWeight: "500",
    },
    totalValue: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
    },
    actionContainer: {
        flexDirection: "row",
        gap: 12,
    },
    btnOutline: {
        flex: 1,
        borderWidth: 2,
        borderColor: "#374151",
        paddingVertical: 14,
        borderRadius: 9999,
        alignItems: "center",
    },
    btnOutlineText: {
        color: "#374151",
        fontWeight: "600",
        fontSize: 14,
    },
    btnSolid: {
        flex: 1,
        backgroundColor: "#374151",
        paddingVertical: 14,
        borderRadius: 9999,
        alignItems: "center",
    },
    btnSolidText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },
});
