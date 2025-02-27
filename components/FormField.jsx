import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'

import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-white font-pmedium">{title}</Text>
      <View className="w-full h-16 px-4 bg-blue-600 rounded-2xl items-center flex-row">
        <TextInput
            className="flex-1 text-white font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#F9F8FA"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'password' && !showPassword}
        />

        {title === 'password' && (
            <TouchableOpacity onPress={() => {setShowPassword(!showPassword)}}>
                <Image 
                    source={!showPassword ? icons.eye : icons.eyeHide}
                    resizeMode='contain'
                    className="w-6 h-6"
                />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField