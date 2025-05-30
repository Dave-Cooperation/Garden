import { AuthStackParamList } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const Role = ({
  role,
  setRole,
  
}: {
  role: "student" | "teacher";
  setRole: (val: "student" | "teacher") => void;
}) => {
  
  const [studentAnim] = useState(new Animated.Value(role === "student" ? 1 : 0));
  const [teacherAnim] = useState(new Animated.Value(role === "teacher" ? 1 : 0));

  const animateSelection = (target: "student" | "teacher") => {
    setRole(target);
    Animated.timing(target === "student" ? studentAnim : teacherAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
      easing: Easing.out(Easing.exp),
    }).start();
    Animated.timing(target === "student" ? teacherAnim : studentAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
      easing: Easing.out(Easing.exp),
    }).start();
  };

  const interpolateShadow = (anim: Animated.Value) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: ["#000", "#03DAC6"],
    });
    type AuthNav = NativeStackNavigationProp<AuthStackParamList>
      
      const navigation = useNavigation<AuthNav>()
     

  const onContinue = () => {
    if (role === 'student'){
      navigation.navigate('ClassLevel')

    }else{
      navigation.navigate('TeachingStyle')
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is your Role?</Text>

      <View style={styles.radioGroup}>
        {["student", "teacher"].map((item) => {
          const isSelected = role === item;
          const anim = item === "student" ? studentAnim : teacherAnim;

          return (
            <Animated.View
              key={item}
              style={[
                styles.radioButton,
                {
                  shadowColor: interpolateShadow(anim),
                  transform: [
                    {
                      scale: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.05],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.radioInner,
                  isSelected && styles.radioInnerSelected,
                ]}
                onPress={() => animateSelection(item as "student" | "teacher")}
              >
                <Text
                  style={[
                    styles.radioText,
                    isSelected && styles.radioTextSelected,
                  ]}
                >
                  {item.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  radioButton: {
    width: 140,
    height: 140,
    borderRadius: 16,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 12,
  },
  radioInner: {
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  radioInnerSelected: {
    backgroundColor: "#03DAC640",
  },
  radioText: {
    fontSize: 18,
    color: "#aaa",
    fontWeight: "600",
  },
  radioTextSelected: {
    color: "#03DAC6",
  },
  continueButton: {
    marginTop: 40,
    backgroundColor: "#03DAC6",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  continueText: {
    color: "#121212",
    fontWeight: "bold",
    fontSize: 16,
  },
});
