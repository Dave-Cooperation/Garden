import { app } from '@/firebaseConfig';
import { AuthStackParamList } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Dimensions, Easing, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');


type AuthNav = NativeStackNavigationProp<AuthStackParamList>;

type ExperienceItem = {
  company: string;
  duration: number;
};

type CertificateItem = {
  title: string;
  level: string;
  institute: string;
};

type Props = {
  role: 'student' | 'teacher';
  fullName: string;
  school: string;
  country: string;
  curriculum: string;
  profilePicture: string | null;
  createdAt: Date;
  teachingSubjects: string[];
  teachingExperience: ExperienceItem[];
  certifications: CertificateItem[];
  teachingStyle: string;
  availableTimeSlots: string[];
  mentorshipInterest: boolean;
  interests: string[];
  classLevel: string;
  preferredLearningStyle: string;
  courses: string[];
  setWelcomeReady : (val : boolean) => void;
  loadingReady : boolean;
};




















export  function LoadingScreen (props: Props) {
  const navigation = useNavigation<AuthNav>();

  const router = useRouter();
  const plantScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    if (props.loadingReady === true){
      Animated.timing(plantScale, {
      toValue: 1,
      duration: 5000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    const saveProfile = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const user = userData ? JSON.parse(userData) : null;

        if (!user || !user.email) return;

        const commonFields = {
          role: props.role,
          fullName: props.fullName,
          school: props.school,
          country: props.country,
          curriculum: props.curriculum,
          profilePicture: props.profilePicture,
          createdAt: props.createdAt.toISOString(),
        };

        const roleSpecificFields =
          props.role === 'student'
            ? {
                interests: props.interests,
                classLevel: props.classLevel,
                preferredLearningStyle: props.preferredLearningStyle,
                courses: props.courses,
              }
            : {
                teachingSubjects: props.teachingSubjects,
                teachingExperience: props.teachingExperience,
                certifications: props.certifications,
                teachingStyle: props.teachingStyle,
                availableTimeSlots: props.availableTimeSlots,
                mentorshipInterest: props.mentorshipInterest,
              };

        const db = getFirestore(app);
        const detailsRef = doc(
          collection(
            doc(collection(db, 'users'), user.email),
            'profile'
          ),
          'details'
        );

        const completeProfile = { ...commonFields, ...roleSpecificFields };
        await setDoc(detailsRef, completeProfile);
        await AsyncStorage.setItem('profile', JSON.stringify(completeProfile));
        props.setWelcomeReady(true)
        navigation.navigate('WelcomeScreen');
      } catch (error) {
        console.error('Error saving profile:', error);
      }
    };

    saveProfile();
    }

  }, [props.loadingReady]);


  return (
    <View style={styles1.container}>
      <Animated.View style={{ transform: [{ scale: plantScale }] }}>
        <Ionicons name="flower" size={64} color="#4ade80" style={styles1.icon} />
      </Animated.View>
      <ActivityIndicator size="large" color="#fb923c" />
      <Text style={styles1.text}>Sowing your seeds...</Text>
    </View>
  );
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    color: '#e0e0e0',
    fontSize: 18,
    fontStyle: 'italic',
  },
  icon: {
    marginBottom: 16,
  },
});



















export default function WelcomeScreen({ welcomeReady }: { welcomeReady: boolean }) {
  const navigation = useNavigation<AuthNav>();
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (welcomeReady && !hasRedirected) {
      setHasRedirected(true); // Set early to avoid multiple triggers

      Animated.timing(scaleAnim, {
        toValue: 2,
        duration: 6000,
        useNativeDriver: true,
      }).stop(  );

      setTimeout(()=> {
        router.push('/(tabs)');
      },6000)

      setTimeout(() => {
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]).start();
      }, 2000);
    }
  }, [welcomeReady, hasRedirected]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.textWrapper, { transform: [{ scale: scaleAnim }] }]}>  
        <MaskedView maskElement={<Text style={styles.welcomeText}>Welcome</Text>}>
          <LinearGradient
            colors={['#3b82f6', '#fb923c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientFill}
          />
        </MaskedView>
      </Animated.View>

      <Animated.View style={[styles.subTextWrapper, {
        opacity: opacityAnim,
        transform: [{ translateY: slideAnim }]
      }]}>
        <Text style={styles.subText}>
          Begin your journey with <Text style={styles.gardenText}>Garden</Text>
        </Text>
      </Animated.View>
    </View>
  );
}
















const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    marginBottom: 20,
  },
  gradientFill: {
    height: 60,
    width: 300,
  },
  welcomeText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'transparent',
  },
  subTextWrapper: {
    marginTop: 10,
    width: '100%'
  },
  subText: {
    fontSize: 20,
    color: '#e0e0e0',
    textAlign: 'center',
  },
  gardenText: {
    color: '#4ade80',
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
});
