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

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isRegistering, setIsRegistering] = useState(false);
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="flex flex-col gap-1  w-full h-full px-4 mt-10">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          />

          <Text className="text-2xl font-pbold text-white mt-2">Sign Up</Text>
          <FormField
            type="text"
            title="Username"
            placeholder="Enter your username"
            value={form.username}
            onChange={(text: string) => setForm({ ...form, username: text })}
          />

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

          <Button text="Sign Up" presser={() => {}} isLoading={isRegistering} />

          <View className="flex-row items-center justify-center pt-5 gap-2">
            <Text className="text-sm font-pregular text-gray-100">
              Already have an account?
            </Text>
            <Link
              href="/login"
              className="text-blue-600 font-pregular  text-sm"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});
