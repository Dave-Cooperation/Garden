import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

export const showSuccessAlert = (message: string) => {
  Toast.show({
    type: 'customToast',
    position: 'top',
    text1: message,
    props: { custom: true },
  });
};

export const toastConfig = {
  customToast: ({ text1 }: any) => (
    <View style={styles.toast}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  toast: {
    backgroundColor: '#23252b',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 50,
    borderColor: '#246bfd',
    borderWidth: 1,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
