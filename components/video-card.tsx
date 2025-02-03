import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEvent } from "expo";
import icons from "../constants/icons";

const VideoCard = ({ video }: { video: Object }) => {
  const [playing, setPlaying] = useState(false);

  const player = useVideoPlayer(video?.video, (player) => {
    player.loop = true;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const onPress = () => {
    setPlaying(!playing);
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <View className="flex-col items-center mb-14">
      <View className="flex-row gap-3 items-start px-4 ">
        <View className="flex-row flex-1 gap-2 items-center">
          <View className="w-10 h-10 rounded border-secondary-100 border-2">
            <Image
              source={{ uri: video?.creator.avatar }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          <View className="flex-col">
            <Text className="text-white font-psemibold text-sm">
              {video.title}
            </Text>
            <Text
              className="text-gray-100 font-pextralight text-xs"
              numberOfLines={1}
            >
              {video?.creator.username}
            </Text>
          </View>
        </View>

        <View className="flex-col">
          <Image resizeMode="contain" className="w-5 h-5" source={icons.menu} />
        </View>
      </View>

      {/* video container */}

      {playing ? (
        <VideoView
          className="w-full h-60 rounded-xl justify-center items-start px-4 my-2"
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          nativeControls
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl justify-center items-start px-4 my-2"
          onPress={() => onPress()}
          activeOpacity={0.7}
        >
          {/* <View className="w-full flex-1 rounded relative group mt-4"> */}
          <Image
            source={{ uri: video?.thumbnail }}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute top-1/2 left-1/2 z-30 "
          />
          {/* <View className="inset-0 absolute bg-primary opacity-50 group-focus:opacity-0"></View> */}
          {/* </View> */}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({});
