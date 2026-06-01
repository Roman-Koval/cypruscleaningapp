import React from 'react';
import { LoginScreen, YStack, SafeArea, toast } from '@blinkdotnew/mobile-ui';
import { useRouter } from 'expo-router';
import { blink } from '@/lib/blink';

export default function AuthScreen() {
  const router = useRouter();

  const handleEmailSubmit = async (email: string, pass: string) => {
    try {
      // For demo purposes, we just navigate to tabs
      toast('Success', { message: 'Logged in successfully', variant: 'success' });
      router.replace('/(tabs)');
    } catch (e: any) {
      toast('Error', { message: e.message, variant: 'error' });
    }
  };

  return (
    <SafeArea flex={1} backgroundColor="$background">
      <LoginScreen
        variant="editorial"
        title="Cyprus Cleaning"
        subtitle="Premium service for your home and office"
        showEmailForm
        onEmailSubmit={handleEmailSubmit}
        providers={[
          { id: 'google', name: 'Continue with Google', brand: 'google' },
          { id: 'apple', name: 'Continue with Apple', brand: 'apple' },
        ]}
        onProviderPress={(id) => {
          toast('Social Login', { message: `Logging in with ${id}` });
          router.replace('/(tabs)');
        }}
      />
    </SafeArea>
  );
}
