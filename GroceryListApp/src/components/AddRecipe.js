import React, {useState} from 'react';
import { View, Button, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {insertRecipe} from '../helpers/DatabaseHelper';
import { openDatabase } from 'react-native-sqlite-storage';
import DropDownPicker from "react-native-dropdown-picker";
const dbConnection = openDatabase({ name: 'Recipes.db' });

export default function AddRecipe({ navigation }) {

    navigation.setOptions({ title: 'Add new recipe' });
    let [ingredients, setIngredients] = useState([{}]);
    let [recipeName, setRecipeName] = useState('');
    let [cookingTime, setCookingTime] = useState(0);
    let [degrees, setDegrees] = useState('');
    let [description, setDescription] = useState('');
    let [ingredient, setIngredient] = useState([]);
    let [ingredientsArray, setIngredientsArray] = useState([]);
    let [selectedValue, setSelectedValue] = useState('');

    handleAddIngredient = () => {
        const item = {
          name: "",
          amount: 0,
          unit: 0
        };
        setIngredients([...ingredients, item]);
    };

    const setIngredientsData = (index, dataName, e) => {
        if(ingredientsArray[index] === undefined) {
           ingredientsArray[index] = {};
        }
        ingredientsArray[index][dataName] = e.nativeEvent.text;
    }

    const addRecipe = () => {
        insertRecipe(dbConnection, recipeName, description, degrees, cookingTime, ingredientsArray).then((data) => {
          }).catch((error) => alert(error.message));
        navigation.navigate('Recipes');
    }

    return (
        <View style={styles.container}>
            <TextInput
                name="recipeName"
                onChangeText={setRecipeName}
                value={recipeName}
                style={styles.input}
                placeholder="Name"
                keyboardType="text"
            />
            <TextInput
                style={styles.input}
                name="cookingTime"
                onChangeText={setCookingTime}
                value={cookingTime}
                placeholder="Cooking time"
                keyboardType="numeric"
            />
            <TextInput
                name="degrees"
                onChangeText={setDegrees}
                value={degrees}
                style={styles.input}
                placeholder="Degrees"
                keyboardType="numeric"
            />
            <TextInput
                editable
                multiline
                numberOfLines={6}
                maxLength={1000}
                style={styles.multilineInput}
                name="description"
                onChangeText={setDescription}
                value={description}
                placeholder="Description"
            />

            {ingredients.map((item, idx) => (
                <View style={styles.ingredientView}>
                    <TextInput
                        editable
                        style={styles.ingredientName}
                        onEndEditing={(itemValue, itemIndex) => setIngredientsData(idx, 'name', itemValue)}
                        placeholder="Ingredient"
                    />

                    <TextInput
                        editable
                        style={styles.ingredientInfo}
                        onEndEditing={(itemValue, itemIndex) => setIngredientsData(idx, 'amount', itemValue)}
                        placeholder="Amount"
                    />

                    <TextInput
                        editable
                        style={styles.ingredientInfo}
                        onEndEditing={(itemValue, itemIndex) => setIngredientsData(idx, 'unit', itemValue)}
                        placeholder="Unit"
                    />
                </View>
            ))
            }

            <View style={styles.buttonView}>
                <Button color="#000000" title="more ingred." onPress={handleAddIngredient.bind(this)} />
            </View>

            <View style={globalStyles.stickyContainer} >
                <TouchableOpacity style={globalStyles.button} onPress={() => addRecipe()}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    height: '100%'
  },
  input: {
    height: 40,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
  ingredientName: {
      height: 40,
      width: '50%',
      margin: 12,
      marginLeft: 20,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10
  },
  ingredientInfo : {
      height: 40,
      width: '17%',
      margin: 12,
      marginLeft: 0,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10
  },
  multilineInput: {
      width: '90%',
      margin: 12,
      borderWidth: 1,
      paddingLeft: 10,
      borderRadius: 10
  },
  buttonView: {
    alignItems: 'flex-start',
    marginLeft: 45,
    width: '100%'
  },
  ingredientView: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '100%'
  }
});
