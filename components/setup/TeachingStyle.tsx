// --- TeachingStyle Component ---
import { AuthStackParamList } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const teachingStylesOptions = [
  "Interactive & Participatory",
  "Lecture-Based",
  "Project-Based Learning",
  "Inquiry-Based Learning",
  "Collaborative Learning",
  "Differentiated Instruction",
  "Direct Instruction",
];

/**
 * TeachingStyle component for teachers to select their preferred teaching style.
 * @param {{ setTeachingStyle: (val: string) => void }} props - The component props.
 */
export const TeachingStyle = ({ setTeachingStyle }) => {
  const [selectedStyle, setSelectedStyle] = useState(null);
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

  type AuthNav = NativeStackNavigationProp<AuthStackParamList>
            const navigation = useNavigation<AuthNav>()
            function handleContinue(){
              setTeachingStyle(selectedStyle);
              navigation.navigate('TeachingSubjects')
              
            }
  

  return (
    <ScrollView contentContainerStyle={teachingStyleStyles.container}>
      <Animated.Text
        style={[
          teachingStyleStyles.header,
          {
            textShadowColor: glowColor,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
            color: glowColor,
          },
        ]}
      >
        What is your primary teaching style?
      </Animated.Text>

      <Text style={teachingStyleStyles.label}>Select Teaching Style</Text>
      <TouchableOpacity
        style={teachingStyleStyles.dropdownToggle}
        onPress={() => setDropdownOpen(!dropdownOpen)}
      >
        <Text style={teachingStyleStyles.dropdownToggleText}>
          {selectedStyle || "Choose a style..."}
        </Text>
        <Text style={teachingStyleStyles.dropdownArrow}>{dropdownOpen ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {dropdownOpen && (
        <View style={teachingStyleStyles.dropdown}>
          <ScrollView style={teachingStyleStyles.dropdownScroll}>
            {teachingStylesOptions.map((style) => (
              <TouchableOpacity
                key={style}
                style={teachingStyleStyles.dropdownItem}
                onPress={() => {
                  setSelectedStyle(style);
                  setDropdownOpen(false);
                }}
              >
                <Text style={teachingStyleStyles.dropdownItemText}>{style}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <TouchableOpacity style={teachingStyleStyles.continueButton} onPress={handleContinue}>
        <Text style={teachingStyleStyles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const teachingStyleStyles = StyleSheet.create({
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
