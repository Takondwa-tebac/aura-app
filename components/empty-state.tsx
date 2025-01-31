import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import images from "../constants/images";
import Button from "./Button";
import { useRouter } from "expo-router";

const EmptyState = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  const router = useRouter();
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[215px]"
      />

      <Text className="text-white font-pbold text-2xl">{title}</Text>
      <Text className="text-gray-100 font-pextralight text-base">
        {subTitle}
      </Text>

      <Button text="Create videos" presser={() => router.push("/create")} />
    </View>
  );
};

export default EmptyState;
