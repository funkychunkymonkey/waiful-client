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

  return (
    <LinearGradient
      colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
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
            uri: waifu.waifuImages[selectedImageIndex].url,
          }}
        />
      </View>
      {waifu.waifuImages.length > 1 ? (
        <ScrollView
          style={{
            backgroundColor: COLORS.textSecondary,
            width: '100%',
          }}
          horizontal={true}>
          {waifu.waifuImages.slice(0, 3).map((x, i) => (
            <TouchableOpacity
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
      ) : (
        <></>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
