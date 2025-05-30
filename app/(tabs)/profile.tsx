import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebaseConfig';



const ProfileScreen = () => {


  type Experience = {
  company: string;
  duration: number;
};

type Certificate = {
  title: string;
  level: string;
  institute: string;
};

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await AsyncStorage.getItem('profile');
        setProfile(profileData ? JSON.parse(profileData) : null);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['user', 'profile']);
      await signOut(auth);
      router.push('/(auth)');
    } catch (error) {
      Alert.alert('Logout Failed', 'Something went wrong during logout.');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#246bfd" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No profile data found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>{profile.fullName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Role:</Text>
        <Text style={styles.value}>{profile.role}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>School:</Text>
        <Text style={styles.value}>{profile.school}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Country:</Text>
        <Text style={styles.value}>{profile.country}</Text>
      </View>

      {profile.role === 'student' && (
        <>
          <View style={styles.section}>
            <Text style={styles.label}>Class Level:</Text>
            <Text style={styles.value}>{profile.classLevel}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Learning Style:</Text>
            <Text style={styles.value}>{profile.preferredLearningStyle}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Interests:</Text>
            <Text style={styles.value}>{profile.interests?.join(', ')}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Courses:</Text>
            <Text style={styles.value}>{profile.courses?.join(', ')}</Text>
          </View>
        </>
      )}

      {profile.role === 'teacher' && (
        <>
          <View style={styles.section}>
            <Text style={styles.label}>Teaching Style:</Text>
            <Text style={styles.value}>{profile.teachingStyle}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Subjects:</Text>
            <Text style={styles.value}>{profile.teachingSubjects?.join(', ')}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Certifications:</Text>
            <Text style={styles.value}>{profile.certifications?.map( (c : Certificate) => `${c.title} (${c.level}) - ${c.institute}`).join(', ')}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Experience:</Text>
            <Text style={styles.value}>{profile.teachingExperience?.map((e : Experience) => `${e.company} (${e.duration} yrs)`).join(', ')}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Available Time Slots:</Text>
            <Text style={styles.value}>{profile.availableTimeSlots?.join(', ')}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Mentorship Interest:</Text>
            <Text style={styles.value}>{profile.mentorshipInterest ? 'Yes' : 'No'}</Text>
          </View>
        </>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  content: {
    padding: 24,
  },
  centered: {
    flex: 1,
    backgroundColor: '#181A20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
  },
  value: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
  errorText: {
    color: 'red',
  },
  logoutButton: {
    marginTop: 32,
    backgroundColor: '#e74c3c',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
