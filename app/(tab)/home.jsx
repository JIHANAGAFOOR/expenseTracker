import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import COLORS from "../../constants/Colors";
import UserInput from "../../Componenets/UserInput";
import CustomButton from "../../Componenets/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { expenseActions } from "../../store/persist";
import { router } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const Home = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    amount: "",
    date: "",
  });
  const disatch = useDispatch();
  const userInfo = useSelector((state) => state.expense.userLogin);
  const transactionsAll = useSelector((state) => state.expense.expense);
  const transactions = transactionsAll.filter(
    (item) => item.user_id === userInfo.id
  );

  const monthlyIncome = 50000;

  const totalExpenses = transactions.reduce(
    (total, transaction) => total + parseFloat(transaction.amount),
    0
  );

  const balance = monthlyIncome - totalExpenses;

  const showDatePicker = () => {
    setErrors({ ...errors, date: "" });
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const handleSubmit = () => {
    let valid = true;
    const newErrors = { title: "", amount: "", date: "" };

    if (!title) {
      newErrors.title = "Title is required";
      valid = false;
    }
    if (!amount) {
      newErrors.amount = "Amount is required";
      valid = false;
    } else if (isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = "Please enter a valid positive number";
      valid = false;
    }
    if (!date) {
      newErrors.date = "Date is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    const transaction = {
      id: `transaction_${Date.now()}`,
      user_id: userInfo.id,
      title,
      amount: parseFloat(amount),
      date: date.toISOString(),
    };

    dispatch(expenseActions.addExpenseSelected(transaction));
    Alert.alert("Expense added successfully!");

    // Reset form
    setTitle("");
    setAmount("");
    setDate(null);
    setErrors({ title: "", amount: "", date: "" });
  };

  const handleInputChange = (field, value) => {
    if (field === "title") setTitle(value);
    else if (field === "amount") setAmount(value);

    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };
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
    <SafeAreaView style={styles.outerContainer}>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle="light-content" // White text and icons
      />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerInnerContainer}>
            <Text style={styles.welcomeText}>
              Welcome back,{"\n"}
              <Text style={styles.nameText}>{userInfo.name}</Text>
            </Text>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutContainer}
            >
              <Ionicons name="log-out-outline" size={24} color={"white"} />
            </TouchableOpacity>
          </View>
          <Text style={styles.subText}>Track your expenses efficiently</Text>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text
              style={[
                styles.balanceAmount,
                balance < 0 && styles.negativeAmount,
              ]}
            >
              ₹{balance.toLocaleString()}
            </Text>
          </View>

          <View style={styles.statsRow}>
            <View style={[styles.statsCard, styles.incomeCard]}>
              <Text style={styles.statsLabel}>Monthly Income</Text>
              <Text style={styles.incomeAmount}>
                ₹{monthlyIncome.toLocaleString()}
              </Text>
            </View>

            <View style={[styles.statsCard, styles.expenseCard]}>
              <Text style={styles.statsLabel}>Total Expenses</Text>
              <Text style={styles.expenseAmount}>
                ₹{totalExpenses.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Add Expense</Text>

          <UserInput
            label="Title"
            state={title}
            setState={(value) => handleInputChange("title", value)}
            placeholder="Enter expense title"
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

          <UserInput
            label="Amount"
            state={amount}
            setState={(value) => handleInputChange("amount", value)}
            placeholder="Enter amount"
            keyboardType="decimal-pad"
          />
          {errors.amount && (
            <Text style={styles.errorText}>{errors.amount}</Text>
          )}

          <Text style={styles.dateLabel}>Date</Text>
          <TouchableOpacity
            onPress={showDatePicker}
            style={styles.dateContainer}
          >
            <Text style={[styles.dateText, !date && styles.placeholderText]}>
              {date ? date.toLocaleDateString() : "Select Date"}
            </Text>
          </TouchableOpacity>
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

          <CustomButton
            text="Save Expense"
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={date || new Date()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    padding: 24,
    backgroundColor: COLORS.primary,
  },
  headerInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
    color: "white",
    marginBottom: 4,
  },
  nameText: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
  },
  subText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  summaryContainer: {
    marginLeft: 16,
    marginTop: 16,
    marginRight: 16,
    marginBottom:0,
    gap: 16,
  },
  balanceCard: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: "center",
  },
  statsRow: {
    flexDirection: "row",
    gap: 16,
  },
  statsCard: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  balanceLabel: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "700",
    color: COLORS.success,
  },
  negativeAmount: {
    color: COLORS.error,
  },
  statsLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  incomeAmount: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.success,
  },
  expenseAmount: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.error,
  },
  formContainer: {
    marginLeft: 16,
    marginTop: 8,
    marginRight: 16,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 8,
    fontWeight: "500",
  },
  dateContainer: {
    height: 50,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: "#111827",
  },
  placeholderText: {
    color: "#9CA3AF",
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    marginTop: -8,
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 8,
    backgroundColor: COLORS.primary,
  },
  logoutContainer: {
    marginBottom: 48,
  },
});

export default Home;
