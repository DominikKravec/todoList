import { View, Text } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import { router, Redirect } from 'expo-router'
import { useGlobalContext } from '../context/globalProvidder'

const index = () => {

    const {isLoggedIn} = useGlobalContext()

    if(isLoggedIn) return <Redirect href="/home"/>

    return (
        <View className="justify-center items-center bg-black-100 h-full">
            <Text className="text-2xl text-white">This is the to do list</Text>
            <Button
                title="Continue"
                handle={() => {router.push('/sign-in')}}
                containerStyles={'mt-10'}
            />
        </View>
    )
}

export default index