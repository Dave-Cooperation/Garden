import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { highSchools } from "../../constants/highschool";

export const School = ({
  setSchool,
  setCountry,
  setCurriculum,
}: {
  setSchool: (val: string) => void;
  setCountry: (val: string) => void;
  setCurriculum: (val: string) => void;
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [schoolDropdownOpen, setSchoolDropdownOpen] = useState(false);

  const countries = Object.keys(highSchools);
  const regions = selectedCountry ? Object.keys(highSchools[selectedCountry]) : [];
  const schoolsInRegion =
    selectedCountry && selectedRegion
      ? Object.entries(highSchools[selectedCountry][selectedRegion])
      : [];

  const handleContinue = () => {
    if (selectedCountry && selectedRegion && selectedSchool) {
      setSchool(selectedSchool);
      setCountry(selectedCountry);
      const curriculum =
        highSchools[selectedCountry][selectedRegion][selectedSchool]?.curriculum || "";
      setCurriculum(curriculum);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Select Your Country</Text>

      <TouchableOpacity
        style={styles.dropdownToggle}
        onPress={() => setCountryDropdownOpen(!countryDropdownOpen)}
      >
        <Text style={styles.dropdownToggleText}>
          {selectedCountry || "Select a country..."}
        </Text>
        <Text style={styles.dropdownArrow}>{countryDropdownOpen ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {countryDropdownOpen && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.dropdownScroll}>
            {countries.map((country) => (
              <TouchableOpacity
                key={country}
                style={[
                  styles.dropdownItem,
                  selectedCountry === country && styles.dropdownItemSelected,
                ]}
                onPress={() => {
                  setSelectedCountry(country);
                  setSelectedRegion(null);
                  setSelectedSchool("");
                  setCountryDropdownOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    selectedCountry === country && styles.dropdownItemTextSelected,
                  ]}
                >
                  {country}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {selectedCountry && (
        <>
          <Text style={styles.label}>Select Your Region</Text>
          <View style={styles.radioGroup}>
            {regions.map((region) => (
              <TouchableOpacity
                key={region}
                style={[
                  styles.radioButton,
                  selectedRegion === region && styles.radioButtonSelected,
                ]}
                onPress={() => {
                  setSelectedRegion(region);
                  setSelectedSchool("");
                  setSchoolDropdownOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.radioLabel,
                    selectedRegion === region && styles.radioLabelSelected,
                  ]}
                >
                  {region}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {selectedRegion && (
        <>
          <Text style={styles.label}>Select Your School</Text>

          <TouchableOpacity
            style={styles.dropdownToggle}
            onPress={() => setSchoolDropdownOpen(!schoolDropdownOpen)}
          >
            <Text style={styles.dropdownToggleText}>
              {selectedSchool || "Select a school..."}
            </Text>
            <Text style={styles.dropdownArrow}>{schoolDropdownOpen ? "▲" : "▼"}</Text>
          </TouchableOpacity>

          {schoolDropdownOpen && (
            <View style={styles.dropdown}>
              <ScrollView style={styles.dropdownScroll}>
                {schoolsInRegion.map(([schoolName, schoolObj]) => (
                  <TouchableOpacity
                    key={schoolName}
                    style={[
                      styles.dropdownItem,
                      schoolName === selectedSchool && styles.dropdownItemSelected,
                    ]}
                    onPress={() => {
                      setSelectedSchool(schoolName);
                      setSchoolDropdownOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        schoolName === selectedSchool &&
                          styles.dropdownItemTextSelected,
                      ]}
                    >
                      {schoolName}
                      {"\n"}
                      <Text style={{ color: "#aaa", fontSize: 13 }}>
                        {schoolObj.curriculum}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedSchool && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!selectedSchool}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 35,
    backgroundColor: "#121212",
    flexGrow: 1,
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButton: {
    backgroundColor: "#1e1e1e",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginVertical: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  radioButtonSelected: {
    backgroundColor: "#333",
    borderColor: "#03DAC6",
  },
  radioLabel: {
    color: "#aaa",
    fontSize: 14,
  },
  radioLabelSelected: {
    color: "#03DAC6",
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
    marginTop: 10,
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
    marginTop: 5,
    width: 300,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemSelected: {
    backgroundColor: "#333",
  },
  dropdownItemText: {
    color: "#fff",
    fontSize: 15,
  },
  dropdownItemTextSelected: {
    color: "#03DAC6",
    fontWeight: "600",
  },
  continueButton: {
    marginTop: 24,
    backgroundColor: "#03DAC6",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonDisabled: {
    backgroundColor: "#555",
  },
  continueButtonText: {
    color: "#121212",
    fontWeight: "bold",
    fontSize: 16,
  },
});
