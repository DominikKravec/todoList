import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({title, containerStyles, handle}) => {
  return (
    <View className={`bg-blue-500 rounded-3xl h-12 w-1/2 items-center justify-center ${containerStyles}`}>
      <TouchableOpacity onPress={() => handle()}>
        <Text className="text-xl text-white">
            {title}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Button