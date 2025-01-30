import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";

const FormField = ({
  title,
  placeholder,
  type,
  value,
  onChange,
}: {
  title: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: Function;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="space-y-2">
      <Text className="text-base text-gray-100 my-2 font-pmedium">{title}</Text>
      <View className="w-full border-2 border-black-200 h-16 rounded-2xl :focus:border-secondary">
        <TextInput
          type={type}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          value={value}
          onChangeText={(e) => onChange(e.target.value)}
          className="flex-1rounded-2xl p-4 text-base font-pmedium text-gray-100"
          secureTextEntry={type === "password" && !showPassword}
        />
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({});
