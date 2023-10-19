import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ValetLoanerScreen } from '../../features/valet/screens/valet.loaner.screen'
import { ValetScreen } from '../../features/valet/screens/valet.screen'
import { MapNavigator } from './map.navigation'
import { HomeScreen } from '../../features/main/screen/home.screen'

const Stack = createStackNavigator()

export const ValetNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="ValetScreen" component={ValetScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}
