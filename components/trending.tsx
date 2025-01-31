import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

const Trending = ({ posts }: any) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Text className="text-white pt-5">{item.id}</Text>
      )}
      horizontal
    />
  );
};

export default Trending;

const styles = StyleSheet.create({});
