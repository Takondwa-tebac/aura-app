import {
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Image,
} from "react-native";
import React, { useState } from "react";

const Trending = ({ latest, refetch }: any) => {
  const [refershing, setRefershing] = useState(false);
  const onRefresh = async () => {
    setRefershing(true);
    await refetch();
    setRefershing(false);
  };

  return (
    <FlatList
      data={latest}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        // <Text className="text-white pt-5 p-5 ">{item.$id}</Text>
        <View className=" flex-row gap-4">
          <Image
            className="h-60 w-32"
            resizeMode="contain"
            source={{ uri: item.thumbnail }}
          />
        </View>
      )}
      horizontal
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refershing} />
      }
    />
  );
};

export default Trending;

const styles = StyleSheet.create({});
