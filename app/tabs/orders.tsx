import React, { useState } from 'react';
import { 
  YStack, 
  XStack, 
  H2, 
  Paragraph, 
  ListItem, 
  SafeArea, 
  ScrollView, 
  BlinkToggleGroup,
  StatusBadge,
  DataTable,
  DataTableColumn,
  SearchBar,
  Divider
} from '@blinkdotnew/mobile-ui';
import { useQuery } from '@tanstack/react-query';
import { blink } from '@/lib/blink';
import { colors } from '@/constants/design';
import { ClipboardList, Filter } from '@blinkdotnew/mobile-ui';

export default function OrdersScreen() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', filter],
    queryFn: async () => {
      let where: any = {};
      if (filter !== 'all') {
        where.status = filter;
      }
      const result = await blink.db.orders.list({
        where,
        orderBy: { scheduled_at: 'desc' }
      });
      return result;
    }
  });

  const filteredOrders = orders?.filter((o: any) => 
    o.address.toLowerCase().includes(search.toLowerCase()) ||
    o.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeArea flex={1} backgroundColor={colors.background}>
      <YStack padding="$4" gap="$4">
        <XStack justifyContent="space-between" alignItems="center">
          <H2>Orders</H2>
          <StatusBadge status="info">
            {orders?.length || 0} Total
          </StatusBadge>
        </XStack>

        <SearchBar 
          placeholder="Search by address or type..." 
          value={search}
          onChangeText={setSearch}
        />

        <BlinkToggleGroup
          value={filter}
          onValueChange={setFilter}
          options={[
            { label: 'All', value: 'all' },
            { label: 'Pending', value: 'pending' },
            { label: 'Completed', value: 'completed' },
          ]}
        />

        <ScrollView flex={1}>
          <YStack gap="$2" paddingBottom="$10">
            {isLoading ? (
              <Paragraph textAlign="center" marginTop="$10">Loading orders...</Paragraph>
            ) : filteredOrders?.length === 0 ? (
              <Paragraph textAlign="center" marginTop="$10">No orders found.</Paragraph>
            ) : (
              filteredOrders?.map((order: any) => (
                <ListItem
                  key={order.id}
                  title={order.type}
                  subtitle={`${order.address}\n${new Date(order.scheduled_at).toLocaleDateString()}`}
                  icon={<ClipboardList color={colors.primary} size={20} />}
                  rightSlot={
                    <YStack alignItems="flex-end" gap="$1">
                      <Paragraph fontWeight="700">${order.price}</Paragraph>
                      <StatusBadge 
                        status={
                          order.status === 'completed' ? 'success' : 
                          order.status === 'pending' ? 'warning' : 'info'
                        } 
                        size="$1"
                      >
                        {order.status}
                      </StatusBadge>
                    </YStack>
                  }
                  onPress={() => {}}
                />
              ))
            )}
          </YStack>
        </ScrollView>
      </YStack>
    </SafeArea>
  );
}
