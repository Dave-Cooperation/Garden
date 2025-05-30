import { AuthStackParamList } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

export const NameAndPicture = ({
  setFullName,
  setProfilePicture,
  fullName,
  profilePicture,
}: {
  setFullName: (val: string) => void;
  setProfilePicture: (val: string | null) => void;
  fullName: string;
  profilePicture: string | null;
}) => {
  const animation = useRef(new Animated.Value(0)).current;
  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const animatedColor = animation.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ["#03DAC6", "#9C27B0", "#2196F3", "#FF5722", "#03DAC6"],
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const image = result.assets[0];

      const resized = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: 300, height: 300 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );

      setProfilePicture(resized.uri);

      const info = await FileSystem.getInfoAsync(resized.uri);
      if (info.exists && info.size != null) {
        const kb = info.size / 1024;
        const formattedSize =
          kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(2)} MB`;
        console.log("Image Size:", formattedSize);
      }
    }
  };

  type AuthNav = NativeStackNavigationProp<AuthStackParamList>;
  const navigation = useNavigation<AuthNav>();

  function onContinue() {
    setFullName(inputValue);
    navigation.navigate("School");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <Text style={[styles.label, { marginTop: 10 }]}>Upload Profile Picture</Text>
      <TouchableOpacity style={styles.pictureBox} onPress={pickImage}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Tap to upload</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>What is your name?</Text>
      <Animated.View style={[styles.animatedBorder, { borderColor: animatedColor }]}>
        <TextInput
          style={styles.textInput}
          placeholder="Full Name"
          placeholderTextColor="#888"
          value={inputValue}
          onChangeText={(text) => {
            setInputValue(text);
          }}
        />
      </Animated.View>

      <Animated.View style={[styles.glowButtonWrapper, { borderColor: animatedColor }]}>
        <TouchableOpacity style={styles.glowButton} onPress={onContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 35,
    backgroundColor: "#121212",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  label: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 75,
  },
  animatedBorder: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 2,
  },
  textInput: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    width: 300,
  },
  pictureBox: {
    width: 300,
    height: 300,
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
  imagePlaceholder: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
  },
  glowButtonWrapper: {
    marginTop: 30,
    borderWidth: 2,
    borderRadius: 10,
    padding: 2,
  },
  glowButton: {
    backgroundColor: "#1e1e1e",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    width: 200,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
