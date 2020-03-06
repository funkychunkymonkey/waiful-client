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
//import LottieView from 'lottie-react-native';
import {useFocusEffect} from '@react-navigation/native';
import utils from '../utils.js';
import Loading from './Loading.js';

export default function Collection() {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  const [selectedWaifu, setSelectedWaifu] = useState(null);

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

  const fav = waifu => {
    console.log(waifu);
    if (!waifu.isFavorite) {
      utils.setFavWaifu(waifu.malId);
      waifu.isFavorite = true;
      alert(`expected true:  ${waifu.isFavorite}`);
    } else {
      utils.setUnfavWaifu(waifu.malid);
      waifu.isFavorite = false;
      alert(`expected false:  ${waifu.isFavorite}`);
    }
    setCollection(
      collection.map(w => {
        if (w.id === waifu.id) w.isFavorite = waifu.isFavorite;
        return w;
      }),
    );
  };

  if (loading) return <Loading />;
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Collection</Title>
        </Body>
        <Right />
      </Header>
      <Content style={styles.body}>
        <View style={styles.showView}>
          {selectedWaifu ? (
            <>
              <Image
                style={styles.waifuImage}
                source={{
                  uri: selectedWaifu.imageUrl,
                }}
                resizeMode="contain"
              />
              <TouchableOpacity onPress={() => fav(selectedWaifu)}>
                <Text style={styles.fav}>☆</Text>
              </TouchableOpacity>
            </>
          ) : (
            <></>
          )}
        </View>
        <ScrollView contentContainerStyle={styles.gallery} horizontal={true}>
          {collection.length !== 0 ? (
            collection.map(waifu => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedWaifu(waifu);
                  }}>
                  <>
                    <Image
                      style={styles.collection}
                      source={{
                        uri: waifu.imageUrl,
                      }}
                    />
                    {waifu.isFavorite ? <Text>★</Text> : <Text>☆</Text>}
                  </>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text>No collection yet.</Text>
          )}
        </ScrollView>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fed14dff',
  },
  waifuImage: {
    position: 'relative',
    zIndex: 0,
    width: 450,
    height: 400,
  },
  fav: {
    width: 100,
    height: 100,
    textAlign: 'center',
    position: 'relative',
    backgroundColor: '#fff',
    fontSize: 30,
    zIndex: 1,
    top: -50,
    left: 20,
  },
  showView: {
    height: 450,
  },
  gallery: {
    justifyContent: 'center',
    alignContent: 'space-around',
    flexDirection: 'row',
    height: 300,
  },
  collection: {
    width: 100,
    height: 100,
    margin: 10,
  },
});
