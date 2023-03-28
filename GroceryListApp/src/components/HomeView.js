import React, {useState, useEffect} from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import globalStyles from '../styles/style';
import {NavigationContainer} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {insertRecipe, createTables} from '../helpers/DatabaseHelper';
import { openDatabase } from 'react-native-sqlite-storage';
import { GiBeveledStar } from 'react-icons/gi';

const dbConnection = openDatabase({ name: 'Recipes.db' });

export default function HomeView({navigation}) {
    const navigateToAddRecipes = () => {
       navigation.navigate('AddRecipe');
    };

    const navigateToRecipe = (recipeID) => {
        navigation.navigate('ViewRecipe', {
            id: recipeID
        });
    };

    let [recipes, setRecipes] = useState([]);
    let [recipesArray, setRecipesArray] = useState([]);

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
                'name': result.recipe_name
            };

            recipesArray.push(currentRecipe);
 n
        }
        });

        setRecipes(recipesArray);
    });

    return (
        <View style = {styles.container}>
        <Text>test</Text>
            <ScrollView>
             {recipes.map((item, key)=>
                 (<View>
                    <GiBeveledStar/>
                    <Text key={key} style={styles.recipeItem} onPress={() => navigateToRecipe(item.id)}> { item.id} {item.name } </Text>
                  </View>
                 )
               )
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
    paddingTop: 0,
    paddingBottom: 50
  },
  recipeItem: {
    fontSize: 35,
    width: Dimensions.get('screen').width,
    marginLeft: 20
  }
});