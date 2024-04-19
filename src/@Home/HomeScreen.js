import { useEffect } from "react";
import { Button, Text, View } from "react-native";

function HomeScreen({ navigation, route }) {
  const { itemId } = route?.params || {};
  useEffect(() => {
    if (route?.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route?.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text> Welcome: {itemId}</Text>
      <Button
        title="Create post"
        onPress={() => navigation.navigate("CreatePost")}
      ></Button>
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

export default HomeScreen;
