import React from "react";
import { Modal, Text, View, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";

interface RethinkerModalProps {
  isVisible: boolean;
  closeModal: () => void;
  rethinker: any;
  photo: any;
}

const RethinkerModal: React.FC<RethinkerModalProps> = ({
  isVisible,
  closeModal,
  rethinker,
  photo,
}) => {
  return (
    <Modal visible={isVisible} transparent={true} onRequestClose={closeModal}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.modalOverlay}
        onPress={closeModal}
      >
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Image
              source={{
                uri: `http://192.168.100.5:8080/assets/profile-images/${photo}`,
              }}
              style={styles.image}
            />

            <Text style={styles.title}>{rethinker.name}</Text>
          </View>
          <Text style={styles.info}>Email: {rethinker.email}</Text>
          <Text style={styles.info}>Área: {rethinker.area}</Text>
          <Text style={styles.info}>Sub Area: {rethinker.sub_area}</Text>
          {rethinker.project_1 && (
            <Text style={styles.info}>Projeto 1: {rethinker.project_1}</Text>
          )}
          {rethinker.project_2 && (
            <Text style={styles.info}>Projeto 2: {rethinker.project_2}</Text>
          )}
          {rethinker.project_3 && (
            <Text style={styles.info}>Projeto 3: {rethinker.project_3}</Text>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default RethinkerModal;
