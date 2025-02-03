import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/form-field";
import icons from "../../constants/icons";
import Button from "@/components/Button";
import * as DocumentPicker from "expo-document-picker";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openFilePicker = (type: string) => {
    // Alert.alert("Select file");
    return async () => {
      const result = await DocumentPicker.getDocumentAsync({
        type: type === "video" ? "video/*" : "image/*",
      });
      if (result.type === "success") {
        if (type === "video") {
          setForm({ ...form, video: result.assets[0].uri });
        } else {
          setForm({ ...form, thumbnail: result.assets[0].uri });
        }
      }
    };
  };

  const player = useVideoPlayer(form.video, (p) => {
    p.loop = true;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

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
            onPress={() => {
              openFilePicker("video");
            }}
          >
            {form?.video ? (
              <View className="w-52 h-52">
                <VideoView
                  className="w-ful h-full"
                  player={player}
                  allowsFullscreen
                  allowsPictureInPicture
                  nativeControls
                />

                {isplaying ? (
                  <View className="absolute top-0 left-0 right-0 bottom-0 flex-row justify-center items-center">
                    <Image
                      source={icons.pause}
                      resizeMode="contain"
                      className="w-12 h-12"
                    />
                  </View>
                ) : (
                  <View className="absolute top-0 left-0 right-0 bottom-0 flex-row justify-center items-center">
                    <Image
                      source={icons.play}
                      resizeMode="contain"
                      className="w-12 h-12"
                    />
                  </View>
                )}
              </View>
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
            onPress={() => {
              openFilePicker("image");
            }}
          >
            {form?.thumbnail ? (
              <Image className="w-52 h-52 " resizeMode="contain" />
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
