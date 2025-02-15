import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  StatusBar,
  useColorScheme,
} from "react-native";
import UserInput from "../../Componenets/UserInput";
import CustomButton from "../../Componenets/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/persist";
import COLORS from "../../constants/Colors";
const Login = () => {
  const disatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const users = useSelector((state) => state.expense.users);
 

  const colorScheme = useColorScheme();
  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // Password validation (at least 6 characters, one letter, one number, and special characters)
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,12}$/;

  const handleRegister = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Check if all fields are filled

    // Validate email format
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Validate password strength
    if (!password || !passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 6 characters long and contain both letters and numbers.";
      valid = false;
    }

    // If not valid, set errors and return
    if (!valid) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if everything is valid
    setErrors({ email: "", password: "" });
    var userLoggedIn = true;
    const userLogin = { email, password };

    const existingUser = users.find(
      (user) =>
        user.email === userLogin.email && user.password === userLogin.password
    );

    if (existingUser) {
      disatch(expenseActions.userLoginSelected(existingUser));
      // Navigate to home if user exists
      router.replace("home");
      setEmail("");
      setPassword("");
    } else {
      // Show an alert if user does not exist
      Alert.alert("Login Failed", "The email or password is incorrect.", [
        { text: "OK" },
      ]);
    }
  };
  const handleInputChange = (field, value) => {
    if (value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
    if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Text style={styles.title}>Login</Text>

      <UserInput
        state={email}
        setState={(value) => handleInputChange("email", value)}
        label={"Email"}
        placeholder={"Enter your email"}
        secureTextEntry={false}
        keyboardType="email-address"
      />
      {errors.email ? (
        <Text style={styles.errorText}>{errors.email}</Text>
      ) : null}

      <UserInput
        state={password}
        setState={(value) => handleInputChange("password", value)}
        label={"Password"}
        placeholder={"Enter your password"}
        secureTextEntry={true}
      />
      {errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}
      <CustomButton text={"Login"} onPress={handleRegister} />

      {/* Already signed up? */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Link style={styles.loginLink} href="registration">
            {" "}
            Sign Up
          </Link>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.primary,
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  loginText: {
    fontSize: 16,
    color: "#333",
  },
  loginLink: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default Login;
