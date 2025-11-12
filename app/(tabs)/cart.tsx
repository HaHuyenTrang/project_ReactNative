import { getCart, removeCartItem, updateCartItem } from "@/services/cart";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { Trash2 } from "lucide-react-native";
import React, { useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCheckout } from "../(carts)/CheckoutContext";


interface CartItem {
    id: number;
    quantity: number;
    productName: string;
    productPrice: number;
    productImage?: string; // optional, nếu muốn hiển thị ảnh
}

interface YourCartProps {
    onNext: () => void;
}

export default function YourCart({ onNext }: YourCartProps) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<number | null>(null);
    const { cartItems, setCartItems } = useCheckout();
    // useEffect(() => {
    //     let isMounted = true;
    //     const fetchCart = async () => {
    //         try {
    //             const data = await getCart(); // trả về CartItemDto[]
    //             console.log("Cart data:", data);
    //             const mapped = data.map((item: any) => ({
    //                 id: item.id,
    //                 quantity: item.quantity ?? 1,
    //                 productName: item.productName ?? "Unknown",
    //                 productPrice: Number(item.productPrice ?? 0),
    //                 productImage: item.productImage ?? "https://via.placeholder.com/100",

    //             }));
    //             setItems(mapped);     // local state
    //             setCartItems(mapped); // save to context
    //             if (isMounted) setItems(mapped);
    //         } catch (err) {
    //             console.error(err);

    //         } finally {
    //             if (isMounted) setLoading(false);
    //         }
    //     };
    //     fetchCart();
    //     return () => { isMounted = false; };
    // }, []);





    useFocusEffect(
        React.useCallback(() => {
            let isMounted = true;
            const fetchCart = async () => {
                try {
                    const data = await getCart();
                    console.log("Cart data:", data);
                    const mapped = data.map((item: any) => ({
                        id: item.id,
                        quantity: item.quantity ?? 1,
                        productName: item.productName ?? "Unknown",
                        productPrice: Number(item.productPrice ?? 0),
                        productImage: item.productImage ?? "https://via.placeholder.com/100",
                    }));
                    if (isMounted) {
                        setItems(mapped);
                        setCartItems(mapped);
                    }
                } catch (err) {
                    console.error("Fetch cart error:", err);
                } finally {
                    if (isMounted) setLoading(false);
                }
            };

            fetchCart();

            return () => {
                isMounted = false;
            };
        }, [])
    );

    const removeItem = (id: number) => {
        Alert.alert(
            "Remove item",
            "Are you sure you want to remove this item from your cart?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: async () => {
                        setUpdating(id);
                        try {
                            await removeCartItem(id);
                            setItems(prev => prev.filter(item => item.id !== id));
                        } catch (err) {
                            console.error(err);
                        } finally {
                            setUpdating(null);
                        }
                    }
                }
            ]
        );
    };

    const updateQuantity = async (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }
        setUpdating(id);
        try {
            await updateCartItem(id, quantity);
            setItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
        } catch (err) {
            console.error(err);
        } finally {
            setUpdating(null);
        }
    };

    const subtotal = items.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
    const shipping = 10;
    const total = subtotal + shipping;

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
                <Text style={styles.loadingText}>Loading cart...</Text>
            </View>
        );
    }

    const renderItem = ({ item }: { item: CartItem }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.productImage }} style={styles.productImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.productName}>{item.productName}</Text>
                <Text style={styles.productPrice}>${item.productPrice.toFixed(2)}</Text>
                <View style={styles.quantityContainer}>
                    <Pressable
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={updating === item.id}
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityButtonText}>−</Text>
                    </Pressable>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <Pressable
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={updating === item.id}
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </Pressable>
                    {updating === item.id && <Text style={styles.updatingText}>Updating...</Text>}
                </View>
            </View>
            <Pressable
                onPress={() => removeItem(item.id)}
                disabled={updating === item.id}
                style={styles.removeButton}
            >
                <Trash2 size={24} color="#888" />
            </Pressable>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>
            <View style={styles.container}>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                />
                <View style={styles.summaryContainer}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Product price</Text>
                        <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Shipping</Text>
                        <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
                    </View>
                    <View style={[styles.summaryRow, styles.summaryTotal]}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
                    </View>
                </View>
                <Pressable onPress={() => router.push("/(carts)/shiping")} style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Proceed to checkout</Text>
                </Pressable>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    listContainer: { padding: 16, paddingBottom: 100 },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    loadingText: { marginTop: 8, fontSize: 16 },
    itemContainer: { flexDirection: "row", marginBottom: 16, borderBottomWidth: 1, borderColor: "#ccc", paddingBottom: 8 },
    productImage: { width: 80, height: 80, borderRadius: 8, backgroundColor: "#eee" },
    itemDetails: { flex: 1, marginLeft: 12 },
    productName: { fontSize: 16, fontWeight: "500" },
    productPrice: { fontSize: 14, color: "#555", marginTop: 4 },
    quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 8 },
    quantityButton: { width: 32, height: 32, borderWidth: 1, borderColor: "#ccc", justifyContent: "center", alignItems: "center", borderRadius: 4 },
    quantityButtonText: { fontSize: 18, color: "#555" },
    quantityText: { marginHorizontal: 8, fontSize: 16 },
    updatingText: { marginLeft: 8, fontSize: 12, color: "#888" },
    removeButton: { justifyContent: "center", paddingLeft: 8 },
    summaryContainer: { padding: 16, borderTopWidth: 1, borderColor: "#ccc" },
    summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
    summaryLabel: { fontSize: 14, color: "#555" },
    summaryValue: { fontSize: 14, fontWeight: "500" },
    summaryTotal: { marginTop: 8, borderTopWidth: 1, borderColor: "#ccc", paddingTop: 8 },
    checkoutButton: { backgroundColor: "#111", padding: 16, alignItems: "center", margin: 16, borderRadius: 8 },
    checkoutButtonText: { color: "#fff", fontSize: 16, fontWeight: "500" },
});
