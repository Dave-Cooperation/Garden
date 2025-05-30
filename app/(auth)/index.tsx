import GoogleLogo from '@/assets/images/google.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { app, auth } from '../../firebaseConfig'
import type { AuthStackParamList } from '../../types'

const Signup = () => {
  type AuthNav = NativeStackNavigationProp<AuthStackParamList>
  const navigation = useNavigation<AuthNav>()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const { user } = userCredential
      const userData = { uid: user.uid, email: user.email, password }
      await AsyncStorage.setItem('user', JSON.stringify(userData))

      const db = getFirestore(app)

      if (!user.email) {
        throw new Error('User email is missing')
      }
      const profileRef = doc(db, 'users', user.email, 'profile', 'details')
      const profileSnap = await getDoc(profileRef)

      if (profileSnap.exists()) {
        await AsyncStorage.setItem('profile', JSON.stringify(profileSnap.data()))
        console.log('Logging in user with email:', user.email)
        router.push('/(tabs)')
        return
      } else {
        await AsyncStorage.removeItem('profile')
        navigation.navigate('NameAndPicture')
        return
      }
    } catch (loginError) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const { user } = userCredential
        const userData = { uid: user.uid, email: user.email, password }
        await AsyncStorage.setItem('user', JSON.stringify(userData))

        // Sign in after signup
        await signInWithEmailAndPassword(auth, email, password)

        console.log('Signing up user with email:', user.email)
        navigation.navigate('NameAndPicture')
      } catch (signupError: any) {
        Alert.alert('Sign Up Failed', signupError.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} disabled>
        <Image source={GoogleLogo} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 24 }}>
        <Text style={{ color: '#888', fontSize: 16 }}>
          Already have an account?{' '}
          <Text onPress={() => navigation.navigate('Login')} style={{ color: '#246bfd', fontWeight: 'bold' }}>
            Log in here
          </Text>
        </Text>
      </View>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    backgroundColor: '#23252b',
    color: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  googleButton: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleIcon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#181A20',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    backgroundColor: '#246bfd',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
