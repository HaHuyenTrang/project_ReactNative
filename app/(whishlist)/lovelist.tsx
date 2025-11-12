import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getWishlist, removeFromWishlist } from "../../services/wishlist";



const WishlistTabs = ({ activeTab, setActiveTab }: any) => (
    <View style={styles.tabs}>
        {["items", "collections"].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabButton}>
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                    {tab.toUpperCase()}
                </Text>
            </TouchableOpacity>
        ))}
    </View>
)

const ProductItem = ({ product, onToggleLike }: any) => (
    <View style={styles.productCard}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        <TouchableOpacity onPress={() => onToggleLike(product.id)} style={styles.likeButton}>
            <Text style={{ fontSize: 18 }}>{product.liked ? "❤️" : "🤍"}</Text>
        </TouchableOpacity>
    </View>
)



export default function WishlistPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const data = await getWishlist(); // array ProductDto
            setProducts(data);
        } catch (err) {
            console.error("Failed to load wishlist:", err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchWishlist();
    }, []);



    const toggleLike = async (id: number) => {
        try {
            await removeFromWishlist(id);
            setProducts(products.filter((p) => p.id !== id)); // xóa item khỏi UI luôn
        } catch (err) {
            console.error("Failed to remove from wishlist:", err);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>

            <View style={styles.container}>



                {/* Tabs */}
                {/* <WishlistTabs activeTab={activeTab} setActiveTab={setActiveTab} /> */}

                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    renderItem={({ item }) => <ProductItem product={item} onToggleLike={toggleLike} />}
                />


            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f3f3f3", paddingTop: 40 },
    statusBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    header: { paddingHorizontal: 16, paddingVertical: 10 },
    headerText: { fontSize: 24, fontWeight: "bold" },
    tabs: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
    tabButton: { paddingVertical: 6 },
    tabText: { fontSize: 16, color: "#777" },
    activeTabText: { fontWeight: "bold", color: "#000" },
    productCard: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 5,
        borderRadius: 12,
        padding: 10,
        alignItems: "center",
    },
    productImage: { width: 140, height: 180, borderRadius: 10, marginBottom: 8 },
    productName: { fontSize: 14, fontWeight: "bold", textAlign: "center" },
    productPrice: { fontSize: 14, color: "#888", marginBottom: 5 },
    likeButton: { padding: 5 },
    nav: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        backgroundColor: "#fff",
    },
    navItem: { fontSize: 24 },
})
