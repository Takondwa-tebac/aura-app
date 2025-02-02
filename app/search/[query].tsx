import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { Suspense, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchPosts } from "@/appwrite.config";
import VideoCard from "@/components/video-card";
import SearchField from "@/components/search-input";
import EmptyState from "@/components/empty-state";

const Search = () => {
  const { query } = useLocalSearchParams();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await searchPosts(query);
      setPosts(response);
      console.log(posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query]);
  return (
    <SafeAreaView className="bg-black-100 h-full">
      <FlatList
        ListHeaderComponent={
          <View className="px-3 flex-col  gap-2">
            <Text className="text-xs text-gray-100">search results for </Text>
            <Text className="text-white text-2xl">{query}</Text>

            <SearchField initialQuery={query} />
          </View>
        }
        data={posts}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item) => item.$id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            title={`No results found for ${query}`}
            subTitle="Try a different search"
          />
        }
      ></FlatList>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
