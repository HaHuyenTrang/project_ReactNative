



import { router } from "expo-router";
import { ShoppingBag } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface OrderCompletedProps {
  onNext?: () => void;
}

export default function OrderCompleted({ onNext }: OrderCompletedProps) {
  return (
    <View style={styles.container}>
      {/* Success Icon */}
      <View style={styles.iconWrapper}>
        <ShoppingBag size={64} color="#111" />
      </View>

      {/* Title */}
      <Text style={styles.title}>Order Completed</Text>

      {/* Message */}
      <Text style={styles.message}>
        Cảm ơn bạn đã mua hàng.{"\n"} Đi tới đơn hàng của bạn
      </Text>

      {/* CTA */}
      <Pressable onPress={() => router.push("/(tabs)")} style={[styles.button, styles.primaryButton]}>
        <Text style={styles.buttonText}>Tiếp tục mua sắm</Text>
      </Pressable>

      {/* Secondary CTA */}
      <Pressable onPress={() => router.push("/(orders)/my-orders")} style={[styles.button, styles.secondaryButton]}>
        <Text style={styles.secondaryButtonText}>Đơn hàng của bạn</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16, backgroundColor: "#fff" },
  iconWrapper: { marginBottom: 24 },
  title: { fontSize: 24, fontWeight: "bold", color: "#111", marginBottom: 8, textAlign: "center" },
  message: { fontSize: 14, color: "#555", marginBottom: 24, textAlign: "center" },
  button: { width: "100%", padding: 16, borderRadius: 8, marginBottom: 12, alignItems: "center" },
  primaryButton: { backgroundColor: "#111" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "500" },
  secondaryButton: { borderWidth: 1, borderColor: "#ccc" },
  secondaryButtonText: { color: "#111", fontSize: 16, fontWeight: "500" },
});
