import { CartItem } from "@/services/cart";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ShippingData {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    shippingMethod: "free" | "standard" | "express";
}

interface PaymentData {
    cardName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

interface CheckoutContextType {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    shippingData: ShippingData | null;
    setShippingData: (data: ShippingData) => void;
    paymentData: PaymentData | null;
    setPaymentData: (data: PaymentData) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const useCheckout = () => {
    const context = useContext(CheckoutContext);
    if (!context) throw new Error("useCheckout must be used within CheckoutProvider");
    return context;
};

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [shippingData, setShippingData] = useState<ShippingData | null>(null);
    const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

    return (
        <CheckoutContext.Provider
            value={{ cartItems, setCartItems, shippingData, setShippingData, paymentData, setPaymentData }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};


// // CheckoutContext.tsx
// export const addItemToCart = (item: CartItem) => {
//     updateCartItem(prev => {
//         // Nếu item đã có trong cart thì tăng quantity
//         const exists = prev.find(i => i.id === item.id);
//         if (exists) {
//             return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
//         } else {
//             return [...prev, item];
//         }
//     });
// };
