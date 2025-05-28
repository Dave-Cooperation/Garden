import { toastConfig } from "@/utils/showSuccessAlert";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return(
<>
       <Stack screenOptions={{headerShown : false}} />
      <Toast config={toastConfig} />
</>
  )

}
