import * as React from 'react';
import {ScrollView, Switch} from 'react-native-gesture-handler';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import {Badge} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import COLORS from '../../color';
import {useZ, useCollectionZ} from '../../zustand';
import {Content} from 'native-base';

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
    <Content style={{position: 'relative', zIndex: 10}}>
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
    backgroundColor: COLORS.textSecondary,
    width: '100%',
  },
  showView: {
    height: hp('52%'),
  },
  waifuImageWrapper: {
    height: hp('52%'),
    alignItems: 'center',
  },
  waifuImage: {
    marginTop: hp('1%'),
    height: hp('37%'),
    width: wp('100%'),
  },
  info: {
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
    height: hp('14%'),
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
    fontSize: hp('3%'),
  },
  waifuSeriesText: {
    color: COLORS.textTitle,
    fontSize: hp('2.5%'),
    textAlign: 'center',
  },
  gallery: {
    backgroundColor: COLORS.textSecondary,
    paddingTop: hp('3%'),
  },
  collection: {
    borderRadius: 20,
    width: hp('9%'),
    height: hp('9%'),
    marginLeft: wp('3%'),
    position: 'relative',
  },
  isFavMarkView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: -20,
  },
  isFavMarkHeart: {
    top: -4,
    right: -10,
    fontSize: 22,
    color: COLORS.favHeart,
  },
  trashIcon: {
    justifyContent: 'center',
    width: wp('20%'),
    height: '100%',
    padding: 10,
  },
});
