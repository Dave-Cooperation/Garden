import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { subjects } from "../../constants/subjects";

import { AuthStackParamList } from "@/types";
import MaskedView from "@react-native-masked-view/masked-view";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

export const TeachingSubjects = ({
  setTeachingSubjects,
}: {
  setTeachingSubjects: (val: string[]) => void;
}) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [fieldDropdownOpen, setFieldDropdownOpen] = useState(false);
  const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);
  const [tempSubjects, setTempSubjects] = useState<string[]>([]);

  const handleAddSubject = () => {
    if (selectedSubject && !tempSubjects.includes(selectedSubject)) {
      setTempSubjects([...tempSubjects, selectedSubject]);
    }
  };

  const handleRemoveSubject = (subjectToRemove: string) => {
    setTempSubjects(tempSubjects.filter((subj) => subj !== subjectToRemove));
  };

  type AuthNav = NativeStackNavigationProp<AuthStackParamList>
              const navigation = useNavigation<AuthNav>()
              function handleContinue(){
                setTeachingSubjects(tempSubjects);
                navigation.navigate('MentorshipInterest')
              }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Gradient Title */}
      <MaskedView
        maskElement={
          <Text style={styles.gradientText}>What do you teach?</Text>
        }
      >
        <LinearGradient
          colors={["#2196F3", "#FF5722"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.gradientText, { opacity: 0 }]}>
            What do you teach?
          </Text>
        </LinearGradient>
      </MaskedView>

      <Text style={styles.label}>Select Subject Field</Text>

      <TouchableOpacity
        style={styles.dropdownToggle}
        onPress={() => setFieldDropdownOpen(!fieldDropdownOpen)}
      >
        <Text style={styles.dropdownToggleText}>
          {selectedField || "Choose a field..."}
        </Text>
        <Text style={styles.dropdownArrow}>
          {fieldDropdownOpen ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>

      {fieldDropdownOpen && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.dropdownScroll}>
            {Object.keys(subjects).map((field) => (
              <TouchableOpacity
                key={field}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedField(field);
                  setSelectedSubject(null);
                  setFieldDropdownOpen(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{field}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {selectedField && (
        <>
          <Text style={styles.label}>Select Subject</Text>

          <TouchableOpacity
            style={styles.dropdownToggle}
            onPress={() => setSubjectDropdownOpen(!subjectDropdownOpen)}
          >
            <Text style={styles.dropdownToggleText}>
              {selectedSubject || "Choose a subject..."}
            </Text>
            <Text style={styles.dropdownArrow}>
              {subjectDropdownOpen ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>

          {subjectDropdownOpen && (
            <View style={styles.dropdown}>
              <ScrollView style={styles.dropdownScroll}>
                {subjects[selectedField].map((subject) => (
                  <TouchableOpacity
                    key={subject}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedSubject(subject);
                      setSubjectDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{subject}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddSubject}
          >
            <Text style={styles.addButtonText}>Add Subject</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={[styles.label, { marginTop: 30 }]}>Selected Subjects:</Text>

      <View style={styles.subjectList}>
        {tempSubjects.map((subj) => (
          <View key={subj} style={styles.subjectItem}>
            <Text style={styles.subjectText}>• {subj} </Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveSubject(subj)}
            >
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
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
    justifyContent: "center",
    alignItems: "center",
  },
  gradientText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
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
    marginBottom: 10,
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
    backgroundColor: "#03DAC6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  addButtonText: {
    color: "#121212",
    fontWeight: "bold",
    fontSize: 16,
  },
  subjectList: {
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  subjectItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 5,
    borderColor: "#444",
    borderWidth: 1,
  },
  subjectText: {
    color: "#fff",
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 10,
  },
  removeButtonText: {
    color: "#FF5C5C",
    fontSize: 30,
    fontWeight: "bold",
  },
  continueButton: {
    marginTop: 30,
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
