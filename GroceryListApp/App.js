import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { View, StyleSheet, Text,TextInput, TouchableOpacity, ScrollView } from 'react-native';
//import {addHobies} from ‘../helpers/sqlHelper’

export default function App() {
let formData = []
    const [name, setName] = useState('');
    const [hobby, setHobby] = useState('');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                Add recipe
            </Text>
            <TextInput style={styles.inp}
            placeholder={"Name"}
            onChangeText={(val) => setName(val)}
             value={name}
            />
            <TextInput style={styles.inp}
            placeholder={"Hobby"}
            onChangeText={(val) => setHobby(val)}
            value={hobby}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  title: {
  fontSize: 30
  },
  inp: {
      height: 40,
      width: 200,
      margin: 12,
      borderWidth: 1,
      padding: 10,
  }
});
