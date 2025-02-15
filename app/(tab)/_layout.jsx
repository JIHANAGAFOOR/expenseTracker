import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/persist";
import COLORS from "../../constants/Colors";

const TabLayout = () => {
  const disatch = useDispatch();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          disatch(expenseActions.userLogoutSelected());
          router.replace("login");
        },
      },
    ]);
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "gray",
        headerStyle: {
          backgroundColor: COLORS.primary, // Set the header background color
        },
        headerTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          headerTitle: "Expense Tracker",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLogout}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="log-out-outline" size={24} color={"white"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: "Transactions",
          // headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLogout}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="log-out-outline" size={24} color={"white"} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
