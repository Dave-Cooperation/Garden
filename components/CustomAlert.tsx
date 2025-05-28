import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import Toast from 'react-native-root-toast'

export const showCustomAlert = (message: string, duration: number = 3000) => {
  Toast.show(
    <View style={{
      flexDirection: 'row',
      backgroundColor: '#246bfd',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center'
    }}>
      <Ionicons name="checkmark-circle" size={20} color="#fff" style={{ marginRight: 8 }} />
      <Text style={{ color: '#fff', fontSize: 15 }}>{message}</Text>
    </View>,
    {
      duration,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
    }
  )
}
