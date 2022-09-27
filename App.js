import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as ImageManipulator from 'expo-image-manipulator';

export default function App() {
  // app state to hold the image value
  const [selectedImage, setSelectedImage] = useState(null);

  // === Handles picking an image from device photo gallery
  let openImagePickerAsync = async () => {
    let pickerResults = await ImagePicker.launchImageLibraryAsync();

    if (pickerResults.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResults.uri });
  };

  // === Handles sharing the image with others users
  let openShareDialogAsync = async () => {
    // Sharing the image on a web browser is not available at the moment
    if (Platform.OS === 'web') {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    // Uses the image manipulator to select the image learn more here:
    //https://docs.expo.dev/versions/latest/sdk/imagemanipulator/
    const imageTmp = await ImageManipulator.manipulateAsync(
      selectedImage.localUri
    );
    await Sharing.shareAsync(imageTmp.uri);
  };

  // === If an image is selected this will render instead
  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity
          style={[styles.button, { marginVertical: 10 }]}
          onPress={openShareDialogAsync}
        >
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={logo} style={styles.logo} />

      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10
  },
  button: {
    backgroundColor: 'royalblue',
    padding: 20,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain'
  }
});
