import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { styles } from './styles/DetailArtikelScreenStyles';

export default function DetailArtikelScreen({ route }: any) {
  const { article } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: article.image }} style={styles.image} />
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.content}>{article.content.repeat(10)}</Text>
    </ScrollView>
  );
}
