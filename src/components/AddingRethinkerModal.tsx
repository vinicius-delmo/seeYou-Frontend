import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import unidecode from 'unidecode';

import axios from "axios";

interface RethinkerModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

const AddingRethinkerModal: React.FC<RethinkerModalProps> = ({
  isVisible,
  closeModal,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    area: "",
    sub_area: "",
    type_account: "",
    rethinker_profile_image: "",
    project_1: "",
    project_2: "",
    project_3: "",
  });
  const [userPhoto, setUserPhoto] = useState<any | null>(null);

 

  const handleChange = (key: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleRegister = () => {
    axios
      .post("http://192.168.100.5:8080/insert-rethinker", formData)
      .then((response) => {
        console.log("Cadastro realizado com sucesso!");
        console.log(response.data);
        closeModal();
      })
      .catch((error) => {
        console.error("Erro ao cadastrar:", error);
      });
  };
  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });
        setUserPhoto(photoSelected);
      
    } catch (error) {
      console.log(error);
    }
  }

  const uploadPhoto = async () => {
    try {
      if (userPhoto && userPhoto.assets && userPhoto.assets.length > 0) {
        
        const selectedAsset = userPhoto.assets[0];
        const uriParts = selectedAsset.uri.split(".");
        const fileType = uriParts[uriParts.length - 1];

        const fileNameWithoutAccents = unidecode(formData.name);
        const sanitizedFileName = fileNameWithoutAccents.replace(/ /g, "-").toLowerCase();
        const fileName = `${sanitizedFileName}`;
        
        
        formData.rethinker_profile_image = fileName+'.'+fileType;
  
        // Criar um novo objeto Blob com a imagem selecionada
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function () {
            reject(new TypeError("Request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", selectedAsset.uri, true);
          xhr.send(null);
        });
      console.log(formData)

    

     
        const formDataa = new FormData();
        formDataa.append("image", {
          uri: selectedAsset.uri,
          name: `${fileName}.${fileType}`,
          type: `image/${fileType}`,
          data: blob,
        });
  
        const response = await axios.post(
          "http://192.168.100.5:8080/upload-photo",
          formDataa,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        console.log("Foto enviada com sucesso!");
        console.log(response.data);
      }
    } catch (error) {
      console.error("Erro ao enviar foto:", error);
    }
  };
  const handleRegisterWithPhoto = async () => {
    try {
      await uploadPhoto(); // Chama o método para enviar a foto
      
      // Após o upload da foto, definir o nome do arquivo
    
  
      await handleRegister(); // Chama o método para cadastrar o rethinker
  
      closeModal();
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };
  

  return (
    <Modal visible={isVisible} transparent={true} onRequestClose={closeModal}>
      <TouchableOpacity activeOpacity={1} style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.titleModal}>Cadastro Rethinker</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira o nome"
            onChangeText={(text) => handleChange("name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Insira o email"
            onChangeText={(text) => handleChange("email", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Insira a área. Ex: Dev, Design"
            onChangeText={(text) => handleChange("area", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Insira a sub-área. Ex: Frontend, UX"
            onChangeText={(text) => handleChange("sub_area", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Insira o tipo de acesso"
            onChangeText={(text) => handleChange("type_account", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Insira o projeto"
            onChangeText={(text) => handleChange("project_1", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Insira o projeto"
            onChangeText={(text) => handleChange("project_2", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Insira o projeto"
            onChangeText={(text) => handleChange("project_3", text)}
          />
          <TouchableOpacity
            style={styles.buttonProfileImage}
            onPress={handleUserPhotoSelect}
          >
            <Image
              source={require("../../assets/submit-profile-image.svg")}
            ></Image>
            <Text style={styles.buttonText}>Enviar foto de perfil</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonCancel} onPress={closeModal}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRegister}
              onPress={handleRegisterWithPhoto}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#706E64",
    borderRadius: 5,
    padding: 20,
    width: "80%",
  },
  input: {
    paddingLeft: 5,
    borderRadius: 5,
    backgroundColor: "#FFF",
    marginBottom: 8,
    fontFamily: "Roboto",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonRegister: {
    width: "45%",
    backgroundColor: "#D3FA3A",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonCancel: {
    width: "45%",
    backgroundColor: "#B6B4B4",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#000",
    fontFamily: "Roboto",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonProfileImage: {
    width: "100%",
    backgroundColor: "#B6B4B4",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  titleModal:{
    color: "#D3FA3A",
    fontFamily: "Roboto",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10
  }
});

export default AddingRethinkerModal;
