import { getUserProfile } from "@/services/user";
import { router } from "expo-router";
import { MapPin } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useCheckout } from "./CheckoutContext";

interface ShippingProps {
  onNext: () => void;
}

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function Shipping({ onNext }: ShippingProps) {
  const [formData, setFormData] = useState<UserData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState<Partial<UserData>>({});
  const [shippingMethod, setShippingMethod] = useState("free");
  const [loadingUser, setLoadingUser] = useState(true);
  const { setShippingData } = useCheckout();

  // Lấy dữ liệu user khi mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserProfile();
        setFormData(prev => ({
          ...prev,
          fullName: user.fullName || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
        }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (field: keyof UserData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Xóa lỗi khi user nhập
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = () => {
    const newErrors: Partial<UserData> = {};
    (Object.keys(formData) as (keyof UserData)[]).forEach(key => {
      if (!formData[key].trim()) newErrors[key] = "This field is required";
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShippingData({ ...formData, shippingMethod }); // lưu vào context
      router.push("/(carts)/payment");
    }
  };


  if (loadingUser) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }} contentContainerStyle={{ padding: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
        <MapPin size={18} color="#555" />
        <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: 8 }}>Shipping Address</Text>
      </View>

      {(Object.keys(formData) as (keyof UserData)[]).map(key => (
        <View key={key} style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 12, color: "#555", marginBottom: 4 }}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Text>
          <TextInput
            value={formData[key]}
            onChangeText={text => handleChange(key, text)}
            style={{ borderWidth: 1, borderColor: errors[key] ? "red" : "#ccc", borderRadius: 8, padding: 12 }}
          />
          {errors[key] && <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>{errors[key]}</Text>}
        </View>
      ))}

      <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 12 }}>Shipping method</Text>

      <Pressable
        onPress={() => setShippingMethod("free")}
        style={[styles.shippingOption, shippingMethod === "free" && styles.shippingOptionSelected]}
      >
        <View>
          <Text style={{ fontWeight: "600" }}>Free</Text>
          <Text style={{ fontSize: 12, color: "#555" }}>Delivery to home</Text>
        </View>
        <Text style={{ fontSize: 12, fontWeight: "600", color: "#555" }}>Free</Text>
      </Pressable>

      <Pressable
        onPress={() => setShippingMethod("standard")}
        style={[styles.shippingOption, shippingMethod === "standard" && styles.shippingOptionSelected]}
      >
        <View>
          <Text style={{ fontWeight: "600" }}>$100</Text>
          <Text style={{ fontSize: 12, color: "#555" }}>Delivery to home</Text>
        </View>
        <Text style={{ fontSize: 12, fontWeight: "600", color: "#555" }}>5-7 business days</Text>
      </Pressable>

      <Pressable
        onPress={() => setShippingMethod("express")}
        style={[styles.shippingOption, shippingMethod === "express" && styles.shippingOptionSelected]}
      >
        <View>
          <Text style={{ fontWeight: "600" }}>$300</Text>
          <Text style={{ fontSize: 12, color: "#555" }}>Fast Delivery</Text>
        </View>
        <Text style={{ fontSize: 12, fontWeight: "600", color: "#555" }}>1-2 business days</Text>
      </Pressable>

      <Pressable
        onPress={handleSubmit}
        disabled={Object.values(formData).some(v => v.trim() === "")}
        style={[
          styles.button,
          Object.values(formData).some(v => v.trim() === "") && { backgroundColor: "#888" },
        ]}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>Continue to payment</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  shippingOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
  },
  shippingOptionSelected: {
    borderColor: "#111",
  },
  button: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
});
