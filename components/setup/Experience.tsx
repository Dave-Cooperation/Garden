import { AuthStackParamList } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type ExperienceType = {
  company: string;
  duration: number;
};

export const Experience = ({
  teachingExperience,
  setTeachingExperience,
  setLoadingReady,
}: {
  teachingExperience: ExperienceType[];
  setTeachingExperience: (val: ExperienceType[]) => void;
  setLoadingReady: (value : boolean) => void
}) => {
  const [company, setCompany] = useState("");
  const [duration, setDuration] = useState("");

  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const interpolatedShadow = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0px 0px 2px #03DAC6", "0px 0px 12px #03DAC6"],
  });

  const addExperience = () => {
    if (company && duration) {
      setTeachingExperience([
        ...teachingExperience,
        { company, duration: parseInt(duration) },
      ]);
      setCompany("");
      setDuration("");
    }
  };

  const removeExperience = (index: number) => {
    const updated = teachingExperience.filter((_, i) => i !== index);
    setTeachingExperience(updated);
  };


  type AuthNav = NativeStackNavigationProp<AuthStackParamList>
              const navigation = useNavigation<AuthNav>()
              function onContinue(){
                navigation.navigate('LoadingScreen')
                setLoadingReady(true)
              }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.Text
        style={[
          styles.glowText,
          {
            textShadowColor: "#03DAC6",
            textShadowRadius: glowAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [5, 20],
            }),
          },
        ]}
      >
        What Experiences do you have?
      </Animated.Text>

      <TextInput
        style={styles.input}
        placeholder="Company"
        placeholderTextColor="#888"
        value={company}
        onChangeText={setCompany}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (months)"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      <TouchableOpacity style={styles.addButton} onPress={addExperience}>
        <Text style={styles.addButtonText}>Add Experience</Text>
      </TouchableOpacity>

      <View style={styles.listContainer}>
        {teachingExperience.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.experienceText}>
              {exp.company} — {exp.duration} months
            </Text>
            <TouchableOpacity onPress={() => removeExperience(index)}>
              <Text style={styles.removeButton}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 35,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent : "center",
    flexGrow: 1,
  },
  glowText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#03DAC6",
    textAlign: "center",
    marginBottom: 30,
    textShadowColor: "#03DAC6",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    width: 300,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#03DAC6",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#121212",
    fontWeight: "bold",
    fontSize: 16,
  },
  listContainer: {
    width: "100%",
    alignItems: "center",
  },
  experienceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    width: 300,
    marginBottom: 10,
  },
  experienceText: {
    color: "#fff",
    fontSize: 15,
  },
  removeButton: {
    color: "#f55",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },
  continueButton: {
    marginTop: 40,
    backgroundColor: "#121212",
    borderColor: "#03DAC6",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#03DAC6",
    fontWeight: "bold",
    fontSize: 16,
  },
});
