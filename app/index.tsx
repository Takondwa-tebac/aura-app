import { Link, Redirect, useRouter } from "expo-router";

import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "../constants/images";
import Button from "@/components/Button";
import { StatusBar } from "expo-status-bar";

import { useGlobalContext } from "@/context/GlobalProvider";
export default function Index() {
  const router = useRouter();
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="justify-center items-center w-full h-full min-h-[85vh] px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          />

          <Image
            source={images.cards}
            resizeMode="contain"
            className="w-full max-w-[380px] max-h-[300px]"
          />
          <View className="relative">
            <Text className="text-2xl text-center text-white font-pbold text-wrap">
              Discover Endless
            </Text>
            <Text className="text-2xl text-center text-white font-pbold text-wrap">
              Possibilities with{" "}
              <Text className="text-2xl text-center text-orange-400 font-pbold text-wrap">
                Aora
              </Text>
            </Text>

            <Image
              source={images.path}
              resizeMode="contain"
              className="absolute w-16 -right-1 -bottom-4"
            />
          </View>
          <View className="mt-10">
            <Text className="text-xs text-center text-white font-extralight text-wrap">
              Where Creativity Meets Innovation: Embark on a Journey of
              Limitless Exploration with Aora
            </Text>
          </View>
          <Button
            text="Get Started"
            presser={() => {
              router.push("/login");
            }}
            isLoading={false}
          />
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
