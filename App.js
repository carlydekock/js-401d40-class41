import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.topText}>Snap A Picture!</Text>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 30,
    borderWidth: 10,
    borderRadius: 50,
    borderColor: 'gray',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText: {
    fontWeight: 'bold',
    paddingBottom: 10,
    fontSize: 20,
  },
  camera: {
    width: '75%',
    height: '75%',
  },
  button: {
    height: 40,
    width: 80,
    backgroundColor: 'lightcoral',
    alignItems: 'center',
    justifyContent: 'center',
  }

});
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, Button, FlatList, Linking } from 'react-native';

// // expo requires that we install these via the command line
// import * as Permissions from 'expo-permissions';
// import * as Contacts from 'expo-contacts';

// export default function App() {

//   const [contacts, setContacts] = useState([]);
//   const [permissions, setPermissions] = useState(false);

//   const getPermissions = async () => {
//     const { status } = await Permissions.askAsync(Permissions.CONTACTS);
//     setPermissions(true);
//   }

//   const showContacts = async () => {
//     const contactList = await Contacts.getContactsAsync();
//     console.log(contactList);
//     setContacts(contactList.data);
//   }

//   const call = (contact) => {
//     let phoneNumber = contact.phoneNumbers[0].number.replace(/[\(\)\-\s+]/g, '');
//     let link = `tel:${phoneNumber}`;
//     Linking.canOpenURL(link)
//       .then(() => Linking.openURL(link));
//   }

//   useEffect(() => {
//     // if (permissions) {
//     //   showContacts();
//     // } else {
//     getPermissions();
//     // }
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Button
//         onPress={showContacts}
//         title="Press to see contacts"
//       />
//       <View>
//         <Text>Contacts</Text>
//         <FlatList
//           data={contacts}
//           keyExtractor={item => item.id}
//           renderItem={({ item }) => <Button title={item.name} onPress={() => call(item)} />}
//         />
//       </View>
//       {/* <Text style={styles.text}>New Stuff!</Text>
//       <Text style={styles.largerText}>More text</Text> */}
//     </View>
//   );
// }
