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
import { Link } from "expo-router";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="justify-center  w-full  min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          />

          <Text className="text-2xl font-pbold text-white mt-2">Login</Text>
          <FormField
            title="Email"
            placeholder="Enter your email"
            type="email"
            value={form.email}
            onChange={(text: string) => setForm({ ...form, email: text })}
          />

          <FormField
            title="Password"
            placeholder="Enter your password"
            type="password"
            value={form.password}
            onChange={(text: string) => setForm({ ...form, password: text })}
          />

          <Button text="Login" presser={() => {}} isLoading={isSubmitting} />
        </View>

        <View className="flex-row items-center justify-center pt-5 gap-2">
          <Text className="text-sm font-pregular text-gray-100">
            Don't have an account?
          </Text>
          <Link
            href="/register"
            className="text-blue-600 font-pregular  text-sm"
          >
            Sign Up
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
