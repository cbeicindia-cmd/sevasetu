import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { BuyerHome } from "./screens/buyer/BuyerHome";
import { SellerHome } from "./screens/seller/SellerHome";
import { AdminHome } from "./screens/admin/AdminHome";

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "700" }}>Gramin Udyog Mobile</Text>
        <View><BuyerHome /></View>
        <View><SellerHome /></View>
        <View><AdminHome /></View>
      </ScrollView>
    </SafeAreaView>
  );
}
