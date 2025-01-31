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
        activeOpacity={0.7}
        onPress={() => {
          presser();
        }}
        className="bg-orange-500 min-[62px] items-center rounded-xl justify-center"
        disabled={isLoading}
        style={{
          backgroundColor: "orange",
          opacity: isLoading ? 0.5 : 1,
          borderRadius: 12,
          height: 52,
          marginHorizontal: 20,
        }}
      >
        <Text className="text-primary font-psemibold text-lg">{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({});
