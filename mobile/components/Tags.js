import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tag = (props) => (
  <View style={styles.tag}>
    <Text style={styles.tagText}>{props.name}</Text>
  </View>
);

const Tags = (props) => (
  <View style={styles.container}>
    {props.tags.map((tag, index) => <Tag key={index} name={tag} />)}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 1,
    margin: 5,
  },
  tagText: {
    fontSize: 14,
  },
});

export default Tags;