import { Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/form-field";
import icons from "../../constants/icons";
import Button from "@/components/Button";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openFilePicker = (type: string) => {};

  return (
    <SafeAreaView className="flex-1 bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white font-pbold text-2xl">
          Upload your video
        </Text>

        <View className="mt-10">
          <FormField
            title="Video Title"
            type="text"
            value={form.title}
            placeholder="Enter a title"
            onChange={(text) => setForm({ ...form, title: text })}
          />
        </View>

        <View className="mt-10 flex-col justify-center items-center gap-2 bg-black-100 p-4 rounded-xl h-60">
          <View className="w-12 h-12 border border-dashed rounded border-secondary-200 justify-center items-center">
            <Image
              source={icons.upload}
              resizeMode="contain"
              className="w-8 h-8"
            />
          </View>

          <TouchableOpacity
            activeOpacity={"0.7"}
            onPress={openFilePicker("video")}
          >
            {form?.video ? (
              <Text className="text-white text-xs">File Selected</Text>
            ) : (
              <Text className="text-white text-xs">No file selected</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-10 flex-row justify-center items-center gap-2 bg-black-100 p-4 rounded-xl h-20">
          <View className="w-12 h-12 border border-dashed rounded border-secondary-200 justify-center items-center">
            <Image
              source={icons.upload}
              resizeMode="contain"
              className="w-8 h-8"
            />
          </View>

          <TouchableOpacity
            activeOpacity={"0.7"}
            onPress={openFilePicker("image")}
          >
            {form?.thumbnail ? (
              <Text className="text-white text-xs">File Selected</Text>
            ) : (
              <Text className="text-white text-xs">No file selected</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-10">
          <FormField
            title="Prompt"
            type="textarea"
            value={form.prompt}
            placeholder="Enter your prompt"
            onChange={(text) => setForm({ ...form, prompt: text })}
          />
        </View>

        <Button presser={() => {}} text="Upload" isLoading={uploading} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
