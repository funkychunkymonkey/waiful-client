import * as React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, TouchableOpacity, Image, View} from 'react-native';
import {Badge} from 'react-native-elements';
import {useZ, useCollectionZ} from '../../zustand';
import {Content} from 'native-base';
import styles from '../style/Collection';

export default function Collection({checked}) {
  const waifus = useZ(z => z.waifus);
  const setSelectedIndex = useCollectionZ(z => z.setSelectedIndex);

  const getGalleryItem = i => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedIndex(i);
        }}>
        <Image
          style={styles.collection}
          source={{
            uri: waifus[i].imageUrl,
          }}
        />
        <View style={styles.isFavMarkView}>
          <Text style={styles.isFavMarkHeart}>
            {waifus[i].isFavorite ? '♥' : ' '}
          </Text>
          <Badge value={waifus[i].level} status="warning" />
        </View>
      </TouchableOpacity>
    );
  };
  const pairCollection = [];
  const filteredId = checked
    ? waifus
        .map((waifu, i) => (waifu.isFavorite ? i : -1))
        .filter(x => x !== -1)
    : waifus.map((_, i) => i);
  for (let i = 0; i < filteredId.length; i += 2) {
    pairCollection.push(
      <View key={i}>
        {getGalleryItem(filteredId[i])}
        {filteredId.length > i + 1 && getGalleryItem(filteredId[i + 1])}
      </View>,
    );
  }

  return (
    <Content style={styles.content1}>
      <ScrollView contentContainerStyle={styles.gallery} horizontal={true}>
        {waifus.length !== 0 ? (
          pairCollection
        ) : (
          <Text style={styles.waifuNemeText}> No collection yet.</Text>
        )}
      </ScrollView>
    </Content>
  );
}

