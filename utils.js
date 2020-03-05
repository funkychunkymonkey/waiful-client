import axios from 'axios';

const getUser = function() {
  return q('query{user{ id email gems }}').then(data => data.user);
};
const gacha = function() {
  return q(
    'mutation{gacha(input:{}){id name imageUrl url series{id name imageUrl url}}}',
  ).then(data => data.gacha);
};

const q = async function(query) {
  const result = await axios.post('http://localhost:3000/graphql', {query});
  return result.data.data;
};

export default {
  getUser,
  gacha,
};
