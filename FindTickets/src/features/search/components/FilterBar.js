import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

export default function FilterBar({ selected = 'all', onChange, items = [] }) {
  const list = [{ id: 'all', title: 'Alle' }, ...items]; // items er et ARRAY nu

  return (
    <View style={{ marginBottom: 12 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingRight: 8 }}>
        {list.map((c) => {
          const active = selected === c.id;
          return (
            <TouchableOpacity
              key={c.id}
              onPress={() => onChange?.(c.id)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 999,
                backgroundColor: active ? '#6EE7B7' : '#191B22'
              }}>
              <Text style={{ color: active ? '#0E0F13' : 'white', fontWeight: '600' }}>
                {c.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
