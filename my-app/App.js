import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Home from "./screens/HomeScreens"
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import About from "./screens/About";
import Home from "./screens/HomeScreens";
import Detail from "./screens/DetailProduct";


const client = new ApolloClient({
  uri: 'https://a978-27-50-29-117.ngrok-free.app',
  cache: new InMemoryCache(),
});
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeStack" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};




export default function App() {
  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="About" component={About} />
        {/* <Tab.Screen name="Detail" component={Detail} /> */}
      </Tab.Navigator>
    </NavigationContainer>
    </ApolloProvider>
  );
}
