import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalContext } from "../../context/GlobalProvider";
import images from "../../constants/images";
import SearchField from "@/components/search-input";
import Trending from "@/components/trending";
import EmptyState from "@/components/empty-state";
import { getLatest, getVideos } from "@/appwrite.config";
import useAppWrite from "@/lib/useAppWrite";
import VideoCard from "@/components/video-card";

const Home = () => {
  const { user, isLoggedIn, isLoading } = useGlobalContext();

  const [refershing, setRefershing] = useState(false);
  const { data: posts, refetch } = useAppWrite(getVideos);
  const { data: latestPosts, refetch: refetchLatest } = useAppWrite(getLatest);

  const onRefresh = async () => {
    setRefershing(true);
    await refetch();
    setRefershing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full ">
      <FlatList
        showsHorizontalScrollIndicator={false}
       
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={
          <View className="px-3 flex-col  gap-2">
            <View className="flex-row justify-between items-center">
              <View className="flex-col gap-2">
                <Text className="text-xs font-extralight text-white">
                  Welcome Back
                </Text>
                <Text className="text-white font-psemibold text-lg text-center">
                  {user?.username}
                </Text>
              </View>
              <Image
                source={images.logoSmall}
                className="w-10 h-10"
                resizeMode="contain"
              />
            </View>

            <SearchField />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 font-pregular text-lg">
                Latest Video
              </Text>

              <Trending posts={latestPosts} />
            </View>
          </View>
        }
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refershing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
