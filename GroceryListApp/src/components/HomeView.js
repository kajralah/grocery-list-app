import React, {useState, useEffect} from 'react';
import { View, Button, StyleSheet, Text,TextInput, TouchableOpacity, ScrollView } from 'react-native';
import globalStyles from '../styles/style';
import {NavigationContainer} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {insertRecipe, createTables, getDBConnection} from '../helpers/DatabaseHelper';
import { openDatabase } from 'react-native-sqlite-storage';

const dbConnection = openDatabase({ name: 'Recipes.db' });

export default function HomeView({navigation}) {
    const navigateToAddRecipes = () => {
       navigation.navigate('AddRecipe');
    };

    let [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const loadDatabase = async () => {
            await createTables(dbConnection);
        }

        loadDatabase();
    });

    dbConnection.transaction((tx) => {
        tx.executeSql(`SELECT * FROM recipe`, null, (tx, results) => {
        var len = results.rows.length;

        for (var i = 0; i < len; i++) {
            let result = results.rows.item(i);

            let currentRecipe = {
                'id': result.recipe_id,
                'name': result.name
            };

            recipes.push(currentRecipe);
        }
        });
    });

    return (
        <View style = {styles.container}>
            <ScrollView>
                <Text>RecipeList</Text>

             {recipes.map((item, key)=>(
                 <Text key={key}> { item.name } </Text>
               ))
             }

            </ScrollView>

            <View style={globalStyles.stickyContainer} >
                <TouchableOpacity style={globalStyles.button} onPress={navigateToAddRecipes}>
                    <Text>Add recipe</Text>
                </TouchableOpacity>
            </View>
         </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0
  },
  title: {
  fontSize: 30
  },
  inp: {
      height: 40,
      width: 200,
      margin: 12,
      borderWidth: 1,
      padding: 10
  }
});
