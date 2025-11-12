

import { createOrder } from "@/services/order";
import { getUserProfile } from "@/services/user";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useCheckout } from "./CheckoutContext";

export default function Payment() {
  const [cardData, setCardData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<Partial<typeof cardData>>({});
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const { cartItems, shippingData, setPaymentData } = useCheckout();


  // Lấy dữ liệu user khi mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserProfile();
        setCardData(prev => ({
          ...prev,
          cardName: user.fullName || prev.cardName,
        }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  const handleCardChange = (field: keyof typeof cardData, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  //   const handleSubmit = () => {
  //     const newErrors: Partial<typeof cardData> = {};
  //     (Object.keys(cardData) as (keyof typeof cardData)[]).forEach(key => {
  //       if (!cardData[key].trim()) newErrors[key] = "không được để trống";
  //     });
  //     setErrors(newErrors);

  //     if (Object.keys(newErrors).length === 0 && agreeTerms) {
  //       router.push("/(carts)/order");
  //     }
  //   };

  //      // Build order payload
  //     const orderPayload = {
  //       items: cartItems.map(item => ({
  //         productName: item.productName,
  //         quantity: item.quantity,
  //         price: item.productPrice,
  //       })),
  //       shippingAddress: `${shippingData?.address}, ${shippingData?.city}, ${shippingData?.state}, ${shippingData?.zipCode}`,
  //       paymentMethod: cardData.cardName,
  //       totalAmount: cartItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0) +
  //                    (shippingData?.shippingMethod === "free" ? 0 : shippingData?.shippingMethod === "standard" ? 100 : 300),
  //     };

  //     const newOrder = await createOrder(orderPayload);
  //     if (newOrder) {
  //       alert("Order created successfully!");
  //       router.push("/(carts)/my-orders"); // trang hiển thị MyOrders
  //     } else {
  //       alert("Failed to create order");
  //     }
  //   }
  // };



  const handleSubmit = async () => {
    const newErrors: Partial<typeof cardData> = {};
    (Object.keys(cardData) as (keyof typeof cardData)[]).forEach(key => {
      if (!cardData[key].trim()) newErrors[key] = "Cannot be empty";
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && agreeTerms) {
      setPaymentData(cardData);

      if (!shippingData || cartItems.length === 0) {
        alert("Cart or shipping info missing");
        return;
      }

      // Build order payload
      const orderPayload = {
        items: cartItems.map(item => ({
          productName: item.productName,
          quantity: item.quantity,
          price: item.productPrice,
        })),
        shippingAddress: `${shippingData.address}, ${shippingData.city}, ${shippingData.state}, ${shippingData.zipCode}`,
        paymentMethod: cardData.cardName,
        totalAmount: cartItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0) +
          (shippingData.shippingMethod === "free" ? 0 : shippingData.shippingMethod === "standard" ? 100 : 300),
      };

      const newOrder = await createOrder(orderPayload);
      if (newOrder) {
        alert("Order created successfully!");
        router.push("/(orders)/order"); // trang hiển thị MyOrders
      } else {
        alert("Failed to create order");
      }
    }
  };
  if (loadingUser) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Loading user info...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {/* Card Display */}
      <View style={styles.cardDisplay}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardLabel}>Card</Text>
          <Text style={styles.cardType}>VISA</Text>
        </View>
        <Text style={styles.cardNumber}>{cardData.cardNumber || "•••• •••• •••• ••••"}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardFooterText}>{cardData.cardName || "Cardholder Name"}</Text>
          <Text style={styles.cardFooterText}>{cardData.expiryDate || "MM/YY"}</Text>
        </View>
      </View>

      {/* Card Input Fields */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Cardholder name</Text>
        <TextInput
          style={[styles.input, errors.cardName && { borderColor: "red" }]}
          value={cardData.cardName}
          onChangeText={text => handleCardChange("cardName", text)}
        />
        {errors.cardName && <Text style={styles.errorText}>{errors.cardName}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Card number</Text>
        <TextInput
          style={[styles.input, errors.cardNumber && { borderColor: "red" }]}
          value={cardData.cardNumber}
          onChangeText={text => handleCardChange("cardNumber", text)}
          placeholder="1234 5678 9012 3456"
          placeholderTextColor="#e3dcdcff"
        />
        {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber}</Text>}
      </View>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.inputLabel}>Expiry date</Text>
          <TextInput
            style={[styles.input, errors.expiryDate && { borderColor: "red" }]}
            value={cardData.expiryDate}
            onChangeText={text => handleCardChange("expiryDate", text)}
            placeholder="MM/YY"
            placeholderTextColor="#e3dcdcff"
          />
          {errors.expiryDate && <Text style={styles.errorText}>{errors.expiryDate}</Text>}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.inputLabel}>CVV</Text>
          <TextInput
            style={[styles.input, errors.cvv && { borderColor: "red" }]}
            value={cardData.cvv}
            onChangeText={text => handleCardChange("cvv", text)}
            placeholder="123"
            placeholderTextColor="#e3dcdcff"
          />
          {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
        </View>
      </View>

      {/* Terms Checkbox */}
      <Pressable onPress={() => setAgreeTerms(!agreeTerms)} style={styles.checkboxContainer}>
        <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]} />
        <Text style={styles.checkboxText}>I agree to Terms and conditions</Text>
      </Pressable>

      {/* Place Order Button */}
      <Pressable
        onPress={handleSubmit}
        style={[styles.button, agreeTerms ? styles.primaryButton : styles.disabledButton]}
        disabled={!agreeTerms}
      >
        <Text style={styles.buttonText}>Place my order</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  cardDisplay: {
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    height: 160,
    justifyContent: "space-between",
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  cardLabel: { color: "#fff", fontSize: 12, opacity: 0.75 },
  cardType: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  cardNumber: { color: "#fff", fontSize: 18, fontWeight: "600", letterSpacing: 2 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between" },
  cardFooterText: { color: "#fff", fontSize: 12, fontWeight: "500" },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 12, color: "#555", marginBottom: 4 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, fontSize: 14 },
  errorText: { color: "red", fontSize: 12, marginTop: 4 },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: "#ccc", borderRadius: 4, marginRight: 8 },
  checkboxChecked: { backgroundColor: "#3B82F6" },
  checkboxText: { fontSize: 12, color: "#555" },
  button: { padding: 16, borderRadius: 8, alignItems: "center" },
  primaryButton: { backgroundColor: "#111" },
  disabledButton: { backgroundColor: "#ccc" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "500" },
});
