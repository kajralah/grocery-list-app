import React, {useState} from 'react';
import { View, Button, Text, StyleSheet, FlatList } from 'react-native';
import {getRecipe, getIngredients} from '../helpers/DatabaseHelper';
import { openDatabase } from 'react-native-sqlite-storage';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const dbConnection = openDatabase({ name: 'Recipes.db' });

export default function ViewRecipe({ route, navigation }) {
    let recipeID = route.params.id;
    let [recipe, setRecipe] = useState('');
    let [ingredients, setIngredients] = useState('');
    let [hours, setHours] = useState('');
    let [minutes, setMinutes] = useState('');
    let [emptyDegrees, setEmptyDegrees] = useState(true);

    let results = getRecipe(dbConnection, recipeID).then((data) => {
       let len = data.rows.length;
       if (len > 0) {
         setRecipe(data.rows.item(0));
         navigation.setOptions({ title: recipe.recipe_name });
         let timeInMinutes = recipe.time;

         if (timeInMinutes > 60) {
            setHours(Math.floor(timeInMinutes / 60) + 'h');
            setMinutes(timeInMinutes % 60 + 'min');
         } else {
            setMinutes(timeInMinutes + 'min');
         }
         if (recipe.degrees && recipe.degrees > 0) {
            setEmptyDegrees(false);
         }
       }
    }).catch((error) => alert(error.message));

    let ingredientsData = getIngredients(dbConnection, recipeID).then((data) => {
         setIngredients(data);
     }).catch((error) => alert(error.message));

    return (
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 30}}>
              <Text style={{fontSize: 35}}> {recipe.recipe_name} </Text>
          </View>
         <View style={emptyDegrees ? styles.timeStyle : styles.timeAndDegreeStyle}>
            <Text>
                <Ionicons name="md-time" color="black" size={30} />
                <Text style={{fontSize: 25}}>{hours} {minutes}</Text>
            </Text>
            {emptyDegrees ? null : <Text>
                <MaterialCommunityIcons name="toaster-oven" color="black" size={30} />
                <Text style={{fontSize: 25}}>{recipe.degrees}°C</Text>
            </Text>}
         </View>
         <View>
            <FlatList
                data={ingredients}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(ingredient) =>
                  <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 25}}> {`\u2022`} {ingredient.item.amount } {ingredient.item.unit } {ingredient.item.name }</Text>
                  </View>
            }
            />
            <Text style={{fontSize: 25, marginTop: 20}}> Preparation:</Text>
            <Text style={{fontSize: 24}}> {recipe.instructions} </Text>
         </View>
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
  },
  timeAndDegreeStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30
  },
  timeStyle: {
      flexDirection: 'row',
      marginBottom: 30
  }
});