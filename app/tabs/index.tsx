import React from 'react';
import { 
  YStack, 
  XStack, 
  H2, 
  Paragraph, 
  FinanceDashboard, 
  ListItem, 
  Button, 
  ScrollView, 
  SafeArea,
  StatusBadge,
  Card,
  Image,
  Star,
  Plus,
  ArrowRight
} from '@blinkdotnew/mobile-ui';
import { useProfile } from '@/hooks/useProfile';
import { useQuery } from '@tanstack/react-query';
import { blink } from '@/lib/blink';
import { colors, spacing } from '@/constants/design';

export default function DashboardScreen() {
  const { profile, isLoading: profileLoading } = useProfile();

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const result = await blink.db.orders.list({
        orderBy: { scheduled_at: 'asc' }
      });
      return result;
    }
  });

  if (profileLoading || ordersLoading) {
    return (
      <SafeArea flex={1} backgroundColor={colors.background} justifyContent="center" alignItems="center">
        <Paragraph>Loading Dashboard...</Paragraph>
      </SafeArea>
    );
  }

  const role = profile?.role || 'customer';

  return (
    <SafeArea flex={1} backgroundColor={colors.background}>
      <ScrollView padding="$4">
        <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
          <YStack>
            <Paragraph color={colors.textSecondary}>Welcome back,</Paragraph>
            <H2>{profile?.full_name}</H2>
          </YStack>
          <StatusBadge status={role === 'admin' ? 'success' : 'info'}>
            {role.toUpperCase()}
          </StatusBadge>
        </XStack>

        {role === 'admin' && (
          <FinanceDashboard
            title="Overview"
            balance="$4,250.00"
            balanceLabel="Monthly Revenue"
            rangeLabel="May 2026"
            metrics={[
              { label: 'Orders', value: '128', change: '↑ 14%' },
              { label: 'Active Cleaners', value: '8', change: '↑ 2' },
            ]}
            quickActions={[
              { id: 'add_order', label: 'New Order', icon: <Plus size={18} /> },
            ]}
          />
        )}

        {role === 'cleaner' && (
          <YStack gap="$4">
            <Card elevation={4} padded backgroundColor={colors.surface}>
              <H2 size="$5" marginBottom="$2">Today's Focus</H2>
              <Paragraph marginBottom="$4">You have 3 cleanings scheduled for today.</Paragraph>
              <Button theme="active">Start Next Job</Button>
            </Card>
          </YStack>
        )}

        {role === 'customer' && (
          <YStack gap="$4">
            <Card elevation={4} padded backgroundColor={colors.surface}>
              <XStack gap="$4" alignItems="center">
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=200' }} 
                  style={{ width: 80, height: 80, borderRadius: 12 }}
                />
                <YStack flex={1}>
                  <H2 size="$4">Summer Freshness</H2>
                  <Paragraph size="$2" color={colors.textSecondary}>Get 20% off your next deep cleaning.</Paragraph>
                  <Button size="$2" theme="active" alignSelf="flex-start" marginTop="$2">Book Now</Button>
                </YStack>
              </XStack>
            </Card>
          </YStack>
        )}

        <YStack marginTop="$6" gap="$3">
          <XStack justifyContent="space-between" alignItems="center">
            <H2 size="$5">Recent Orders</H2>
            <Button size="$2" chromeless iconAfter={<ArrowRight size={14} />}>View All</Button>
          </XStack>
          
          {orders?.slice(0, 5).map((order: any) => (
            <ListItem
              key={order.id}
              title={order.type}
              subtitle={order.address}
              icon={<ClipboardList color={colors.primary} />}
              onPress={() => {}}
              rightSlot={
                <YStack alignItems="flex-end">
                  <Paragraph fontWeight="700">${order.price}</Paragraph>
                  <StatusBadge status={order.status === 'completed' ? 'success' : 'warning'} size="$1">
                    {order.status}
                  </StatusBadge>
                </YStack>
              }
            />
          ))}
        </YStack>
      </ScrollView>
    </SafeArea>
  );
}

// Icons re-exported from @blinkdotnew/mobile-ui (v2.0.0+)
import { ClipboardList } from '@blinkdotnew/mobile-ui';
