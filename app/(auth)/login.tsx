import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { images } from "../../constants";

import FormField from "@/components/form-field";
import Button from "@/components/Button";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="flex flex-col gap-4  w-full h-full px-4 mt-10">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          />

          <Text className="text-5xl font-pbold text-white my-5"> Login</Text>
          <FormField
            title="Email"
            placeholder="Enter your email"
            type="email"
            value={form.email}
            onChange={(text) => setForm({ ...form, email: text })}
          />

          <FormField
            title="Password"
            placeholder="Enter your password"
            type="password"
            value={form.password}
            onChange={(text) => setForm({ ...form, password: text })}
          />

          <Button text="Login" presser={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
