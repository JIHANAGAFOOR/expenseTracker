import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import COLORS from "../constants/Colors";

const UserInput = ({
  state,
  setState,
  placeholder,
  label,
  secureTextEntry,
  keyboardType,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={state}
        onChangeText={setState}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        
   
      />
    </View>
  );
};

export default UserInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
});
