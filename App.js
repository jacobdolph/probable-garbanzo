import { StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/@Home/HomeScreen";
import DetailsScreen from "./src/@Details/DetailsScreen";
import CreatePostScreen from "./src/@CreatePost/CreatePostScreen";
import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import SignIn from "./src/@Authenticate/SignIn";
import SignUp from "./src/@Authenticate/SignUp";
import SplashScreen from "./src/@SplashScreen/SplashScreen";

const AuthContext = createContext();

const Tab = createBottomTabNavigator();

export default function App() {
  const [isSignOut, setIsSignOut] = useState(false);
  const [userToken, setUserToken] = useState("hfdjydtyiftyiftyi");
  const [isLoading, setIsLoading] = useState(false);

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <AuthContext.Provider>
      <NavigationContainer>
        <Tab.Navigator>
          {userToken ? (
            <>
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Overview" }}
                initialParams={{ itemId: userToken }}
              />
              <Tab.Screen name="Details" component={DetailsScreen} />
              <Tab.Screen name="CreatePost" component={CreatePostScreen} />
            </>
          ) : (
            <>
              <Tab.Screen
                name="SignIn"
                component={SignIn}
                options={{
                  title: "Sign In",
                  animationTypeForReplace: isSignOut ? "pop" : "push",
                }}
              />
              <Tab.Screen name="SignUp" component={SignUp} />
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
