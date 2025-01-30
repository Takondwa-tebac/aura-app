import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const Button = ({
  text,
  presser,
  isLoading,
}: {
  text: string;
  presser: Function;
  isLoading?: boolean;
}) => {
  return (
    <View className="mt-10 w-full">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          presser();
        }}
        className={`${
          isLoading ? "opacity-50" : ""
        } bg-[#FF8C00] py-3 px-10 rounded-lg text-center items-center`}
      >
        <Text className="text-primary font-pbold text-base">{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({});
