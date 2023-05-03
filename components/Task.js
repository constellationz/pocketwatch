import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Tags from './Tags'

const Task = (props) => {
  const navigation = useNavigation();

  const elapsedTime = Math.floor((props.task.endTime - props.task.startTime) / 1000);
  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  const tags = props.task.name.match(/#\w+/g) || [];
  const name = props.task.name.replace(/#\w+/g, '').trim();

  const handlePress = () => {
    console.log(props.task.id); // print the id to the console
    navigation.navigate('Edit', { task: props.task }); // navigate to Edit screen and pass taskId
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>{name}</Text>
          <Text>{hours}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</Text>
        </View>
        <Tags tags={tags.map(tag => tag.slice(1))} />
      </View>
    </TouchableOpacity>
  );
};

export default Task;