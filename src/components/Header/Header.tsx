import { Text, View, Image, TextInput } from "react-native";
import { styles } from "./styles";

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
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
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

export default Header;
