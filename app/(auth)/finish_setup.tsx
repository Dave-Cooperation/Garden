import React from 'react'
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'

// Example data arrays for dropdowns/radios
const roles = ['Student', 'Teacher']
const schools = ['High School A', 'High School B', 'High School C']
const countries = ['USA', 'Canada', 'UK']
const teacherLevels = ['Junior', 'Senior', 'Lead']
const subjects = ['Math', 'Science', 'English']
const certificationsList = ['Cert A', 'Cert B', 'Cert C']
const timeSlots = ['Morning', 'Afternoon', 'Evening']
const interestsList = ['Sports', 'Music', 'Art']
const curriculums = ['IB', 'AP', 'Local']
const classLevels = ['Freshman', 'Sophomore', 'Junior', 'Senior']
const learningStyles = ['Visual', 'Auditory', 'Kinesthetic']
const examPreps = ['SAT', 'ACT', 'None']

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: 'bold', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 12 },
  radioRow: { flexDirection: 'row', marginBottom: 12 },
  radioBtn: { marginRight: 16, padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 6 },
  radioBtnSelected: { backgroundColor: '#246bfd', borderColor: '#246bfd' },
  radioText: { color: '#000' },
  radioTextSelected: { color: '#fff' },
  multiBtn: { marginRight: 8, marginBottom: 8, padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 6 },
  multiBtnSelected: { backgroundColor: '#246bfd', borderColor: '#246bfd' },
  switchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
})

// Common Fields

export const Role = ({ role, setRole }: { role: string; setRole: (val: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Role</Text>
    <View style={styles.radioRow}>
      {roles.map(r => (
        <TouchableOpacity
          key={r}
          style={[styles.radioBtn, role === r && styles.radioBtnSelected]}
          onPress={() => setRole(r)}
        >
          <Text style={role === r ? styles.radioTextSelected : styles.radioText}>{r}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
) 

export const FullName = ({ fullName, setFullName }: { fullName: string; setFullName: (val: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Full Name</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter your full name"
      value={fullName}
      onChangeText={setFullName}
    />
  </View>
)

export const School = ({ school, setSchool }: { school: string; setSchool: (val: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.label}>School</Text>
    <View style={styles.radioRow}>
      {schools.map(s => (
        <TouchableOpacity
          key={s}
          style={[styles.radioBtn, school === s && styles.radioBtnSelected]}
          onPress={() => setSchool(s)}
        >
          <Text style={school === s ? styles.radioTextSelected : styles.radioText}>{s}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
)

export const Country = ({ country, setCountry }: { country: string; setCountry: (val: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Country</Text>
    <View style={styles.radioRow}>
      {countries.map(c => (
        <TouchableOpacity
          key={c}
          style={[styles.radioBtn, country === c && styles.radioBtnSelected]}
          onPress={() => setCountry(c)}
        >
          <Text style={country === c ? styles.radioTextSelected : styles.radioText}>{c}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
)

export const ProfilePicture = ({ profilePicture, setProfilePicture }: { profilePicture: string; setProfilePicture: (val: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Profile Picture</Text>
    <TextInput
      style={styles.input}
      placeholder="Paste image URL"
      value={profilePicture}
      onChangeText={setProfilePicture}
    />
  </View>
)

export const CreatedAt = ({ createdAt, setCreatedAt }: { createdAt: string; setCreatedAt: (val: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Created At</Text>
    <TextInput
      style={styles.input}
      placeholder="YYYY-MM-DD"
      value={createdAt}
      onChangeText={setCreatedAt}
    />
  </View>
)

// Teacher Fields

export const TeachingSubjects = ({ teachingSubjects, setTeachingSubjects }: { teachingSubjects: string[]; setTeachingSubjects: (val: string[]) => void }) => {
  const toggleSubject = (subject: string) => {
    setTeachingSubjects(
      teachingSubjects.includes(subject)
        ? teachingSubjects.filter(s => s !== subject)
        : [...teachingSubjects, subject]
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Teaching Subjects</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {subjects.map(s => (
          <TouchableOpacity
            key={s}
            style={[styles.multiBtn, teachingSubjects.includes(s) && styles.multiBtnSelected]}
            onPress={() => toggleSubject(s)}
          >
            <Text style={teachingSubjects.includes(s) ? styles.radioTextSelected : styles.radioText}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export const TeachingExperience = ({ teachingExperience, setTeachingExperience }: { teachingExperience: string; setTeachingExperience: (val: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Teaching Experience (years)</Text>
    <TextInput
      style={styles.input}
      placeholder="e.g. 5"
      value={teachingExperience}
      onChangeText={setTeachingExperience}
      keyboardType="numeric"
    />
  </View>
)

export const TeacherLevel = ({ teacherLevel, setTeacherLevel }: { teacherLevel: string; setTeacherLevel: (val: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Teacher Level</Text>
    <View style={styles.radioRow}>
      {teacherLevels.map(lvl => (
        <TouchableOpacity
          key={lvl}
          style={[styles.radioBtn, teacherLevel === lvl && styles.radioBtnSelected]}
          onPress={() => setTeacherLevel(lvl)}
        >
          <Text style={teacherLevel === lvl ? styles.radioTextSelected : styles.radioText}>{lvl}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
)

export const Certifications = ({ certifications, setCertifications }: { certifications: string[]; setCertifications: (val: string[]) => void }) => {
  const toggleCert = (cert: string) => {
    setCertifications(
      certifications.includes(cert)
        ? certifications.filter(c => c !== cert)
        : [...certifications, cert]
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Certifications</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {certificationsList.map(cert => (
          <TouchableOpacity
            key={cert}
            style={[styles.multiBtn, certifications.includes(cert) && styles.multiBtnSelected]}
            onPress={() => toggleCert(cert)}
          >
            <Text style={certifications.includes(cert) ? styles.radioTextSelected : styles.radioText}>{cert}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export const TeachingStyle = ({ teachingStyle, setTeachingStyle }: { teachingStyle: string; setTeachingStyle: (val: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Teaching Style</Text>
    <TextInput
      style={styles.input}
      placeholder="Describe your teaching style"
      value={teachingStyle}
      onChangeText={setTeachingStyle}
    />
  </View>
)

export const AvailableTimeSlots = ({ availableTimeSlots, setAvailableTimeSlots }: { availableTimeSlots: string[]; setAvailableTimeSlots: (val: string[]) => void }) => {
  const toggleSlot = (slot: string) => {
    setAvailableTimeSlots(
      availableTimeSlots.includes(slot)
        ? availableTimeSlots.filter(s => s !== slot)
        : [...availableTimeSlots, slot]
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Available Time Slots</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {timeSlots.map(slot => (
          <TouchableOpacity
            key={slot}
            style={[styles.multiBtn, availableTimeSlots.includes(slot) && styles.multiBtnSelected]}
            onPress={() => toggleSlot(slot)}
          >
            <Text style={availableTimeSlots.includes(slot) ? styles.radioTextSelected : styles.radioText}>{slot}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export const MentorshipInterest = ({ mentorshipInterest, setMentorshipInterest }: { mentorshipInterest: boolean; setMentorshipInterest: (val: boolean) => void }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Mentorship Interest</Text>
    <View style={styles.switchRow}>
      <Text>No</Text>
      <Switch
        value={mentorshipInterest}
        onValueChange={setMentorshipInterest}
      />
      <Text>Yes</Text>
    </View>
  </View>
)

// Student Fields

export const Interests = ({ interests, setInterests }: { interests: string[]; setInterests: (val: string[]) => void }) => {
  const toggleInterest = (interest: string) => {
    setInterests(
      interests.includes(interest)
        ? interests.filter(i => i !== interest)
        : [...interests, interest]
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Interests</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {interestsList.map(interest => (
          <TouchableOpacity
            key={interest}
            style={[styles.multiBtn, interests.includes(interest) && styles.multiBtnSelected]}
            onPress={() => toggleInterest(interest)}
          >
            <Text style={interests.includes(interest) ? styles.radioTextSelected : styles.radioText}>{interest}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export const Curriculum = ({ curriculum, setCurriculum }: { curriculum: string; setCurriculum: (val: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Curriculum</Text>
    <View style={styles.radioRow}>
      {curriculums.map(cur => (
        <TouchableOpacity
          key={cur}
          style={[styles.radioBtn, curriculum === cur && styles.radioBtnSelected]}
          onPress={() => setCurriculum(cur)}
        >
          <Text style={curriculum === cur ? styles.radioTextSelected : styles.radioText}>{cur}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
)

export const ClassLevel = ({ classLevel, setClassLevel }: { classLevel: string; setClassLevel: (val: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Class Level</Text>
    <View style={styles.radioRow}>
      {classLevels.map(lvl => (
        <TouchableOpacity
          key={lvl}
          style={[styles.radioBtn, classLevel === lvl && styles.radioBtnSelected]}
          onPress={() => setClassLevel(lvl)}
        >
          <Text style={classLevel === lvl ? styles.radioTextSelected : styles.radioText}>{lvl}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
)

export const PreferredLearningStyle = ({ preferredLearningStyle, setPreferredLearningStyle }: { preferredLearningStyle: string; setPreferredLearningStyle: (val: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Preferred Learning Style</Text>
    <View style={styles.radioRow}>
      {learningStyles.map(style => (
        <TouchableOpacity
          key={style}
          style={[styles.radioBtn, preferredLearningStyle === style && styles.radioBtnSelected]}
          onPress={() => setPreferredLearningStyle(style)}
        >
          <Text style={preferredLearningStyle === style ? styles.radioTextSelected : styles.radioText}>{style}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
)

export const StudyGoals = ({ studyGoals, setStudyGoals }: { studyGoals: string; setStudyGoals: (val: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Study Goals</Text>
    <TextInput
      style={styles.input}
      placeholder="Describe your study goals"
      value={studyGoals}
      onChangeText={setStudyGoals}
    />
  </View>
)

export const DailyStudyTime = ({ dailyStudyTime, setDailyStudyTime }: { dailyStudyTime: string; setDailyStudyTime: (val: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Daily Study Time (hours)</Text>
    <TextInput
      style={styles.input}
      placeholder="e.g. 2"
      value={dailyStudyTime}
      onChangeText={setDailyStudyTime}
      keyboardType="numeric"
    />
  </View>
)

export const ExamPrepFocus = ({ examPrepFocus, setExamPrepFocus }: { examPrepFocus: string; setExamPrepFocus: (val: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Exam Prep Focus</Text>
    <View style={styles.radioRow}>
      {examPreps.map(exam => (
        <TouchableOpacity
          key={exam}
          style={[styles.radioBtn, examPrepFocus === exam && styles.radioBtnSelected]}
          onPress={() => setExamPrepFocus(exam)}
        >
          <Text style={examPrepFocus === exam ? styles.radioTextSelected : styles.radioText}>{exam}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
)
