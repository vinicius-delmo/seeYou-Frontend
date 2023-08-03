import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import AddingRethinkerModal from "../AddingRethinkerModal/AddingRethinkerModal";
import Svg, { Path } from "react-native-svg";
import { styles } from "./styles";

interface RoundButtonProps {
  onPress: () => void;
}

const ButtonAddingRethinker: React.FC<RoundButtonProps> = ({ onPress }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.buttonContainer}
      >
        <View style={styles.button}>
          <Svg width="48" height="48" viewBox="0 0 44 32">
            <Path
              d="M34.5 20V13.5H28V10.5H34.5V3.99995H37.5V10.5H44V13.5H37.5V20H34.5ZM16 15.95C13.8 15.95 12 15.25 10.6 13.85C9.2 12.45 8.5 10.65 8.5 8.44995C8.5 6.24995 9.2 4.44995 10.6 3.04995C12 1.64995 13.8 0.949951 16 0.949951C18.2 0.949951 20 1.64995 21.4 3.04995C22.8 4.44995 23.5 6.24995 23.5 8.44995C23.5 10.65 22.8 12.45 21.4 13.85C20 15.25 18.2 15.95 16 15.95ZM0 32V27.3C0 26.1333 0.291667 25.075 0.875 24.125C1.45833 23.175 2.3 22.4666 3.4 22C5.9 20.9 8.1223 20.125 10.0669 19.675C12.0115 19.225 13.9865 19 15.9919 19C17.9973 19 19.9667 19.225 21.9 19.675C23.8333 20.125 26.05 20.9 28.55 22C29.65 22.5 30.5 23.2166 31.1 24.15C31.7 25.0833 32 26.1333 32 27.3V32H0ZM3 29H29V27.3C29 26.7666 28.85 26.2583 28.55 25.775C28.25 25.2916 27.85 24.9333 27.35 24.7C24.9833 23.6 22.9833 22.875 21.35 22.525C19.7167 22.175 17.9333 22 16 22C14.0667 22 12.275 22.175 10.625 22.525C8.975 22.875 6.96667 23.6 4.6 24.7C4.1 24.9333 3.70833 25.2916 3.425 25.775C3.14167 26.2583 3 26.7666 3 27.3V29ZM16 12.95C17.3 12.95 18.375 12.525 19.225 11.675C20.075 10.825 20.5 9.74995 20.5 8.44995C20.5 7.14995 20.075 6.07495 19.225 5.22495C18.375 4.37495 17.3 3.94995 16 3.94995C14.7 3.94995 13.625 4.37495 12.775 5.22495C11.925 6.07495 11.5 7.14995 11.5 8.44995C11.5 9.74995 11.925 10.825 12.775 11.675C13.625 12.525 14.7 12.95 16 12.95Z"
              fill="black"
            />
          </Svg>
        </View>

        <AddingRethinkerModal
          isVisible={modalVisible}
          closeModal={() => setModalVisible(false)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonAddingRethinker;
