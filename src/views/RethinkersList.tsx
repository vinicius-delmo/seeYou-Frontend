import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import RethinkerModal from '../components/RethinkerModal';

interface Rethinker {
  rethinker_id: number;
  name: string;
  area: string;
}

function RethinkerCard({ title, subTitle, onPress }: { title: string; subTitle: string; onPress: () => void; }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.leftContent}>
          <Image
            source={require('../../assets/profile-images/vinicius.jpg')}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function RethinkersList() {
  const [rethinkers, setRethinkers] = useState<Rethinker[]>([]);
  const [selectedRethinker, setSelectedRethinker] = useState<Rethinker | null>(null);

  useEffect(() => {
    axios
      .get('http://192.168.100.5:8080/rethinkers')
      .then(response => {
        setRethinkers(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter os rethinkers:', error);
      });
  }, []);

  const openModal = (rethinker: Rethinker) => {
    setSelectedRethinker(rethinker);
  };

  const closeModal = () => {
    setSelectedRethinker(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {rethinkers.map(rethinker => (
        <RethinkerCard
          key={rethinker.rethinker_id}
          title={rethinker.name}
          subTitle={rethinker.area}
          onPress={() => openModal(rethinker)}
        />
      ))}
      <StatusBar style="auto" />
      {selectedRethinker && (
        <RethinkerModal isVisible={true} closeModal={closeModal} rethinker={selectedRethinker} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1B1B1B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    width: 300,
    height: 60,
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftContent: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    color: '#000',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  subTitle: {
    color: 'rgba(0, 0, 0, 0.50)',
    fontFamily: 'Roboto',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default RethinkersList;
