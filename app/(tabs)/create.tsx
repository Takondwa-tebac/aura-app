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
import { router } from "expo-router";
import { uploadVideo } from "@/appwrite.config";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openFilePicker = async (type: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: type === "video" ? "video/*" : "image/*",
    });

    if (!result.canceled) {
      if (type === "video") {
        // console.log(result);
        setForm({ ...form, video: result.assets[0] });
      } else {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document Picker Error", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const player = useVideoPlayer(form.video, (p) => {
    p.loop = true;
    p.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const handleSubmit = async () => {
    if (!form.title || !form.video || !form.thumbnail) {
      Alert.alert("Error", "Please fill all the fields");
    } else {
      setUploading(true);
      try {
        const result = await uploadVideo(form);
        if (result.status === "error") throw new Error(result.message);
        setForm({ ...form, video: null, thumbnail: null });
        router.replace("/home");
      } catch (e) {
        Alert.alert("Error", e.message);
      } finally {
        setUploading(false);
      }
    }
  };

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
          <TouchableOpacity
            activeOpacity={"0.7"}
            onPress={() => {
              openFilePicker("video");
            }}
          >
            <View className="flex-col justify-center items-center gap-2">
              <View className="w-12 h-12 border border-dashed rounded border-secondary-200 justify-center items-center">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-8 h-8"
                />
              </View>

              {/* <Text className="text-white text-xs">No file selected</Text> */}
            </View>
          </TouchableOpacity>

          {form?.video && (
            <View className="h-full  w-full ">
              <VideoView
                className="w-ful h-full"
                player={player}
                allowsFullscreen
                allowsPictureInPicture
                nativeControls
              />
            </View>
          )}
        </View>

        <View className="mt-10 flex-col justify-center items-center bg-black-100 p-4 rounded-xl h-20">
          <TouchableOpacity
            activeOpacity={"0.7"}
            onPress={() => {
              openFilePicker("image");
            }}
          >
            {form?.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail?.uri }}
                className="w-52 h-52 "
                resizeMode="contain"
              />
            ) : (
              <View className=" flex-row justify-center items-center gap-2">
                <View className="w-12 h-12 border border-dashed rounded border-secondary-200 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-8 h-8"
                  />
                </View>
                <Text className="text-white text-xs">No file selected</Text>
              </View>
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

        <Button
          presser={() => {
            handleSubmit();
          }}
          text="Upload"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
