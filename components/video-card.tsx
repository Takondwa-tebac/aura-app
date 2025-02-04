import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import VideoPlayer, { VideoPlayerRef } from "react-native-video-player";

import icons from "../constants/icons";

const VideoCard = ({ video }: { video: Object }) => {
  const videoRef = useRef<VideoPlayerRef>(null);
  const [playing, setPlaying] = useState(false);

  // const player = useVideoPlayer(video?.video, (player) => {
  //   player.loop = true;
  // });

  // const { isPlaying } = useEvent(player, "playingChange", {
  //   isPlaying: player.playing,
  // });

  useEffect(() => {
    if (videoRef.current) {
      console.log(videoRef.current);
      Alert.alert("yoo");
    }
  }, []);
  const onPress = () => {
    setPlaying(!playing);
    if (videoRef.current) {
      videoRef.current.seek(0);
    } else {
      // videoRef.current.play();
    }
  };

  return (
    <View className="flex-col items-center mb-14">
      <View className="flex-row items-start gap-3 px-4 ">
        <View className="flex-row items-center flex-1 gap-2">
          <View className="w-10 h-10 border-2 rounded border-secondary-100">
            <Image
              source={video?.creator.avatar}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          <View className="flex-col">
            <Text className="text-sm text-white font-psemibold">
              {video.title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pextralight"
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
        // <VideoView
        //   className="items-start justify-center w-full px-4 my-2 h-60 rounded-xl"
        //   player={player}
        //   allowsFullscreen
        //   allowsPictureInPicture
        //   nativeControls
        // />

        <VideoPlayer
          ref={videoRef}
          source={{
            uri: "https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
          }}
          style={styles.video}
          resizeMode="cover"
          onError={(e) => console.log(e)}
          showDuration={true}
          onEnd={() => setPlaying(false)}
        />
      ) : (
        <TouchableOpacity
          className="items-start justify-center w-full px-4 my-2 h-60 rounded-xl"
          onPress={() => onPress()}
          activeOpacity={0.7}
        >
          {/* <View className="relative flex-1 w-full mt-4 rounded group"> */}
          <Image
            source={{ uri: video?.thumbnail }}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute z-30 w-12 h-12 top-1/2 left-1/2 "
          />
          {/* <View className="absolute inset-0 opacity-50 bg-primary group-focus:opacity-0"></View> */}
          {/* </View> */}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 240, // Adjust height as needed
    borderRadius: 12,
  },
});
