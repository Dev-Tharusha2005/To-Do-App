import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from "./Home";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const WelcomeScreen = ({navigation}) => {

  const { container, coverImg, mainText, subContainer, subText, nextBtn, btnText } = styles;

  return (
    <View style={container}>
      <Image source={require("./assets/cover.png")} style={coverImg} />
      <Text style={mainText}>To-Do App</Text>

      <View style={subContainer}>
        <Text style={subText}>This productive tool is designed to help</Text>
        <Text style={subText}>you better manage your task</Text>
        <Text style={subText}>project-wise conveniently!</Text>
      </View>

      <TouchableOpacity style={nextBtn} onPress={()=>navigation.replace("Home")}>
        <Text style={btnText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 20
  },
  coverImg: {
    width: 330,
    height: 440,
  },
  mainText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#24252C"
  },
  subContainer: {
    width: "90%",
    alignItems:"center"
  },
  subText:{
    fontSize:20,
    color:"#6E6A7C"
  },
  nextBtn:{
    width:"75%",
    height:60,
    backgroundColor:"#5F33E1",
    borderRadius:20,
    justifyContent:"center",
    alignItems:"center"
  },
  btnText:{
    fontSize:22,
    color:"#ffffffff",
    fontWeight:"bold"
  }
})