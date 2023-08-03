import React, { useState } from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { styles } from "./styles";
import * as ImagePicker from "expo-image-picker";
import unidecode from "unidecode";

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
      console.error(error);
    }
  }

  const uploadPhoto = async () => {
    try {
      if (userPhoto && userPhoto.assets && userPhoto.assets.length > 0) {
        const selectedAsset = userPhoto.assets[0];
        const uriParts = selectedAsset.uri.split(".");
        const fileType = uriParts[uriParts.length - 1];

        const fileNameWithoutAccents = unidecode(formData.name);
        const sanitizedFileName = fileNameWithoutAccents
          .replace(/ /g, "-")
          .toLowerCase();
        const fileName = `${sanitizedFileName}`;

        formData.rethinker_profile_image = fileName + "." + fileType;

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

        const formDataWithPhoto = new FormData();
        formDataWithPhoto.append("image", {
          uri: selectedAsset.uri,
          name: `${fileName}.${fileType}`,
          type: `image/${fileType}`,
          data: blob,
        });

        const response = await axios.post(
          "http://192.168.100.5:8080/upload-photo",
          formDataWithPhoto,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
    } catch (error) {
      console.error("Erro ao enviar foto:", error);
    }
  };
  const handleRegisterWithPhoto = async () => {
    try {
      await uploadPhoto();

      await handleRegister();

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
              source={require("../../../assets/submit-profile-image.svg")}
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

export default AddingRethinkerModal;
