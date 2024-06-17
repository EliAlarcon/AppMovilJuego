import React from 'react'
import { ImageBackground, SafeAreaView, View } from 'react-native'
import { Text } from 'react-native-paper'
import { styles } from '../../theme/styles'

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
    <ImageBackground source={require('../../assets/images/fondo.png')} resizeMode="stretch" style={styles.image}>
      <Text style={styles.textTitle}>Inside</Text>
    </ImageBackground>
  </View>
  )
}
