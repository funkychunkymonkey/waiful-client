import * as React from 'react';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Title,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import utils from '../utils.js';
import Loading from './Loading.js';
import FavButton from './FavButton.js';
import COLORS from '../color';

export default function Collection() {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  const [selectedWaifuIdx, setSelectedWaifuIdx] = useState(-1);

  useFocusEffect(
    React.useCallback(() => {
      utils.getWaifus().then(data => {
        setLoading(false);
        setCollection(data);
      });
      return () => {
        setLoading(true);
      };
    }, []),
  );

  const updateFavState = (waifuIdx, newFavState) => {
    const newWaifu = {...collection[selectedWaifuIdx], isFavorite: newFavState};
    const newCollection = [...collection];
    newCollection[waifuIdx] = newWaifu;
    setCollection(newCollection);
  };

  const fav = waifuIdx => {
    const waifu = collection[waifuIdx];
    if (!waifu.isFavorite) {
      utils
        .setFavWaifu(waifu.malId)
        .then(result => result && updateFavState(waifuIdx, true))
        .catch(e => alert(e));
    } else {
      utils
        .setUnfavWaifu(waifu.malId)
        .then(result => result && updateFavState(waifuIdx, false))
        .catch(e => alert(e));
    }
  };

  const getGalleryItem = i => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedWaifuIdx(i);
        }}>
        <Image
          style={styles.collection}
          source={{
            uri: collection[i].imageUrl,
          }}
        />
        {collection[i].isFavorite ? (
          <Text style={styles.isFavMark}>♥</Text>
        ) : (
          <Text style={styles.isFavMark}> </Text>
        )}
      </TouchableOpacity>
    );
  };
  const pairCollection = [];
  for (let i = 0; i < collection.length; i += 2) {
    pairCollection.push(
      <View key={i}>
        {getGalleryItem(i)}
        {collection.length > i + 1 && getGalleryItem(i + 1)}
      </View>,
    );
  }

  if (loading) return <Loading />;
  return (
    <Container>
      <Header style={styles.header}>
        <Left />
        <Body>
          <Title style={styles.title}>Collection</Title>
        </Body>
        <Right />
      </Header>
      <Content style={styles.body}>
        <View style={styles.showView}>
          {selectedWaifuIdx >= 0 ? (
            <>
              <Image
                style={styles.waifuImage}
                source={{
                  uri: collection[selectedWaifuIdx].imageUrl,
                }}
                resizeMode="contain"
              />
              <FavButton
                onPress={() => fav(selectedWaifuIdx)}
                waifuIdx={selectedWaifuIdx}
                isFavorite={collection[selectedWaifuIdx].isFavorite}
              />
            </>
          ) : (
            <></>
          )}
        </View>
        <ScrollView contentContainerStyle={styles.gallery} horizontal={true}>
          {collection.length !== 0 ? (
            pairCollection
          ) : (
            <Text>No collection yet.</Text>
          )}
        </ScrollView>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.bgPrimary,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  body: {
    backgroundColor: COLORS.bgSecondary,
  },
  showView: {
    height: 400,
  },
  waifuImage: {
    position: 'relative',
    zIndex: 0,
    width: 414,
    height: 380,
    marginTop: 5,
  },
  gallery: {
    justifyContent: 'center',
    alignContent: 'space-around',
    flexDirection: 'row',
    height: 300,
  },
  collection: {
    borderRadius: 20,
    width: 100,
    height: 100,
    margin: 10,
    position: 'relative',
    zIndex: 0,
  },
  isFavMark: {
    position: 'relative',
    zIndex: 1,
    top: -30,
    left: 6,
    fontSize: 30,
    color: COLORS.favHeart,
  },
});
