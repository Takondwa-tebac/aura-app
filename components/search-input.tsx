import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import icons from "../constants/icons";
import { usePathname, useRouter } from "expo-router";

const SearchField = ({ initialQuery = "" }: { initialQuery: string }) => {
  const path = usePathname();
  const router = useRouter();
  const handleSearch = () => {
    if (query.length === 0) {
      Alert.alert("Search something", "Please enter a search term");
    } else {
      {
        if (path.startsWith("/search")) router.setParams({ query });
        else router.push(`/search/${query}`);
      }
    }
  };

  const [query, setQuery] = useState( initialQuery);

  return (
    <View className="space-y-2 my-5">
      <View className="w-full flex-row items-center border-2 border-black-200 bg-black-100 h-16 rounded-2xl px-4 focus:border-secondary-200">
        <TextInput
          placeholder={"Search"}
          placeholderTextColor={"#7b7b8b"}
          value={query}
          onChangeText={(e) => setQuery(e)}
          className="flex-1 text-base font-pmedium text-gray-100 focus:border-secondary-200 focus:outline-secondary-200"
        />

        <TouchableOpacity onPress={handleSearch}>
          <Image
            source={icons.search}
            className="text-gray-300 w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchField;
