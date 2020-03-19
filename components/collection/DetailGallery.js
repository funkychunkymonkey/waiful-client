import * as React from 'react';
import {ScrollView, Image, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../style/Collection';

export default function DetailGallery({waifu}) {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const images = waifu.waifuImages.slice(0, Math.floor(waifu.level / 10) + 1);

  if (images.length === 0) return <></>;

  return (
    <LinearGradient colors={['#111', '#111']} style={styles.imageContainer}>
      <View style={styles.imageView}>
        <Image
          style={styles.imageSize}
          source={{
            uri: images[selectedImageIndex].url,
          }}
        />
      </View>
      <ScrollView style={styles.body} horizontal={true}>
        {images.map((x, i) => (
          <TouchableOpacity
            style={{
              margin: 5,
            }}
            onPress={() => setSelectedImageIndex(i)}>
            <Image
              style={styles.imageThumbnail}
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

