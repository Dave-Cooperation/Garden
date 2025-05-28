import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const TabsLayout = () => {
  return (
    <Tabs  screenOptions={{tabBarShowLabel : false, headerShown: false }}>

      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon : ({color, size}) => (<Ionicons name="home" size={size} color={color} />),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon : ({color, size}) => (<Ionicons name="notifications" size={size} color={color} />),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon : ({color, size}) => (<Ionicons name="person" size={size} color={color} />),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})