import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
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

import GoogleLogo from '@/assets/images/google.png'
import { AuthStackParamList } from '@/types'
import { showSuccessAlert } from '@/utils/showSuccessAlert'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useRouter } from 'expo-router'
import { doc, getDoc, getFirestore } from 'firebase/firestore'

const Login = () => {
  type AuthNav = NativeStackNavigationProp<AuthStackParamList>
  const navigation = useNavigation<AuthNav>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuthAndProfile = async () => {
      const storedUser = await AsyncStorage.getItem('user')
      const storedProfile = await AsyncStorage.getItem('profile')

      if (storedUser && storedProfile) {
        const parsedUser = JSON.parse(storedUser)
        try {
          await signInWithEmailAndPassword(auth, parsedUser.email, parsedUser.password)
          router.push('/(tabs)')
        } catch (err) {
          console.error('Auto-login failed:', err)
          setAuthLoading(false)
        }
      } else {
        setAuthLoading(false)
      }
    }
    checkAuthAndProfile()
  }, [])

  const handleLogin = async () => {
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
        showSuccessAlert('Login Successful')
        router.push('/(tabs)')
      } else {
        await AsyncStorage.removeItem('profile')
        navigation.navigate('NameAndPicture')
      }
    } catch (error: any) {
      Alert.alert('Login Failed', error.message)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#fff" size={75} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} disabled>
        <Image source={GoogleLogo} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.footerText, styles.footerLink]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login

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
  footer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  footerText: {
    color: '#ccc',
    fontSize: 14,
  },
  footerLink: {
    color: '#246bfd',
    fontWeight: 'bold',
  },
})
