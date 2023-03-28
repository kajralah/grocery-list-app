import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddRecipe from "./src/components/AddRecipe";
import HomeView from "./src/components/HomeView";
import ViewRecipe from "./src/components/ViewRecipe";

const Stack = createNativeStackNavigator();

export default function App({navigation}) {
    return (
        <NavigationContainer>
             <Stack.Navigator>
               <Stack.Screen name="Recipes" component={HomeView}
               options={{ headerTitleAlign: 'center'}}></Stack.Screen>
               <Stack.Screen name="AddRecipe" component={AddRecipe}
               options={{ headerTitleAlign: 'center'}}></Stack.Screen>
               <Stack.Screen name="ViewRecipe" component={ViewRecipe}
               options={{ headerTitleAlign: 'center'}}></Stack.Screen>
             </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});
