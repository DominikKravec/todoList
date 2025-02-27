import { View, Text, Alert } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import Button from '../../components/Button'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appWrite'
import { useGlobalContext } from '../../context/globalProvidder'

const SignIn = () => {

    const {setUser, setIsLoggedIn} = useGlobalContext()

    const [form, setForm] = useState({
        email: '',
        password: '',
        username: '',
    })

    const submit = async () => {
        if(form.email && form.password && form.username){
            try {
                const result = await createUser(form.username, form.email.toLowerCase(), form.password)
                setUser(result)
                setIsLoggedIn(true)

                router.replace('/home')
            } catch (error) {
                Alert.alert("Error creating the user")
            }
            
        }else{
            Alert.alert("Fill in all the fields")
        }

    }

    return (
        <SafeAreaView className="h-full justify-center items-center bg-black-100 p-10">

            <FormField
                title="username"
                placeholder="enter your username"
                value={form.username}
                handleChangeText={(e) => setForm({...form, username: e})}
            />

            <FormField
                title="email"
                placeholder="enter your email"
                value={form.email}
                handleChangeText={(e) => setForm({...form, email: e})}
            />

            <FormField
                title="password"
                placeholder="enter your password"
                value={form.password}
                handleChangeText={(e) => setForm({...form, password: e})}
            />

            <Button
                title="Sign Up"
                containerStyles='mt-10'
                handle={() => {submit()}}
            />
            <View>
                <Link href="/sign-in" className=' text-blue-600 text-xl mt-5 decoration-blue-600 underline'>Sign in</Link>
            </View>

        </SafeAreaView>
    )
}

export default SignIn