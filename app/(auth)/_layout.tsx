// screens/auth/AuthLayout.tsx

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';

import { AvailableTimeSlots } from '@/components/setup/AvailableTimeSlots';
import { Certifications } from '@/components/setup/Certificate';
import { ClassLevel } from '@/components/setup/ClassLevel';
import { CoursesForStudents } from '@/components/setup/CoursesForStudents';
import { Experience } from '@/components/setup/Experience';
import { Interests } from '@/components/setup/Interests';
import { LearningStyle } from '@/components/setup/LearningStyle';
import { MentorshipInterest } from '@/components/setup/MentorshipInterest';
import { NameAndPicture } from '@/components/setup/NameAndPicture';
import { Role } from '@/components/setup/Role';
import { School } from '@/components/setup/Schools';
import { TeachingStyle } from '@/components/setup/TeachingStyle';
import { TeachingSubjects } from '@/components/setup/TeachingSubjects';
import WelcomeScreen, { LoadingScreen } from './finish_setup';

import type { AuthStackParamList } from '@/types';
import SignupScreen from './index';
import LoginScreen from './login';

const Tab = createMaterialTopTabNavigator<AuthStackParamList>();

type ExperienceItem = { company: string; duration: number };
type CertificateItem = { title: string; level: string; institute: string };

const AuthLayout = () => {
  // Common fields
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [fullName, setFullName] = useState<string>('');
  const [school, setSchool] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [curriculum, setCurriculum] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [createdAt] = useState<Date>(new Date());

  // Teacher fields
  const [teachingSubjects, setTeachingSubjects] = useState<string[]>([]);
  const [teachingExperience, setTeachingExperience] = useState<ExperienceItem[]>([]);
  const [certifications, setCertifications] = useState<CertificateItem[]>([]);
  const [teachingStyle, setTeachingStyle] = useState<string>('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [mentorshipInterest, setMentorshipInterest] = useState<boolean>(false);

  // Student fields
  const [interests, setInterests] = useState<string[]>([]);
  const [classLevel, setClassLevel] = useState<string>('');
  const [preferredLearningStyle, setPreferredLearningStyle] = useState<string>('');
  const [courses, setCourses] = useState<string[]>([]);

  const [loadingReady , setLoadingReady] = useState(false)
  const [welcomeReady, setWelcomeReady] = useState(false)
  // Screen wrappers
  const RoleScreen = () => (
    <Role role={role}   setRole={setRole} />
  );
  const NameAndPictureScreen = () => (
    <NameAndPicture
      fullName={fullName}
      profilePicture={profilePicture}
      setFullName={setFullName}
      setProfilePicture={setProfilePicture}
    />
  );
  const SchoolScreen = () => (
    <School
      setSchool={setSchool}
      setCountry={setCountry}
      setCurriculum={setCurriculum}
    />
  );
  const CertificationScreen = () => (
    <Certifications setCertifications={setCertifications} />
  );
  const ExperienceScreen = () => (
    <Experience
      teachingExperience={teachingExperience}
      setTeachingExperience={setTeachingExperience}
      setLoadingReady={setLoadingReady}
    />
  );
  const TeachingSubjectsScreen = () => (
    <TeachingSubjects setTeachingSubjects={setTeachingSubjects} />
  );
  const CoursesScreen = () => (
    <CoursesForStudents setCourses={setCourses} courses={courses} />
  );
  const TeachingStyleScreen = () => (
    <TeachingStyle
      setTeachingStyle={setTeachingStyle}
    />
  );
  const AvailableTimeSlotsScreen = () => (
    <AvailableTimeSlots
      setAvailableTimeSlots={setAvailableTimeSlots}
      availableTimeSlots={availableTimeSlots}
    />
  );
  const MentorshipScreen = () => (
    <MentorshipInterest
      mentorshipInterest={mentorshipInterest}
      setMentorshipInterest={setMentorshipInterest}
    />
  );
  const InterestsScreen = () => (
    <Interests  setInterests={setInterests} setLoadingReady={setLoadingReady} />
  );
  const ClassLevelScreen = () => (
    <ClassLevel classLevel={classLevel} setClassLevel={setClassLevel} />
  );
  const LearningStyleScreen = () => (
    <LearningStyle
      preferredLearningStyle={preferredLearningStyle}
      setPreferredLearningStyle={setPreferredLearningStyle}
    />
  );
  const LoadingScreenWrapper = () => (
    <LoadingScreen
      role={role}
      fullName={fullName}
      school={school}
      country={country}
      curriculum={curriculum}
      profilePicture={profilePicture}
      createdAt={createdAt}
      teachingSubjects={teachingSubjects}
      teachingExperience={teachingExperience}
      certifications={certifications}
      teachingStyle={teachingStyle}
      availableTimeSlots={availableTimeSlots}
      mentorshipInterest={mentorshipInterest}
      interests={interests}
      classLevel={classLevel}
      preferredLearningStyle={preferredLearningStyle}
      courses={courses}
      setWelcomeReady={setWelcomeReady}
      loadingReady = {loadingReady}
    />

  )


  const WelcomeScreenWrapper = () => {
  
  return <WelcomeScreen welcomeReady= {welcomeReady}  />
}
  
  
  

  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
        animationEnabled: true,
        tabBarStyle: { display: 'none' },
      }}
    >
      

      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="SignUp" component={SignupScreen} />
      <Tab.Screen name="NameAndPicture" component={NameAndPictureScreen} />
      <Tab.Screen name="School" component={SchoolScreen} />
      <Tab.Screen name="Role" component={RoleScreen} />

      {role === 'student' ?
      <>
      <Tab.Screen name="ClassLevel" component={ClassLevelScreen} />
      <Tab.Screen name="CoursesForStudents" component={CoursesScreen} />
      <Tab.Screen name="LearningStyle" component={LearningStyleScreen} />
      <Tab.Screen name="Interests" component={InterestsScreen} />
      <Tab.Screen name = "LoadingScreen" component={LoadingScreenWrapper}/>
      <Tab.Screen name = 'WelcomeScreen' component={WelcomeScreenWrapper}/>
      </>
      :
        <>
      <Tab.Screen name="TeachingStyle" component={TeachingStyleScreen} />
      <Tab.Screen name="TeachingSubjects" component={TeachingSubjectsScreen} />
      <Tab.Screen name="Certificate" component={CertificationScreen} />
      <Tab.Screen name="MentorshipInterest" component={MentorshipScreen} />
      <Tab.Screen name="AvailableTimeSlots" component={AvailableTimeSlotsScreen} />
      <Tab.Screen name="Experiences" component={ExperienceScreen} />
      <Tab.Screen name = "LoadingScreen" component={LoadingScreenWrapper}/>
      <Tab.Screen name = 'WelcomeScreen' component={WelcomeScreenWrapper}/>
      
        </>
       }

      

      
      
      
      
      
    </Tab.Navigator>
  );
};

export default AuthLayout;
