import { AuthStackParamList } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Interests component for students to select their interests.
 * @param {{ setInterests: (val: string[]) => void }} props - The component props.
 */
export const Interests = ({ setInterests, setLoadingReady }: { setInterests: (val: string[]) => void; setLoadingReady : (val : boolean) => void }) => {
  const studentInterestsOptions = [
    "Science & Technology",
    "Arts & Culture",
    "Sports & Fitness",
    "Reading & Writing",
    "Gaming",
    "Music",
    "Travel",
    "Volunteering",
    "Debate",
    "Coding",
  ];

  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tempInterests, setTempInterests] = useState ([]);

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
    outputRange: ["#2196F355", "#2196F3"], // Using a different color for student sections
  });

  const handleAddInterest = () => {
    if (selectedInterest && !tempInterests.includes(selectedInterest)) {
      setTempInterests((prev) => [...prev, selectedInterest]);
      setSelectedInterest(null); // Clear selection after adding
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setTempInterests(tempInterests.filter((interest) => interest !== interestToRemove));
  };


    type AuthNav = NativeStackNavigationProp<AuthStackParamList>
              const navigation = useNavigation<AuthNav>()
              function handleContinue(){
              setInterests(tempInterests);
              navigation.navigate('LoadingScreen')
              setLoadingReady(true)

              }


  return (
    <ScrollView contentContainerStyle={interestsStyles.container}>
      <Animated.Text
        style={[
          interestsStyles.header,
          {
            textShadowColor: glowColor,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
            color: glowColor,
          },
        ]}
      >
        What are your interests?
      </Animated.Text>

      <Text style={interestsStyles.label}>Select an Interest</Text>
      <TouchableOpacity
        style={interestsStyles.dropdownToggle}
        onPress={() => setDropdownOpen(!dropdownOpen)}
      >
        <Text style={interestsStyles.dropdownToggleText}>
          {selectedInterest || "Choose an interest..."}
        </Text>
        <Text style={interestsStyles.dropdownArrow}>{dropdownOpen ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {dropdownOpen && (
        <View style={interestsStyles.dropdown}>
          <ScrollView style={interestsStyles.dropdownScroll}>
            {studentInterestsOptions.map((interest ) => (
              <TouchableOpacity
                key={interest}
                style={interestsStyles.dropdownItem}
                onPress={() => {
                  setSelectedInterest(interest);
                  setDropdownOpen(false);
                }}
              >
                <Text style={interestsStyles.dropdownItemText}>{interest}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {selectedInterest && (
        <TouchableOpacity style={interestsStyles.addButton} onPress={handleAddInterest}>
          <Text style={interestsStyles.addButtonText}>Add Interest</Text>
        </TouchableOpacity>
      )}

      {tempInterests.length > 0 && (
        <>
          <Text style={[interestsStyles.label, { marginTop: 30 }]}>Your Interests</Text>
          <View style={interestsStyles.interestList}>
            {tempInterests.map((interest, index) => (
              <View key={index} style={interestsStyles.listItem}>
                <Text style={interestsStyles.listItemText}>
                  {interest}
                </Text>
                <TouchableOpacity onPress={() => handleRemoveInterest(interest)}>
                  <Text style={interestsStyles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </>
      )}

      <TouchableOpacity style={interestsStyles.continueButton} onPress={handleContinue}>
        <Text style={interestsStyles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const interestsStyles = StyleSheet.create({
  container: {
    padding: 35,
    backgroundColor: "#121212",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
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
    color: "#2196F3", // Student accent color
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
    backgroundColor: "#2196F3", // Student accent color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  addButtonText: {
    color: "#121212",
    fontWeight: "bold",
    fontSize: 15,
  },
  interestList: {
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 10,
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
    backgroundColor: "#2196F3", // Student accent color
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
