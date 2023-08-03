import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import axios from "axios";
import RethinkerModal from "../components/RethinkerModal/RethinkerModal";
import ButtonAddingRethinker from "../components/ButtonAddingRethinker/ButtonAddingRethinker";
import Header from "../components/Header/Header";
import RethinkerCard from "../components/RethinkerCard/RethinkerCard";

interface Rethinker {
  rethinker_id: number;
  name: string;
  area: string;
  rethinker_profile_image: string;
}

function RethinkersList() {
  const [rethinkers, setRethinkers] = useState<Rethinker[]>([]);
  const [originalRethinkers, setOriginalRethinkers] = useState<Rethinker[]>([]);
  const [selectedRethinker, setSelectedRethinker] = useState<Rethinker | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const compareRethinkersByName = (a: Rethinker, b: Rethinker) => {
    return a.name.localeCompare(b.name);
  };
  useEffect(() => {
    axios
      .get("http://192.168.100.5:8080/rethinkers")
      .then((response) => {
        const sortedRethinkers = response.data.sort(compareRethinkersByName);
        setRethinkers(sortedRethinkers);
        setOriginalRethinkers(JSON.parse(JSON.stringify(sortedRethinkers)));
      })
      .catch((error) => {
        console.error("Erro ao obter os rethinkers:", error);
      });
  }, []);

  useEffect(() => {
    setRethinkers(rethinkers);
  }, [rethinkers]);

  const openModal = (rethinker: Rethinker) => {
    setSelectedRethinker(rethinker);
  };

  const closeModal = () => {
    setSelectedRethinker(null);
  };
  const handleSearch = (text: string) => {
    setSearchQuery(text);

    if (text === "") {
      setRethinkers(originalRethinkers);
    } else {
      const filteredRethinkers = originalRethinkers.filter((rethinker) =>
        rethinker.name.toLowerCase().includes(text.toLowerCase())
      );
      setRethinkers(filteredRethinkers);
    }
  };

  return (
    <View style={styles.container}>
      <Header searchQuery={searchQuery} handleSearch={handleSearch} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {rethinkers.map((rethinker) => (
          <RethinkerCard
            key={rethinker.rethinker_id}
            title={rethinker.name}
            subTitle={rethinker.area}
            imageName={rethinker.rethinker_profile_image}
            onPress={() => openModal(rethinker)}
          />
        ))}
        <StatusBar style="auto" />
        {selectedRethinker && (
          <RethinkerModal
            isVisible={true}
            closeModal={closeModal}
            rethinker={selectedRethinker}
            photo={selectedRethinker.rethinker_profile_image}
          />
        )}
      </ScrollView>
      <View style={styles.buttonAddingRethinker}>
        <ButtonAddingRethinker
          onPress={() => {
            alert("olá");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1B1B1B",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContainer: {
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: 150,
  },
  buttonAddingRethinker: {
    position: "absolute",
    bottom: 100,
    right: 10,
  },
});

export default RethinkersList;
