import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import {icons} from '../../constants'

const TabIcon = ({icon, color}) => {
  return(
    <View className="items-center justify-center gap-2">
      <Image 
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className="w-6 h-6"
      />
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#1662AF',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84,
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: 'Home',
            tabBarIcon: ({color}) => {
              return(
                <TabIcon
                  icon={icons.home}
                  color={color}
                  
                />
              )
            }

          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            headerShown: false,
            title: 'Add',
            tabBarIcon: ({color}) => {
              return(
                <TabIcon
                  color={color}
                  
                  icon={icons.plus}
                />
              )
            }
          }}
          
        />

        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: 'Profile',
            tabBarIcon: ({color}) => {
              return(
                <TabIcon
                  color={color}
                  icon={icons.profile}
                />
              )
            }
          }}
        />
        
      </Tabs>
    </>
  )
}

export default TabsLayout