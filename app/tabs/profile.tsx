import React from 'react';
import { 
  YStack, 
  XStack, 
  H2, 
  Paragraph, 
  SafeArea, 
  Avatar, 
  UserPreferences, 
  PreferenceSection,
  Button,
  ScrollView,
  toast
} from '@blinkdotnew/mobile-ui';
import { useProfile } from '@/hooks/useProfile';
import { colors } from '@/constants/design';
import { LogOut, User, Bell, Shield, Moon, MapPin } from '@blinkdotnew/mobile-ui';

export default function ProfileScreen() {
  const { profile, setUserId } = useProfile();

  const sections: PreferenceSection[] = [
    {
      title: 'Demo Role Switcher',
      items: [
        { 
          id: 'admin', 
          title: 'Switch to Admin', 
          type: 'action', 
          icon: <Shield size={18} />, 
          onPress: () => {
            setUserId('u1');
            toast('Role Switched', { message: 'You are now an Administrator', variant: 'success' });
          } 
        },
        { 
          id: 'cleaner', 
          title: 'Switch to Cleaner', 
          type: 'action', 
          icon: <User size={18} />, 
          onPress: () => {
            setUserId('u2');
            toast('Role Switched', { message: 'You are now a Cleaner', variant: 'success' });
          } 
        },
        { 
          id: 'customer', 
          title: 'Switch to Customer', 
          type: 'action', 
          icon: <User size={18} />, 
          onPress: () => {
            setUserId('u5');
            toast('Role Switched', { message: 'You are now a Customer', variant: 'success' });
          } 
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        { id: 'notifications', title: 'Notifications', type: 'toggle', value: true, icon: <Bell size={18} />, onValueChange: () => {} },
        { id: 'dark_mode', title: 'Dark Mode', type: 'toggle', value: true, icon: <Moon size={18} />, onValueChange: () => {} },
        { id: 'address', title: 'My Address', type: 'action', icon: <MapPin size={18} />, onPress: () => {} },
      ],
    },
    {
      title: 'Account',
      items: [
        { id: 'logout', title: 'Log Out', type: 'action', icon: <LogOut size={18} color={colors.error} />, destructive: true, onPress: () => {} },
      ],
    },
  ];

  return (
    <SafeArea flex={1} backgroundColor={colors.background}>
      <ScrollView>
        <YStack padding="$4" alignItems="center" marginBottom="$6" marginTop="$4">
          <Avatar 
            circular 
            size="$8" 
            source={{ uri: profile?.avatar_url }} 
            borderColor={colors.primary}
            borderWidth={2}
          />
          <H2 marginTop="$3">{profile?.full_name}</H2>
          <Paragraph color={colors.textSecondary}>{profile?.role.toUpperCase()}</Paragraph>
          <Paragraph size="$2" color={colors.textSecondary}>{profile?.phone}</Paragraph>
        </YStack>

        <UserPreferences sections={sections} />
        
        <YStack padding="$4" alignItems="center" paddingBottom="$10">
          <Paragraph size="$1" color={colors.textSecondary}>Cyprus Cleaning App v1.0.0</Paragraph>
        </YStack>
      </ScrollView>
    </SafeArea>
  );
}
