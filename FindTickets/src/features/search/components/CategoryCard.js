// src/features/search/components/CategoryCard.js
import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { gs } from '../../../styles/globalstyle';

const ICON_MAP = {
  search: 'magnify',
  'ticket-plus': 'ticket-plus',
  handshake: 'handshake-outline',
};

export default function CategoryCard({ item, onPress }) {
  const iconName = ICON_MAP[item.icon] || 'shape';
  return (
    <Pressable
      onPress={onPress}
      style={[gs.card, gs.shadowSm, { width: '31%', marginBottom: 12 }]}
    >
      <View style={gs.iconCircle}>
        <Icon name={iconName} size={20} color="#0E0F13" />
      </View>
      <Text style={{ color: 'white', fontWeight: '700', marginTop: 8 }}>{item.title}</Text>
      <Text style={gs.subtitle}>({item.id})</Text>
    </Pressable>
  );
}
