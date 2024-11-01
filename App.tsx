import GettingStartedScreen from './GettingStarted';
import ToDoScreen from './ToDoScreen';
import AddJob from './AddJob';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store';
import { RecoilRoot } from "recoil"

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    // <Provider store={store}>
    //   <NavigationContainer>
    //     <Stack.Navigator>
    //       <Stack.Screen
    //         name="GettingStarted"
    //         component={GettingStartedScreen}
    //         options={{ headerShown: false }}
    //       />
    //       <Stack.Screen name="ToDo" component={ToDoScreen} />
    //       <Stack.Screen name="AddJob" component={AddJob} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </Provider>
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="GettingStarted"
            component={GettingStartedScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ToDo" component={ToDoScreen} />
          <Stack.Screen name="AddJob" component={AddJob} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
