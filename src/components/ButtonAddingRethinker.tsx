import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Modal, Text } from 'react-native';
import AddingRethinkerModal from './AddingRethinkerModal';



interface RoundButtonProps {
  onPress: () => void;
}

const ButtonAddingRethinker: React.FC<RoundButtonProps> = ({ onPress }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.buttonContainer}>
        <View style={styles.button}>
          <Image source={require('../../assets/person.png')} />
        </View>
      
      <AddingRethinkerModal
        isVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
      />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
      },
    button: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#D3FA3A',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ButtonAddingRethinker;
