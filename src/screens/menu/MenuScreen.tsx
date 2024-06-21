import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { NewPalabraComponent } from './components/NewPalabraComponent'

export const MenuScreen = () => {

    //Hook useState: para manipular el modal
  const [showModal, setShowModal] = useState<boolean>(false);
    
  return (
    <View style={styles.root}>
        <Text>Mejores Puntuaciones</Text>
        <Button onPress={()=>setShowModal(true)}>Añadir Palabra</Button>
        <NewPalabraComponent
        showModal={showModal}
        setShowModal={setShowModal} />
    </View>
  )
}
