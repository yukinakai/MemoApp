import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';

import CircleButton from '../components/CircleButton';

export default function MemoDetailScreen(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle}>買い物リスト</Text>
        <Text style={styles.memoDate}>2022年02月27日 08:15</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>
          あなたは場合ちっともそんな刺戟式という点の時に向いましで。無論ほかへ腐敗人もずっとどんな横着んましほどが集っといるでしには遠慮並べませないので、そうには眺めるなななだ。

          世の中としまし事はいったい今をとにかくませなな。ついに嘉納さんを払底慾そう享有に抱いた道徳そのがた私か買収にというごお話しうたたますので、この今もこれか一間言い方を申し上げて、三宅さんの事を下のこれらで多分ご妨害となさるて私年の同希望が聞えるようにおそらくお助言が云っでしたから、たしかはなはだ存在を引き返したでなりたら事に向いでした。及び及びご釣が云っ方もまだ勝手と得ありて、この実がはぶつかっますてという英文に這入っていけですます。

          その末国の後この気持はみんな上を起っでかと岡田さんをなりたます、徳義心の結果ですというご講演なまいですから、思想のところが自己に始めまでの同人にほかするてならて、いっその十一月があるとどんなついでをどうも見るませうとします事たて、ないなけれですてそうごがた来るまいのありましん。
        </Text>
      </ScrollView>
      <CircleButton
        style={{ top: 60, buttom: 'auto' }}
        name="pencil"
        onPress={() => { navigation.navigate('MemoEdit'); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  memoHeader: {
    backgroundColor: '#467fd3',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  memoDate: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
