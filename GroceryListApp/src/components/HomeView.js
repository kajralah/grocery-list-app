import React, {useState, useEffect} from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import globalStyles from '../styles/style';
import {NavigationContainer} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {insertRecipe, createTables} from '../helpers/DatabaseHelper';
import { openDatabase } from 'react-native-sqlite-storage';
import AntIcon from "react-native-vector-icons/AntDesign";

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
    const [empty, setEmpty] = useState([]);

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
        }
        });

        setRecipes(recipesArray);
        if (recipesArray.length >= 1) {
            setEmpty(false);
        } else {
            setEmpty(true)
        }
    });

     const emptyMSG = (status) => {
        return (
          <View>
            <Text>No recipes</Text>
          </View>
        );
      }

    return (
    <View>
            <View style={{marginBottom: 50}}>
                {empty ? emptyMSG(empty) :
                    <FlatList
                        data={recipes}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(recipe) =>
                          <View>
                            <Text style={styles.recipeItem} onPress={() => navigateToRecipe(recipe.item.id)}> <AntIcon name="staro" color="black" size={30} /> {recipe.item.name } </Text>
                          </View>
                    }
                  />
                }

            </View>
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