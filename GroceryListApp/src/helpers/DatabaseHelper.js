import {useState} from 'react';
var SQLite = require('react-native-sqlite-storage')

export const createTables = async (db) => {
  const createRecipesQuery = `CREATE TABLE IF NOT EXISTS recipe(
        recipe_id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_name TEXT NOT NULL,
        instructions TEXT,
        degrees INTEGER,
        time REAL
        );
  `;

  const createIngredientTable = `CREATE TABLE IF NOT EXISTS ingredient(
        ingredient_id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        amount REAL,
        unit TEXT
        );
  `;

   db.transaction((tx) => {
        tx.executeSql(createRecipesQuery, null);
        tx.executeSql(createIngredientTable);
   });
};

export const insertRecipe = (db, recipeName, instructions, degrees, time, ingredientsJSON) => {
  const insertRecipe = `INSERT INTO recipe(recipe_name, instructions, degrees, time)
                                    values (?, ?, ?, ?);`;

  const insertIngredient = `INSERT INTO ingredient(recipe_id, name, amount, unit) values(?,?,?,?)`;

  return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(insertRecipe, [recipeName, instructions, degrees, time],
            (tx, res) => {
                let recipeID = res.insertId;
                for (let i = 0; i < ingredientsJSON.length; i++) {
                    tx.executeSql(insertIngredient, [recipeID, ingredientsJSON[i]['name'], ingredientsJSON[i]['amount'], ingredientsJSON[i]['unit']],
                        (tx, res) => {}, (error) => {alert(error);});
                }

                resolve(recipeID);

            }, (error) => {alert(error);});
        });
      });
};

export const getRecipe = (db, recipeID) => {
  let [result, setResult] = useState('');//check if needed
  const getRecipe = `SELECT * FROM recipe JOIN ingredient ON ingredient.recipe_id = recipe.recipe_id where recipe.recipe_id = ?`;

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(getRecipe, [recipeID], (tx, result) => {resolve(result);},
                    (error) => {reject(error);});
    });
  })
};
