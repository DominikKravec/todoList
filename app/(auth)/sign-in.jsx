import { View, Text, Alert } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import Button from '../../components/Button'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appWrite'
import { useGlobalContext } from '../../context/globalProvidder'

const SignIn = () => {

    const {setUser, setIsLoggedIn} = useGlobalContext()

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const submit = async () => {
        if(form.email && form.password){
            try {
                await signIn(form.email.toLowerCase(), form.password)
                const result = await getCurrentUser()
                setUser(result)
                setIsLoggedIn(true)

                router.replace('/home')
            } catch (error) {
                Alert.alert(error)
            }
            
        }else{
            Alert.alert("Fill in all the fields")
        }

    }

    return (
        <SafeAreaView className="h-full justify-center items-center bg-black-100 p-10">
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
                title="Sign In"
                containerStyles='mt-10'
                handle={() => {submit()}}
            />
            <View>
                <Link href="/sign-up" className=' text-blue-600 text-xl mt-5 decoration-blue-600 underline'>Sign up</Link>
            </View>

        </SafeAreaView>
    )
}

export default SignIn