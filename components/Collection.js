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
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Collection({route}) {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  const [selectedWaifuIdx, setSelectedWaifuIdx] = useState(0);

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

  function sell(waifuIdx) {
    const waifu = collection[waifuIdx];
    utils
      .sellWaifu(waifu.malId)
      .then(result => {
        setCollection(collection.filter(x => x.id !== waifu.id));
        setSelectedWaifuIdx(0);
        route.params.popUpWaifu({
          waifu: null,
          gems: result,
          auto: false,
        });
      })
      .catch(e => alert(e));
  }

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
    <Container style={{backgroundColor: COLORS.textSecondary}}>
      <Header style={styles.header}>
        <Left />
        <Body>
          <Title style={styles.title}>Collection</Title>
        </Body>
        <Right />
      </Header>

      <Content style={styles.body}>
        <View style={styles.showView}>
          {collection[selectedWaifuIdx] ? (
            <>
              <LinearGradient
                colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
                style={styles.waifuImageWrapper}>
                <Image
                  style={styles.waifuImage}
                  source={{
                    uri: collection[selectedWaifuIdx].imageUrl,
                  }}
                  resizeMode="contain"
                />
              </LinearGradient>
              <View
                style={{
                  ...styles.info,
                }}>
                <FavButton
                  onPress={() => fav(selectedWaifuIdx)}
                  waifuIdx={selectedWaifuIdx}
                  isFavorite={collection[selectedWaifuIdx].isFavorite}
                />
                <View style={styles.infoText}>
                  <Text style={styles.waifuNemeText}>
                    {collection[selectedWaifuIdx].name.replace(
                      /&#(\d+);/g,
                      function(m, n) {
                        return String.fromCharCode(n);
                      },
                    )}
                  </Text>
                  <Text style={styles.waifuSeriesText}>
                    {collection[selectedWaifuIdx].series.name}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.trashIcon}
                  onPress={() => {
                    sell(selectedWaifuIdx);
                  }}>
                  <Icon name="trash" size={40} />
                </TouchableOpacity>
              </View>
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
    // backgroundColor: COLORS.bgPrimary,
  },
  showView: {
    height: hp('50%'),
  },
  waifuImageWrapper: {
    height: hp('35%'),
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.bgPrimary,
  },
  waifuImage: {
    height: '100%',
    width: 225,
  },
  info: {
    position: 'relative',
    backgroundColor: COLORS.bgHighlight,
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
    height: 100,
  },
  infoText: {
    height: '100%',
    justifyContent: 'center',
    padding: 0,
    flex: 1,
  },
  waifuNemeText: {
    color: COLORS.textTitle,
    textAlign: 'center',
    fontSize: 28,
  },
  waifuSeriesText: {
    color: COLORS.textTitle,
    fontSize: 20,
    textAlign: 'center',
  },
  gallery: {
    backgroundColor: COLORS.textSecondary,
    borderWidth: 0,
    paddingTop: 25,
    justifyContent: 'flex-start',
    alignContent: 'space-around',
    flexDirection: 'row',
    height: hp('30%'),
    width: '100%',
  },
  collection: {
    borderRadius: 20,
    width: hp('10%'),
    height: hp('10%'),
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
  trashIcon: {
    justifyContent: 'center',
    height: '100%',
    padding: 10,
  },
});
