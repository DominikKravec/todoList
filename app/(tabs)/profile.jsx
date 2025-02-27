import { View, Text } from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import { signOut } from '../../lib/appWrite'
import { useGlobalContext } from '../../context/globalProvidder'
import { router } from 'expo-router'

const profile = () => {

  const {setUser, setIsLoggedIn} = useGlobalContext()

  const logout = async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)
    router.replace('/sign-in')

  }

  return (
    <View className="justify-center items-center h-full">

      <Button
        title="Log out"
        handle={() => { logout() }}
      />

      <Text>profile</Text>
    </View>
  )
}

export default profile