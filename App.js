import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';

import { AppNavigator } from './src/navigator/AppNavigator';
import { store } from './src/store/store';
// import {collectionRest, FirebaseDB } from './src/firebase/config'
// import {ultimateRestaurants} from './src/Contansts/json'
// import { doc, setDoc } from 'firebase/firestore/lite';

// ultimateRestaurants.forEach((document)=>{
//   const docRef = doc(collectionRest)
//   setDoc(docRef,document)
//   .then(() => console.log('Document added to collection'))
//   .catch((error) => console.error('Error adding document: ', error));
// })


export default function App() {


  return (
    <Provider store={store}>
     <NavigationContainer>
      <AppNavigator />
     </NavigationContainer>
     </Provider>
  );
}

