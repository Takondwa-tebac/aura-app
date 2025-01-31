import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user, isLoggedIn, isLoading } = useGlobalContext();

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="justify-center items-center w-full h-full min-h-[85vh] px-4">
          <Text className="text-white font-pbold text-2xl text-center">
            {user?.username}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
