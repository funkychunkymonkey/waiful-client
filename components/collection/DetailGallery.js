import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../color';

export default function DetailGallery({waifu}) {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const images = waifu.waifuImages.slice(0, Math.floor(waifu.level / 10) + 1);

  if (images.length === 0) return <></>;

  return (
    <LinearGradient
      colors={['#111', '#111']}
      style={{
        width: wp(100),
        justifyContent: 'center',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        }}>
        <Image
          style={{
            width: 225,
            height: 350,
          }}
          source={{
            uri: images[selectedImageIndex].url,
          }}
        />
      </View>
      <ScrollView
        style={{
          backgroundColor: COLORS.textSecondary,
          width: '100%',
        }}
        horizontal={true}>
        {images.map((x, i) => (
          <TouchableOpacity
            key={i}
            style={{
              margin: 5,
            }}
            onPress={() => setSelectedImageIndex(i)}>
            <Image
              style={{
                borderRadius: 10,
                width: hp('8%'),
                height: hp('8%'),
                alignSelf: 'center',
              }}
              source={{
                uri: x.url,
              }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
