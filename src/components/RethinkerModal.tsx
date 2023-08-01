import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface RethinkerModalProps {
  isVisible: boolean;
  closeModal: () => void;
  rethinker: any;
}

const RethinkerModal: React.FC<RethinkerModalProps> = ({ isVisible, closeModal, rethinker }) => {
  return (
    <Modal visible={isVisible} transparent={true} onRequestClose={closeModal}>
      <TouchableOpacity activeOpacity={1} style={styles.modalOverlay} onPress={closeModal}>
        <View style={styles.modalContent}>
          <Text style={styles.info}>Nome: {rethinker.name}</Text>
          <Text style={styles.info}>Email: {rethinker.email}</Text>
          <Text style={styles.info}>Área: {rethinker.area}</Text>
          <Text style={styles.info}>Sub Area: {rethinker.sub_area}</Text>
          <Text style={styles.info}>Type Account: {rethinker.type_account}</Text>
          <Text style={styles.info}>Project 1: {rethinker.project_1}</Text>
          <Text style={styles.info}>Project 2: {rethinker.project_2}</Text>
          <Text style={styles.info}>Project 3: {rethinker.project_3}</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  info: {
    color: '#000',
    fontFamily: 'Roboto',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default RethinkerModal;
