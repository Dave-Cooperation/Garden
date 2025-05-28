import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { School } from '../../components/setup/Schools';
import type { AuthStackParamList } from '../../types';
import SignupScreen from './index';
import LoginScreen from './login';



const Tab = createMaterialTopTabNavigator<AuthStackParamList>();

const AuthLayout = () => {
  // Common fields
  const [role, setRole] = useState<'student' | 'teacher'>('student')
  const [fullName, setFullName] = useState<string>('')
  const [school, setSchool] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [curriculum, setCurriculum] = useState<string>('')
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [createdAt, setCreatedAt] = useState<Date>(new Date())
  
  // Teacher fields
  const [teachingSubjects, setTeachingSubjects] = useState<string[]>([])
  const [teachingExperience, setTeachingExperience] = useState<string>('')
  const [teacherLevel, setTeacherLevel] = useState<string>('')
  const [certifications, setCertifications] = useState<string[]>([])
  const [teachingStyle, setTeachingStyle] = useState<string>('')
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])
  const [mentorshipInterest, setMentorshipInterest] = useState<boolean>(false)
  
  // Student fields
  const [interests, setInterests] = useState<string[]>([])
  const [classLevel, setClassLevel] = useState<string>('')
  const [preferredLearningStyle, setPreferredLearningStyle] = useState<string>('')
  const [studyGoals, setStudyGoals] = useState<string>('')
  const [dailyStudyTime, setDailyStudyTime] = useState<string>('')
  const [examPrepFocus, setExamPrepFocus] = useState<string[]>([])


  const SchoolScreen = () => {
  return <School setCountry={setCountry} setCurriculum = {setCurriculum} setSchool={setSchool} />;
}


  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
        animationEnabled: true,
        tabBarStyle: { display: 'none' },
       
      }}
    >
      <Tab.Screen name='School' component = {SchoolScreen} />
      <Tab.Screen name="SignUp" component={SignupScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
     
    </Tab.Navigator>
  );
};

export default AuthLayout;
