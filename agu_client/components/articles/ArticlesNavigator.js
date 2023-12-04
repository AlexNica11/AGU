import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import ArticlesScreen from "./ArticlesScreen";
import ArticleScreen from "./ArticleScreen";
import AddArticle from "./AddArticle";

const Stack = createStackNavigator();

export default function ArticlesNavigator() {
    return (
        // deny access to move between screens
        <Stack.Navigator initialRouteName="Articles" screenOptions={{headerShown: false}}>
            <Stack.Screen name="ArticlesScreen" component={ArticlesScreen}/>
            <Stack.Screen name="ArticleScreen" component={ArticleScreen}/>
            <Stack.Screen name="AddArticle" component={AddArticle}/>
        </Stack.Navigator>
    );
}