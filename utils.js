import axios from 'axios';
import {getUniqueId} from 'react-native-device-info';

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
    'mutation{gacha(input:{}){ id level malId name imageUrl url description isFavorite waifuImages{url} series{id name imageUrl url} }}',
  ).then(data => data.gacha);
};
const sellWaifu = function(malId) {
  return q(`mutation{sellWaifu(input:{malId:${parseInt(malId)}})}`).then(
    data => data.sellWaifu,
  );
};
const getWaifus = function() {
  return q(
    'query{user{ waifus{id level malId name imageUrl url description isFavorite waifuImages{url} series{id name imageUrl url}} }}',
  ).then(data => {
    return data.user.waifus;
  });
};

const setFavWaifu = function(malId) {
  return q(`mutation{favoriteWaifu(input:{malId:${parseInt(malId)}})}`).then(
    data => data.favoriteWaifu,
  );
};
const setUnfavWaifu = function(malId) {
  return q(`mutation{unfavoriteWaifu(input:{malId:${parseInt(malId)}})}`).then(
    data => data.unfavoriteWaifu,
  );
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
    )}", distance: ${parseInt(
      distance,
    )}}){distance data startedAt endedAt gems}}`,
  ).then(data => data.stopRun);
};
/**********************************************
 * EXERCISE
 **********************************************/
const getExercises = function() {
  return q(
    'query{exercises{id name description muscles{name muscleGroups{name}} equipments{name} exerciseImages{path}}}',
  ).then(data => {
    const exercises = data.exercises;
    exercises.forEach(exercise => {
      exercise.equipments = exercise.equipments.map(x => x.name);
      exercise.muscleGroups = Array.from(
        new Set(
          exercise.muscles.reduce(
            (a, b) => [...a, ...b.muscleGroups.map(x => x.name)],
            [],
          ),
        ),
      );
    });
    return exercises;
  });
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
    )}, reps: ${parseInt(reps)}}){id gems}}`,
  ).then(data => data.createWorkout);
};

/**********************************************
 * UTILITY
 **********************************************/
const q = async function(query, variables = {}) {
  console.log({
    query,
    variables,
    device_id: getUniqueId(),
  });
  const result = await axios.post(
    // 'http://localhost:3000/graphql',
    'http://waiful-backend-dev3.ap-northeast-1.elasticbeanstalk.com/graphql',
    {
      query,
      variables,
      device_id: getUniqueId(),
    },
  );
  return result.data.data;
};

const getGreetingTime = m => {
  const currentHour = parseFloat(m.format('HH'));
  let result;
  if (currentHour >= 12 && currentHour < 17) {
    result = 'afternoon';
  } else if (currentHour >= 17 && currentHour < 5) {
    result = 'evening';
  } else {
    result = 'morning';
  }
  return result;
};

export default {
  getUser,
  gacha,
  sellWaifu,
  getExercises,
  logExercise,
  getWorkouts,
  getWaifus,
  getRuns,
  getRun,
  startRun,
  stopRun,
  setFavWaifu,
  setUnfavWaifu,
  getSeries,
  getTopSeries,
  addSeries,
  removeSeries,
  getGreetingTime,
};
