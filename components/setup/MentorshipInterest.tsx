import { AuthStackParamList } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * MentorshipInterest component for teachers to indicate their interest in mentorship.
 * @param {{ mentorshipInterest: boolean, setMentorshipInterest: (val: boolean) => void }} props - The component props.
 */
export const MentorshipInterest = ({
  mentorshipInterest,
  setMentorshipInterest,
}: {
  mentorshipInterest: boolean;
  setMentorshipInterest: (val: boolean) => void;
}) => {
  // We no longer need an internal `isInterested` state as the prop directly controls the UI.
  // The `mentorshipInterest` prop is the source of truth.

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

  const handleYes = () => {
    setMentorshipInterest(true);
  };

  const handleNo = () => {
    setMentorshipInterest(false);
  };

  type AuthNav = NativeStackNavigationProp<AuthStackParamList>
              const navigation = useNavigation<AuthNav>()
              function handleContinue(){
                navigation.navigate('AvailableTimeSlots')
              }

  return (
    <View style={mentorshipStyles.container}>
      <Animated.Text
        style={[
          mentorshipStyles.header,
          {
            textShadowColor: glowColor,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
            color: glowColor,
          },
        ]}
      >
        Are you interested in mentorship?
      </Animated.Text>

      <View style={mentorshipStyles.buttonContainer}>
        <TouchableOpacity
          style={[
            mentorshipStyles.choiceButton,
            mentorshipInterest === true && mentorshipStyles.choiceButtonActive,
          ]}
          onPress={handleYes}
        >
          <Text style={[
            mentorshipStyles.choiceButtonText,
            mentorshipInterest === true && mentorshipStyles.choiceButtonTextActive,
          ]}>
            Yes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            mentorshipStyles.choiceButton,
            mentorshipInterest === false && mentorshipStyles.choiceButtonActive,
          ]}
          onPress={handleNo}
        >
          <Text style={[
            mentorshipStyles.choiceButtonText,
            mentorshipInterest === false && mentorshipStyles.choiceButtonTextActive,
          ]}>
            No
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={mentorshipStyles.continueButton} onPress={handleContinue}>
        <Text style={mentorshipStyles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const mentorshipStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 30,
  },
  choiceButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#1e1e1e",
    borderColor: "#444",
    width: '45%', // Adjust width for two buttons
    alignItems: 'center',
  },
  choiceButtonActive: {
    backgroundColor: "#03DAC6",
    borderColor: "#03DAC6",
  },
  choiceButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  choiceButtonTextActive: {
    color: "#121212",
  },
  continueButton: {
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
