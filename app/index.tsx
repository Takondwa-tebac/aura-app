import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <View className="flex px-4  bg-white flex-col gap-4 items-center justify-center h-screen">
        <Text className="text-3xl fonts-semibold">Welcome Wena</Text>
        <StatusBar style="auto" />

        <Link
          href="/profile"
          className="text-white font-pregular md:w-full  border border-white shadow-sm rounded-full  px-2 py-2 text-center  text-xs md:text-xl  bg-orange-500"
        >
          Go to profile
        </Link>
      </View>
    </SafeAreaView>
  );
}
