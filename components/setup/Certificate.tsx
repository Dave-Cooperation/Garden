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
import { certifications as certificationLevels } from "../../constants/certifications";

type Certificate = {
  title: string;
  level: string;
  institute: string;
};

export const Certifications = ({
  setCertifications,
}: {
  setCertifications: (val: Certificate[]) => void;
}) => {
  const [title, setTitle] = useState("");
  const [institute, setInstitute] = useState("");
  const [level, setLevel] = useState<string | null>(null);
  const [certList, setCertList] = useState<Certificate[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const glowColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#03DAC655", "#03DAC6"],
  });

  const handleAdd = () => {
    if (title && institute && level) {
      const cert: Certificate = { title, institute, level };
      setCertList((prev) => [...prev, cert]);
      setTitle("");
      setInstitute("");
      setLevel(null);
    }
  };

  const handleRemove = (index: number) => {
    setCertList((prev) => prev.filter((_, i) => i !== index));
  };
  type AuthNav = NativeStackNavigationProp<AuthStackParamList>
            const navigation = useNavigation<AuthNav>()
            function handleContinue(){
              setCertifications(certList);
              navigation.navigate('Certificate')
            }
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.Text
        style={[
          styles.header,
          {
            textShadowColor: glowColor,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
            color: glowColor,
          },
        ]}
      >
        What are your qualifications?
      </Animated.Text>

      <Text style={styles.label}>Certification Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Teaching Diploma"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Institute</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Cambridge University"
        placeholderTextColor="#888"
        value={institute}
        onChangeText={setInstitute}
      />

      <Text style={styles.label}>Select Level</Text>
      <TouchableOpacity
        style={styles.dropdownToggle}
        onPress={() => setDropdownOpen(!dropdownOpen)}
      >
        <Text style={styles.dropdownToggleText}>
          {level || "Choose level..."}
        </Text>
        <Text style={styles.dropdownArrow}>{dropdownOpen ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {dropdownOpen && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.dropdownScroll}>
            {certificationLevels.map((lvl) => (
              <TouchableOpacity
                key={lvl}
                style={styles.dropdownItem}
                onPress={() => {
                  setLevel(lvl);
                  setDropdownOpen(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{lvl}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {title && institute && level && (
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add Certificate</Text>
        </TouchableOpacity>
      )}

      {certList.length > 0 && (
        <>
          <Text style={[styles.label, { marginTop: 30 }]}>Your Certificates</Text>
          {certList.map((cert, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listItemText}>
                {cert.title} - {cert.level} - {cert.institute}
              </Text>
              <TouchableOpacity onPress={() => handleRemove(index)}>
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      )}

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
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
    marginBottom: 15,
  },
  dropdownToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: 300,
    marginBottom: 10,
  },
  dropdownToggleText: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
  },
  dropdownArrow: {
    color: "#03DAC6",
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: "#1e1e1e",
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    width: 300,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    color: "#fff",
    fontSize: 15,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "#03DAC6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  addButtonText: {
    color: "#121212",
    fontWeight: "bold",
    fontSize: 15,
  },
  listItem: {
    backgroundColor: "#1e1e1e",
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 10,
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemText: {
    color: "#fff",
    fontSize: 16,
  },
  removeButtonText: {
    color: "#FF5C5C",
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 8,
    paddingRight: 8,
  },
  continueButton: {
    marginTop: 40,
    backgroundColor: "#03DAC6",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#121212",
    fontWeight: "bold",
    fontSize: 16,
  },
});
