import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome Wena</Text>
      <Link href="/profile" className="text-blue-500">
        Go to profile
      </Link>
    </View>
  );
}
