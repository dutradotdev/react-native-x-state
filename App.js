import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import jokeMachine from './src/machines/jokeMachine'
import { useMachine } from '@xstate/react';

export default function App() {
  const [current, send] = useMachine(jokeMachine)
  
  const { value, context: { joke }} = current

  const FetchNewJokeButton = () => (
    <TouchableHighlight style={styles.button} onPress={() => send('FETCH_JOKE')}>
      <Text style={styles.subtitle}>Fetch new joke</Text>
    </TouchableHighlight>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Joke App!</Text>
      {value === 'idle' && <FetchNewJokeButton />}

      {value === 'loading' && <ActivityIndicator />}

      {value === 'failed' && <Text style={styles.subtitle}>An error occurred :(</Text>}
      
      {value === 'loaded' && (
        <>
          <Text style={styles.joke}>{joke}</Text>
          <FetchNewJokeButton />
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 18
  },
  button: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1
  },
  subtitle: {
    fontSize: 16
  },
  joke: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center'
  }

});
