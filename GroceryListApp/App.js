import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddRecipe from "./src/components/AddRecipe";
import HomeView from "./src/components/HomeView";

const Stack = createNativeStackNavigator();

export default function App({navigation}) {
    return (
        <NavigationContainer>
             <Stack.Navigator>
               <Stack.Screen name="Recipes" component={HomeView} />
               <Stack.Screen name="Add Recipe" component={AddRecipe} />
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
