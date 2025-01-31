import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalContext } from "../../context/GlobalProvider";
import images from "../../constants/images";
import SearchField from "@/components/search-input";
import Trending from "@/components/trending";

const Home = () => {
  const { user, isLoggedIn, isLoading } = useGlobalContext();
  const [query, setQuery] = useState(" ");

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <FlatList
          data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
          renderItem={({ item }) => (
            <Text className="text-white px-3">{item.id}</Text>
          )}
          ListHeaderComponent={
            <View className="px-3 flex-col gap-2">
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

              <SearchField
                title="Search"
                placeholder="Search"
                type="text"
                value={query}
                onChange={setQuery}
              />
              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-gray-100 font-pregular text-lg">
                  Latest Video
                </Text>

                <Trending />
              </View>
            </View>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
