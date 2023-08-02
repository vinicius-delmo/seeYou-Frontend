import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import RethinkerModal from "../components/RethinkerModal";
import ButtonAddingRethinker from "../components/ButtonAddingRethinker";

interface Rethinker {
  rethinker_id: number;
  name: string;
  area: string;
  rethinker_profile_image: string;
}

interface RethinkerCardProps {
  title: string;
  subTitle: string;
  imageName: string;
  onPress: () => void;
}

const RethinkerCard: React.FC<RethinkerCardProps> = ({
  title,
  subTitle,
  imageName,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.leftContent}>
          <Image
            source={{ uri: `http://192.168.100.5:8080/assets/profile-images/${imageName}` }}
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
};
function Header({
  searchQuery,
  handleSearch,
}: {
  searchQuery: string;
  handleSearch: (text: string) => void;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerImageText}>
        <Text style={styles.headerText}>See.you</Text>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar Rethinkers..."
        onChangeText={handleSearch}
        value={searchQuery}
      />
    </View>
  );
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
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
     
      >
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
          />
        )}
      </ScrollView>
      <View style={styles.buttonAddingRethinker}>
        <ButtonAddingRethinker onPress={()=>{alert('olá')}}/>
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
  card: {
    backgroundColor: "#FFF",
    width: 350,
    height: 60,
    borderRadius: 5,
    flexDirection: "row",
    marginBottom: 10,
  },
  leftContent: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    color: "#000",
    fontFamily: "Roboto",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
  subTitle: {
    color: "rgba(0, 0, 0, 0.50)",
    fontFamily: "Roboto",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "400",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  scrollViewContainer: {
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: 150,
  },
  header: {
    marginTop: 40,
    marginBottom: 32,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "100%",
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  searchInput: {
    marginTop: 24,
    width: "100%",
    height: 40,
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  headerImageText: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  headerText: {
    color: "#D3FA3A",
    fontFamily: "Roboto",
    fontSize: 40,
    fontWeight: "bold",
  },
  buttonAddingRethinker: {
    position: "absolute",
    bottom: 100,
    right: 10,
  },
});

export default RethinkersList;
