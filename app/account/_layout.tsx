import { Slot, Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen name="signin" options={{
        title: "ACCT"
      // animationTypeForReplace: state.isSignout ? 'pop' : 'push',
      }} />
    </Stack>
  );
}