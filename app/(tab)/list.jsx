import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/persist";
import COLORS from "../../constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const TransactionList = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.expense.userLogin);
  const transactionsAll = useSelector((state) => state.expense.expense);
  const transactions = transactionsAll.filter(
    (item) => item.user_id === userInfo.id
  );

  const handleDelete = async (id) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              dispatch(expenseActions.deleteExpenseSelected(id));
            } catch (error) {
              console.error("Error deleting transaction:", error);
              Alert.alert("Error", "Failed to delete transaction");
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          {/* <Text style={styles.deleteButtonText}>Delete</Text> */}
          <MaterialIcons name="delete" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.transactionDetails}>
        <Text style={styles.amount}>₹{item.amount}</Text>
        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No transactions found</Text>
      <Text style={styles.emptySubText}>
        Add some transactions to get started
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80, // Extra padding at bottom for better scrolling
  },
  transactionCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  transactionDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
