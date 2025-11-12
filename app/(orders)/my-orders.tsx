
import { getMyOrders, Order } from "@/services/order"; // API service
import { useRouter } from "expo-router";
import { AlertCircle, CheckCircle, ChevronRight, Clock, Package, Truck } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState<"Pending" | "Delivered" | "Cancelled">("Pending");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    (async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const filtered = orders.filter((o) => {
    switch (tab) {
      case "Pending":
        return o.status === "CREATED" || o.status === "PENDING";
      case "Delivered":
        return o.status === "DELIVERED" || o.status === "COMPLETED";
      case "Cancelled":
        return o.status === "CANCELLED";
      default:
        return true;
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DELIVERED":
      case "COMPLETED":
        return <CheckCircle size={20} color="green" />;
      case "PENDING":
      case "CREATED":
        return <Clock size={20} color="blue" />;
      case "CANCELLED":
        return <AlertCircle size={20} color="red" />;
      default:
        return <Package size={20} color="gray" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
      case "COMPLETED":
        return "#d1fae5";
      case "PENDING":
      case "CREATED":
        return "#fef3c7";
      case "CANCELLED":
        return "#fee2e2";
      default:
        return "#e5e7eb";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "COMPLETED":
      case "DELIVERED":
        return "Delivered";
      case "PENDING":
      case "CREATED":
        return "Processing";
      case "CANCELLED":
        return "Cancelled";
      default:
        return status;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>


      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Orders</Text>
          <Text style={styles.subtitle}>Track and manage all your purchases</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {["Pending", "Delivered", "Cancelled"].map((t) => (
            <Pressable
              key={t}
              onPress={() => setTab(t as any)}
              style={[styles.tabButton, tab === t && styles.tabButtonActive]}
            >
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
            </Pressable>
          ))}
        </View>

        {/* Orders */}
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#888" />
            <Text>Loading your orders...</Text>
          </View>
        ) : filtered.length === 0 ? (
          <View style={styles.empty}>
            <Package size={40} color="#ccc" />
            <Text>No {tab.toLowerCase()} orders</Text>
            <Text style={{ fontSize: 12, color: "#666" }}>Check back soon for new orders</Text>
          </View>
        ) : (
          filtered.map((order) => (
            <View
              key={order.id}
              style={[styles.orderCard, { backgroundColor: getStatusColor(order.status) }]}
            >
              <View style={styles.orderHeader}>
                {getStatusIcon(order.status)}
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderDate}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>

              <View style={styles.orderDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Amount</Text>
                  <Text style={styles.detailValue}>${order.totalAmount.toFixed(2)}</Text>
                </View>

                {order.trackingNumber && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Tracking</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                      <Truck size={16} color="#555" />
                      <Text style={{ marginLeft: 4, fontFamily: "monospace" }}>{order.trackingNumber}</Text>
                    </View>
                  </View>
                )}

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Status</Text>
                  <Text style={{ fontWeight: "bold", marginTop: 4 }}>{getStatusLabel(order.status)}</Text>
                </View>
              </View>

              <Pressable
                style={styles.chevronButton}
                onPress={() => router.push(`/(orders)/${order.id}`)}
              >
                <ChevronRight size={20} color="#555" />
              </Pressable>

            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc", padding: 12 },
  header: { marginBottom: 12 },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { color: "#555", fontSize: 14, marginTop: 4 },
  tabContainer: { flexDirection: "row", marginVertical: 12, gap: 8 },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  tabButtonActive: { backgroundColor: "#111", borderColor: "#111" },
  tabText: { color: "#555", fontWeight: "500" },
  tabTextActive: { color: "#fff" },
  loading: { alignItems: "center", justifyContent: "center", marginTop: 24 },
  empty: { alignItems: "center", justifyContent: "center", marginTop: 24 },
  orderCard: { borderRadius: 12, padding: 12, marginBottom: 12 },
  orderHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  orderId: { fontWeight: "bold", fontSize: 16 },
  orderDate: { fontSize: 12, color: "#555" },
  orderDetails: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  detailItem: { flex: 1 },
  detailLabel: { fontSize: 10, color: "#666", textTransform: "uppercase" },
  detailValue: { fontSize: 14, fontWeight: "bold", marginTop: 2 },
  chevronButton: { position: "absolute", right: 12, top: 12 },
});
