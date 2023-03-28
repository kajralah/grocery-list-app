import React, {useState} from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import {getRecipe} from '../helpers/DatabaseHelper';
import { openDatabase } from 'react-native-sqlite-storage';

const dbConnection = openDatabase({ name: 'Recipes.db' });

export default function ViewRecipe({ route, navigation }) {
    let recipeID = route.params.id;
    let [result, setResult] = useState('');

    let results = getRecipe(dbConnection, recipeID).then((data) => {
       let len = data.rows.length;
       alert(recipeID)
       if (len > 0) {
         setResult(data.rows.item(0));
         //alert(JSON.stringify(data.rows.item(0)))
         //setResult(JSON.stringify(data.rows.item(0)));
       }
    }).catch((error) => alert(error.message));

    navigation.setOptions({ title: result.name })

    return (
        <View style={styles.container}>

        <Text style={styles.recipeName}>{result}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingLeft: 25,
    paddingBottom: 50
  },
  recipeName: {
    fontSize: 25
  }
});
            /*<Text style={styles.recipeName}>Ingredients:</Text>
            <Text style={styles.recipeName}>Degrees: {result.degrees}</Text>
            <Text style={styles.recipeName}>Time: {result.time}</Text>
            <Text style={styles.recipeName}>Instructions: {result.instructions}</Text>
        */
