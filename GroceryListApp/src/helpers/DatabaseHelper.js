var SQLite = require('react-native-sqlite-storage')

export const getDBConnection = () => {
  const db = SQLite.openDatabase('Recipes.db', "1.0", "Recipes database", 200000,
                          () => {},
                          () => {console.log(err)});
  return db;
};

export const createTables = async (db) => {
  const createRecipesQuery = `CREATE TABLE IF NOT EXISTS recipe(
        recipe_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        instructions TEXT,
        degrees INTEGER,
        time REAL
        );
  `;

  const createIngredientTable = `CREATE TABLE IF NOT EXISTS ingredient(
        ingredient_id INTEGER PRIMARY KEY,
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

export const insertRecipe = (db, recipeName, instructions, degrees, time) => {
  const insertRecipe = `INSERT INTO recipe(name, instructions, degrees, time)
                                    values (?, ?, ?, ?);`;

  db.transaction((tx) => {
    tx.executeSql(insertRecipe, [recipeName, instructions, degrees, time],
    (tx, res) => {alert(res.insertId)})
  });

};
