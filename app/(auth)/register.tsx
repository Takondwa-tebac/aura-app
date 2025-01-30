import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { StatusBar } from "expo-status-bar";

const Register = () => {
  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="flex flex-col gap-4  w-full h-full px-4">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[130px] h-[84px]"
            />

            <Text className="text-5xl font-pbold text-white my-5"> Login</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="light" />
    </>
  );
};

export default Register;

const styles = StyleSheet.create({});
