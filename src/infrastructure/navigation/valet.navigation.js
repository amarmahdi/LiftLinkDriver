import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ValetLoanerScreen } from '../../features/valet/screens/valet.loaner.screen'
import { ValetCarInfoScreen } from '../../features/valet/screens/valet.carinfo.screen'

const Stack = createStackNavigator()

export const ValetNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="ValetCarInfo" component={ValetCarInfoScreen} />
      <Stack.Screen name="ValetCamera" component={ValetLoanerScreen} />
    </Stack.Navigator>
  )
}
