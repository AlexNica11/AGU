import {Button, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button onPress={navigation.openDrawer} title="Open navigation drawer" />
            <Button
                onPress={() => navigation.navigate("Notifications")}
                title="Go to notifications"
            />
        </View>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button onPress={navigation.openDrawer} title="Open navigation drawer" />
            <Button onPress={() => navigation.navigate("Home")} title="Go back home" />
        </View>
    );
}

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function MainApp () {
    return(
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="Articles" component={NotificationsScreen} />
            <Drawer.Screen name="Recipes" component={NotificationsScreen} />
            <Drawer.Screen name="Find a baby" component={NotificationsScreen} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        </Drawer.Navigator>
    )
}

export default MainApp;