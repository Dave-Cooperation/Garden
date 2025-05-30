import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AuthStackParamList } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { subjects } from "../../constants/subjects";

export const CoursesForStudents = ({
  setCourses,
  courses,
}: {
  setCourses: (val: string[]) => void;
  courses: string[];
}) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [courseList, setCourseList] = useState<string[]>([]);
  const [fieldDropdownOpen, setFieldDropdownOpen] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);

  const fields = Object.keys(subjects);
  const coursesInField = selectedField ? (subjects as any)[selectedField] : [];

  const handleAdd = () => {
    if (selectedCourse && !courseList.includes(selectedCourse)) {
      setCourseList([...courseList, selectedCourse]);
    }
    setSelectedCourse(null);
    setCourseDropdownOpen(false);
  };

  const handleRemove = (course: string) => {
    setCourseList(courseList.filter((item) => item !== course));
  };

  type AuthNav = NativeStackNavigationProp<AuthStackParamList>
          const navigation = useNavigation<AuthNav>()
          function handleContinue(){
          setCourses(courseList);
          navigation.navigate('LearningStyle')
          }


  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Gradient Header */}
      <MaskedView
        maskElement={<Text style={styles.gradientText}>Select Your Courses</Text>}
      >
        <LinearGradient
          colors={["#2196F3", "#FF5722"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.gradientText, { opacity: 0 }]}>
            Select Your Courses
          </Text>
        </LinearGradient>
      </MaskedView>

      <Text style={styles.label}>Select Subject Field</Text>

      <TouchableOpacity
        style={styles.dropdownToggle}
        onPress={() => setFieldDropdownOpen(!fieldDropdownOpen)}
      >
        <Text style={styles.dropdownToggleText}>
          {selectedField || "Choose field..."}
        </Text>
        <Text style={styles.dropdownArrow}>{fieldDropdownOpen ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {fieldDropdownOpen && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.dropdownScroll}>
            {fields.map((field) => (
              <TouchableOpacity
                key={field}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedField(field);
                  setSelectedCourse(null);
                  setFieldDropdownOpen(false);
                  setCourseDropdownOpen(false);
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
          <Text style={styles.label}>Select Course</Text>
          <TouchableOpacity
            style={styles.dropdownToggle}
            onPress={() => setCourseDropdownOpen(!courseDropdownOpen)}
          >
            <Text style={styles.dropdownToggleText}>
              {selectedCourse || "Choose course..."}
            </Text>
            <Text style={styles.dropdownArrow}>
              {courseDropdownOpen ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>

          {courseDropdownOpen && (
            <View style={styles.dropdown}>
              <ScrollView style={styles.dropdownScroll}>
                {coursesInField.map((course) => (
                  <TouchableOpacity
                    key={course}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedCourse(course);
                      setCourseDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{course}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {selectedCourse && (
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addButtonText}>Add Course</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {courseList.length > 0 && (
        <>
          <Text style={[styles.label, { marginTop: 30 }]}>Your Courses</Text>
          {courseList.map((item) => (
            <View key={item} style={styles.listItem}>
              <Text style={styles.listItemText}>{item}</Text>
              <TouchableOpacity onPress={() => handleRemove(item)}>
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
  gradientText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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
    backgroundColor: "#121212",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#03DAC6",
  },
  continueButtonText: {
    color: "#03DAC6",
    fontWeight: "bold",
    fontSize: 16,
  },
});
