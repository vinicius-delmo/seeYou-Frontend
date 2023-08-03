import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";

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
            source={{
              uri: `http://192.168.100.5:8080/assets/profile-images/${imageName}`,
            }}
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

export default RethinkerCard;
