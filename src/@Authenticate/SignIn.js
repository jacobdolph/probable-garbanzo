import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <Text style={{ fontSize: 56, marginTop: 50 }}>Sign In</Text>
      <TextInput
        style={{
          margin: 20,
          height: 40,
          borderRadius: 8,
          backgroundColor: "white",
          minWidth: "60%",
        }}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      ></TextInput>
      <TextInput
        style={{
          margin: 20,
          backgroundColor: "white",
          borderRadius: 8,
          height: 40,
          minWidth: "60%",
        }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      ></TextInput>
    </View>
  );
};

export default SignIn;
