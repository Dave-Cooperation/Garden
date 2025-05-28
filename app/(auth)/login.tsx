import { Ionicons } from '@expo/vector-icons'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../../firebaseConfig'

import { showSuccessAlert } from '@/utils/showSuccessAlert'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useRouter } from 'expo-router'
import type { AuthStackParamList } from '../../types'; // adjust if you placed it elsewhere

type AuthNav = NativeStackNavigationProp<AuthStackParamList>
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const navigation = useNavigation<AuthNav>()

  useEffect(() => {

  const clearUserSession = async () => {
    setLoading(true)
    try {
      const user = await AsyncStorage.getItem('user')
      if (user) {
        await signOut(auth) // log out from Firebase
        await AsyncStorage.removeItem('user') // clear user from AsyncStorage
        console.log('Previous user signed out.')
      }
    } catch (error) {
      console.error('Error signing out previous user:', error)
    }
    setLoading(false)
  }

  clearUserSession()
}, [])

  const handleLogin = async () => {
    

    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const { user } = userCredential
      await AsyncStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
      }))
      navigation.navigate('School')
      showSuccessAlert('Login Successful')
    } catch (error: any) {
      Alert.alert('Login Failed', error.message)
    } finally {
      setLoading(false)
    }
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
        <Ionicons name='logo-google' size={24} style={{ paddingRight: 10 }} />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Add this block below for sign-up link */}
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
}

})