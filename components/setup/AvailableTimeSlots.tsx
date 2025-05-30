// components/setup/AvailableTimeSlots.tsx
import { AuthStackParamList } from "@/types";
import MaskedView from "@react-native-masked-view/masked-view";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const AvailableTimeSlots = ({
  availableTimeSlots,
  setAvailableTimeSlots,
}: {
  availableTimeSlots: string[];
  setAvailableTimeSlots: (val: string[]) => void;
}) => {
  const [slot, setSlot] = useState("");

  const handleAdd = () => {
    if (slot && !availableTimeSlots.includes(slot)) {
      setAvailableTimeSlots([...availableTimeSlots, slot]);
      setSlot("");
    }
  };

  const handleRemove = (s: string) => {
    setAvailableTimeSlots(availableTimeSlots.filter(x => x !== s));
  };

  type AuthNav = NativeStackNavigationProp<AuthStackParamList>
              const navigation = useNavigation<AuthNav>()
              function handleContinue(){
                navigation.navigate('Experiences')
              }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MaskedView maskElement={<Text style={styles.header}>Available Time Slots</Text>}>
        <LinearGradient colors={["#007CF0", "#FF4E00"]} start={{x:0,y:0}} end={{x:1,y:0}}>
          <Text style={[styles.header, { opacity: 0 }]}>Available Time Slots</Text>
        </LinearGradient>
      </MaskedView>

      <TextInput
        style={styles.input}
        placeholder="e.g. Mon 4–6pm"
        placeholderTextColor="#888"
        value={slot}
        onChangeText={setSlot}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add Slot</Text>
      </TouchableOpacity>

      {availableTimeSlots.map((s) => (
        <View key={s} style={styles.listItem}>
          <Text style={styles.listItemText}>{s}</Text>
          <TouchableOpacity onPress={() => handleRemove(s)}>
            <Text style={styles.removeText}>×</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={[styles.continueButton, { marginTop: availableTimeSlots.length ? 20 : 40 }]}
        onPress={() => {navigation.navigate('Experiences')}}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 35,
    backgroundColor: "#121212",
    flexGrow: 1,
    alignItems: "center",
    justifyContent : "center"
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    width: 300,
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#444",
  },
  addButton: {
    backgroundColor: "#03DAC6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#444",
    marginTop: 8,
  },
  listItemText: { color: "#fff", fontSize: 16 },
  removeText: { color: "#FF5C5C", fontSize: 20, fontWeight: "bold" },
  continueButton: {
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
