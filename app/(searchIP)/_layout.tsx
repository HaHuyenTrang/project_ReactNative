import { Stack } from "expo-router";
import React from "react";

export default function SearchIPLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // Ẩn header mặc định cho gọn
            }}
        />
    );
}
