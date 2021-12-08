import { createMachine, assign } from 'xstate';

function invokeFetchJoke() {
  return fetch('http://api.icndb.com/jokes/random')
    .then((response) => response.json())
    .then(data => data.value.joke)
}


const jokeMachine = createMachine({
  id: 'jokeMachine',
  initial: 'idle',
  context: {
    joke: ''
  },
  states: {
    idle: {},
    loading: {
      invoke: {
        id: 'invoke-fetch-joke',
        src: invokeFetchJoke,
        onDone: {
          target: 'loaded',
          actions: assign({
            joke: (_, event) => event.data
          })
        },
        onError: 'failed'
      }
    },
    loaded: {},
    failed: {}
  },
  on: {
    FETCH_JOKE: 'loading'
  }
});

export default jokeMachine
