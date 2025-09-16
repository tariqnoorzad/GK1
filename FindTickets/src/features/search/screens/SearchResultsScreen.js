import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gs } from '../../../styles/globalstyle';
import data from '../data/mockTickets.json';
import cats from '../data/categories.json'; 
import FilterBar from '../components/FilterBar';

export default function SearchResultsScreen({ navigation }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return data.filter(d => {
      const matchText = !s || d.title.toLowerCase().includes(s) || d.city.toLowerCase().includes(s);
      const matchCat  = cat === 'all' || d.category === cat;
      return matchText && matchCat;
    });
  }, [q, cat]);

  return (
    <SafeAreaView style={gs.screen} edges={['top','bottom']}>
      <FlatList
        data={results}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"

        ListHeaderComponent={
          <View style={{ marginBottom: 12 }}>
            <Text style={[gs.title, { marginBottom: 8 }]}>Find billetter</Text>
            <TextInput
              placeholder="Søg efter koncert, kamp, teater…"
              placeholderTextColor="#8A8F98"
              value={q}
              onChangeText={setQ}
              style={{ backgroundColor: '#191B22', color: 'white', padding: 12, borderRadius: 12, marginBottom: 12 }}
            />
            <FilterBar selected={cat} onChange={setCat} items={cats.filters} />
          </View>
        }

        ListEmptyComponent={<Text style={gs.subtitle}>Ingen resultater</Text>}

        renderItem={({ item }) => (
          <TouchableOpacity
            style={[gs.listItem, { marginBottom: 10 }]}
            onPress={() => navigation.navigate('Search/Details', { id: item.id })}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>{item.title}</Text>
            <Text style={gs.subtitle}>
              {item.city} · {new Date(item.dateTime).toLocaleString('da-DK')}
            </Text>
            {item.isVerified && (
              <View style={[gs.badgeVerified, { alignSelf: 'flex-start', marginTop: 6 }]}>
                <Text style={{ color: '#0E0F13' }}>Verified</Text>
              </View>
            )}
            <View style={[gs.buttonPrimary, { marginTop: 10 }]}>
              <Text style={gs.buttonTextDark}>View details</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
