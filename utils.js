import axios from 'axios';

/**********************************************
 * USER
 **********************************************/
const getUser = function() {
  return q('query{user{ id email gems }}').then(data => data.user);
};

/**********************************************
 * WAIFUS
 **********************************************/
const gacha = function() {
  return q(
    'mutation{gacha(input:{}){id name imageUrl url series{id name imageUrl url}}}',
  ).then(data => data.gacha);
};
const getWaifus = function() {
  return q(
    'query{user{ waifus{id name imageUrl url series{id name imageUrl url}} }}',
  ).then(data => data.user.waifus);
};

/**********************************************
 * SERIES
 **********************************************/
const getSeries = function() {
  return q('query{user{ series{id malId malType name imageUrl url} }}').then(
    data => data.user.series,
  );
};
const addSeries = function(malType, malId) {
  return q(
    `mutation{addSeries(input:{malType:"${malType}",malId:${parseInt(
      malId,
    )}}){id}}`,
  ).then(data => data.addSeries);
};
const removeSeries = function(malType, malId) {
  return q(
    `mutation{removeSeries(input:{malType:"${malType}",malId:${parseInt(
      malId,
    )}})}`,
  ).then(data => data.removeSeries);
};
const getTopSeries = function(malType, search) {
  return q(
    `query($search: String!){ series(malType:"${malType}", search: $search){id malId name imageUrl url} }`,
    {search},
  ).then(data => data.series);
};

/**********************************************
 * RUNS
 **********************************************/
const getRuns = function() {
  return q('query{user{runs{distance data startedAt endedAt}}}').then(
    data => data.user.runs,
  );
};
const getRun = function() {
  return q('query{user{currentRun{startedAt}}}').then(
    data => data.user.currentRun,
  );
};
const startRun = function() {
  return q(`mutation{createRun(input:{}){id}}`).then(data => data.createRun);
};
const stopRun = function(distance, data) {
  return q(
    `mutation{stopRun(input:{data:"${JSON.stringify(
      data,
    )}", distance: ${parseInt(distance)}}){distance data startedAt endedAt}}`,
  ).then(data => data.stopRun);
};
/**********************************************
 * EXERCISE
 **********************************************/
const getExercises = function() {
  return q(
    'query{exercises{id name description muscles{name} equipments{name} exerciseImages{path}}}',
  ).then(data => data.exercises);
};
const getWorkouts = function() {
  return q(
    'query{user{id email workouts{reps exercise{name} createdAt}}}',
  ).then(data => data.user.workouts);
};
const logExercise = function(exercise, reps) {
  return q(
    `mutation{createWorkout(input:{exerciseId:${parseInt(
      exercise.id,
    )}, reps: ${parseInt(reps)}}){id}}`,
  ).then(data => data.createWorkout);
};

/**********************************************
 * UTILITY
 **********************************************/
const q = async function(query, variables = {}) {
  console.log(query);
  const result = await axios.post('http://localhost:3000/graphql', {
    query,
    variables,
  });
  return result.data.data;
};

export default {
  getUser,
  gacha,
  getExercises,
  logExercise,
  getWorkouts,
  getWaifus,
  getRuns,
  getRun,
  startRun,
  stopRun,
  getSeries,
  getTopSeries,
  addSeries,
  removeSeries,
};
