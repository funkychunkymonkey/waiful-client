import * as React from 'react';
import {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import {Container, Header, Left, Body, Right, Title} from 'native-base';
import {Content} from 'native-base';
//import LottieView from 'lottie-react-native';
import {useFocusEffect} from '@react-navigation/native';
import utils from '../utils.js';

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

  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
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
            <Image
              style={styles.waifuImage}
              source={{
                uri: selectedWaifu.imageUrl,
              }}
              resizeMode="contain"
            />
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
                  <Image
                    style={styles.collection}
                    source={{
                      uri: waifu.imageUrl,
                    }}
                  />
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
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  body: {
    backgroundColor: '#fed14dff',
  },
  waifuImage: {
    width: 450,
    height: 400,
  },
  showView: {
    height: 400,
  },
  gallery: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'space-around',
    flexDirection: 'row',
    height: 300,
  },
  collection: {
    width: 100,
    height: 100,
    display: 'flex',
    margin: 10,
  },
});
