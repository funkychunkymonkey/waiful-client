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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

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
              <LinearGradient
                colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
                style={styles.info}>
                <Text style={styles.waifuNemeText}>
                  {collection[selectedWaifuIdx].name}
                </Text>
                <Text style={styles.waifuSeriesText}>
                  {collection[selectedWaifuIdx].series.name.split(':')[0]}
                </Text>
                <Text style={styles.waifuSeriesText}>
                  {collection[selectedWaifuIdx].series.name.split(':')[1]}
                </Text>
              </LinearGradient>
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
    height: hp('50%'),
  },
  waifuImage: {
    position: 'relative',
    height: hp('35%'),
    marginTop: 5,
  },
  info: {
    position: 'relative',
    top: -298,
    backgroundColor: COLORS.bgHighlight,
    alignItems: 'center',
    padding: 5,
  },
  waifuNemeText: {
    color: COLORS.textTitle,
    fontSize: 28,
  },
  waifuSeriesText: {
    color: COLORS.textTitle,
    fontSize: 20,
  },
  gallery: {
    justifyContent: 'center',
    alignContent: 'space-around',
    flexDirection: 'row',
    height: hp('30%'),
  },
  collection: {
    borderRadius: 20,
    width: hp('11%'),
    height: hp('11%'),
    marginLeft: 10,
    position: 'relative',
  },
  isFavMark: {
    position: 'relative',
    top: -20,
    left: 6,
    fontSize: 30,
    color: COLORS.favHeart,
  },
});
