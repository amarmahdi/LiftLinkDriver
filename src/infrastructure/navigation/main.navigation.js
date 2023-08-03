import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from '../../features/main/screen/home.screen'
import { ValetNavigation } from './valet.navigation'
import { MapNavigator } from './map.navigation'
import { DetailsScreen } from '../../features/main/screen/details.screen'

const Stack = createStackNavigator()

export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Valet" component={ValetNavigation} />
      <Stack.Screen name="Map" component={MapNavigator} />
    </Stack.Navigator>
  )
}
