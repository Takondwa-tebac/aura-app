import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import icons from "../constants/icons";
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
  onChange: (text: string) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <View className="space-y-2 my-5">
      <Text className="text-base text-white font-pmedium">{title}</Text>

      {/* Input Container */}
      <View className="w-full flex-row items-center border-2 border-black-200 bg-black-100 h-16 rounded-2xl px-4 focus:border-secondary-200">
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          value={value}
          onChangeText={onChange}
          className="flex-1 text-base font-pmedium text-gray-100"
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Image
                source={icons.eye}
                className="text-gray-300 w-6 h-6"
                resizeMode="contain"
              />
            ) : (
              <Image
                source={icons.eyeHide}
                resizeMode="contain"
                className="text-gray-300 w-6 h-6"
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
