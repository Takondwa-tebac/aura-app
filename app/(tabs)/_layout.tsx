import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "../../constants/icons";
import { StatusBar } from "expo-status-bar";
import { GlobalProvider } from "@/context/GlobalProvider";

const TabIcon = ({
  icon,
  color,
  name,
  focused,
}: {
  icon: any;
  color: any;
  name: any;
  focused: any;
}) => {
  return (
    <View className="gap-2 justify-center items-center  w-20 my-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6 mt-10"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <GlobalProvider>
      <Tabs
        className="shadow-sm shadow-black-500/50"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 0.5,
            borderTopColor: "#232533",
            height: 70,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Home"
                icon={icons.home}
                focused={focused}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Create"
                icon={icons.plus}
                focused={focused}
                color={color}
              />
            ),
          }}
        />

        {/* <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Bookmark"
                icon={icons.bookmark}
                focused={focused}
                color={color}
              />
            ),
          }}
        /> */}

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Profile"
                icon={icons.profile}
                focused={focused}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="light" backgroundColor="#161622" />
    </GlobalProvider>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
