import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Linking, SafeAreaView } from 'react-native';
import axios from 'axios';

export default function App() {
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    // Fetch accidents from Mobile router
    axios.get('http://192.168.1.4:5000/api/mobile/accidents')
      .then(res => setAccidents(res.data))
      .catch(err => console.log(err));
  }, []);

  const renderItem = ({ item }) => {
    const mapsLink = `https://www.google.com/maps?q=${item.latitude},${item.longitude}`;
    return (
      <View style={styles.item}>
        <Text>Latitude: {item.latitude}</Text>
        <Text>Longitude: {item.longitude}</Text>
        <Text>Time: {new Date(item.timestamp).toLocaleString()}</Text>
        <Text style={styles.link} onPress={() => Linking.openURL(mapsLink)}>View on Map</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Accident List (Mobile)</Text>
      <FlatList
        data={accidents}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { padding: 15, marginBottom: 10, borderWidth: 1, borderRadius: 10, borderColor: '#ccc' },
  link: { color: 'blue', marginTop: 5 }
});
