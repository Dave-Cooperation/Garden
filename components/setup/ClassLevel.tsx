import { AuthStackParamList } from "@/types";
import MaskedView from "@react-native-masked-view/masked-view";
import { useNavigation } from "@react-navigation/native"; // Add this import
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const CLASS_LEVELS = [
  "Freshman", "Sophomore", "Junior",
  "Senior"
];

export const ClassLevel = ({
  classLevel,
  setClassLevel,
}: {
  classLevel: string;
  setClassLevel: (val: string) => void;
}) => {
  type AuthNav = NativeStackNavigationProp<AuthStackParamList>
          const navigation = useNavigation<AuthNav>()
          function onContinue(){
            navigation.navigate('CoursesForStudents')
          }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MaskedView maskElement={<Text style={styles.header}>Class Level</Text>}>
        <LinearGradient colors={["#007CF0", "#FF4E00"]} start={{x:0,y:0}} end={{x:1,y:0}}>
          <Text style={[styles.header, { opacity: 0 }]}>Class Level</Text>
        </LinearGradient>
      </MaskedView>

      {CLASS_LEVELS.map((lvl) => (
        <TouchableOpacity
          key={lvl}
          style={[
            styles.option,
            classLevel === lvl && { borderColor: "#03DAC6", backgroundColor: "#1e1e1e" },
          ]}
          onPress={() => setClassLevel(lvl)}
        >
          <Text
            style={[
              styles.optionText,
              classLevel === lvl && { color: "#03DAC6", fontWeight: "700" },
            ]}
          >
            {lvl}
          </Text>
        </TouchableOpacity>
      ))}

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
    flex: 1,
    alignItems: "center",
    justifyContent : 'center'
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    justifyContent : 'center'
  },
  option: {
    width: 300,
    padding: 14,
    backgroundColor: "#03DAC6",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "transparent",
  },
  optionText: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "600",
  },
  continueButton: {
    marginTop: 40,
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#03DAC6",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  continueButtonText: {
    color: "#03DAC6",
    fontSize: 16,
    fontWeight: "bold",
  },
});
