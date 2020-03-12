import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import COLORS from '../../color';

export default function DetailLevel({waifu}) {
  return (
    <View
      style={{
        width: wp(100),
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
      }}>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: COLORS.textTitle,
            width: 100,
            height: 100,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <Text
            style={{
              color: COLORS.textHighlight,
              fontSize: 18,
              position: 'absolute',
              top: 8,
            }}>
            LEVEL
          </Text>
          <Text
            style={{
              color: COLORS.textSecondary,
              fontSize: 48,
            }}>
            {waifu.level}
          </Text>
          <Text
            style={{
              color: COLORS.textHighlight,
              position: 'absolute',
              bottom: 10,
            }}>
            / {waifu.waifuImages.length * 10}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 10,
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: COLORS.bgSecondary,
            width: '100%',
            height: 50,
            borderRadius: 20,
            overflow: 'hidden',
            borderColor: COLORS.bgHighlight,
            borderWidth: 1,
            marginBottom: 10,
          }}>
          <View
            style={{
              backgroundColor: COLORS.bgPrimary,
              height: '100%',
              width: `90%`,
            }}
          />
          <View
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.textSecondary, fontSize: 20}}>
              90% completion
            </Text>
          </View>
        </View>
        <Text>Collect duplicates for levels and art!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
