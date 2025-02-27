import { View, Text, Alert, ScrollView} from 'react-native'
import React, { useState } from 'react'
import FormField from '../../components/FormField'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import { addTask } from '../../lib/appWrite'
import { useGlobalContext } from '../../context/globalProvidder'
import { router } from 'expo-router'
import RNDateTimePicker from '@react-native-community/datetimepicker'

const add = () => {

  const {user} = useGlobalContext()

  const [datePickerOpen, setDatePickerOpen] = useState(false)

  const [form, setForm] = useState({
    title: '',
    dueDate: null,
    description: '',
  })

  async function submit(){
    if(form.title.trim()){
      await addTask({...form, owner: user.$id})
      router.replace('/home')
      setForm({
        title: '',
        dueDate: null,
        description: '',
      })
    }else{
      Alert.alert("Please name your task")
    }
  }

  const setDate = (event, date) => {

    const {
      type,
      nativeEvent: {timestamp, utcOffset},
    } = event;

    setForm({...form, dueDate: date})
    setDatePickerOpen(false)
  };

  return (
    <SafeAreaView className="bg-black-100 h-full px-6 py-5">
      <ScrollView className="h-full w-full" centerContent={true}>
        <View className="h-full w-full justify-center items-center">
          <FormField
            title="title"
            placeholder="enter task name"
            value={form.title}
            handleChangeText={(e) => setForm({...form, title: e})}
          />
          <FormField
            title="description"
            placeholder="enter task description"
            value={form.description}
            handleChangeText={(e) => setForm({...form, description: e})}
          />

          <Button 
            title={form.dueDate ? `${form.dueDate.getDate()}.${form.dueDate.getMonth()}` : 'Pick a due date'} 
            handle={() => {
              if(!form.dueDate) setForm({...form, dueDate: new Date()})
              if(!datePickerOpen)setDatePickerOpen(true)
            }} 
            containerStyles={'mt-10'}  
          />

          {form.dueDate && (
            <Button 
            title='remove due date' 
            handle={() => {
              setForm({...form, dueDate: null})
            }} 
            containerStyles={'mt-10'}  
            />
          )}

          {(datePickerOpen && (
            <RNDateTimePicker
              value={form.dueDate}
              onChange={setDate}
            />
          ))}

          

          <Button
            title='Add task'
            handle={() => submit()}
            containerStyles="mt-10"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default add