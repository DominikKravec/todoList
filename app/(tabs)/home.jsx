import { View, Text, FlatList, RefreshControl, Alert, Modal, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import { router } from 'expo-router'
import Task from '../../components/Task'
import useAppWrite from '../../lib/useAppWrite'
import { deleteTask, getMyTasks } from '../../lib/appWrite'
import { useGlobalContext } from '../../context/globalProvidder'

const home = () => {

  const {user} = useGlobalContext()
  const {data: taskData, refetch, completeTasks} = useAppWrite(() => getMyTasks(user.$id))
  const [modal, setModal] = useState(false)

  const [refreshing, setRefreshing] = useState(false)

  async function onRefresh(){
    setRefreshing(true)
    try {
      refetch()
    } catch (error) {
      Alert.alert(error)
    }finally{
      setRefreshing(false)
    }
  }

  function deleteAllTasks (){
    taskData.forEach(task => deleteTask(task.$id))
  }

  return (
    <SafeAreaView className="bg-black-100 h-full px-6">
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        data={taskData}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <View>
            <Task
              task={item}
              fetchfn={() => getMyTasks(user.$id)}
            />
          </View>
        )}
        ListEmptyComponent={() => {
          return(
            <View className="h-[95vh] justify-center items-center">
              <Text className="text-white text-2xl">Your task list is empty</Text>
              <Button
                title="Add task"
                handle={() => {router.push('/add')}}
                containerStyles="mt-10"
              /> 
              
            </View>
          )
        }}
        ListHeaderComponent={() => {
          return(
            <View className="h-25 px-5 my-10">
              <Text className='text-white text-2xl'>Welcome {user ? user.username : ''}</Text>
              <Text className='text-white text-lg'>
                {completeTasks} / {taskData.length}
              </Text>
              <Button
                title="Remove All"   
                handle={() => {setModal(true)}}
                containerStyles="mt-5"
              />

              <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(!modal);
                }}>
                <View className='justify-center items-center h-full'>
                    <View className='justify-center items-start bg-black-100 border-blue-600 border px-5 py-5 rounded-xl w-[85vw] '>
                        <View className="w-full justify-end">
                            <TouchableOpacity 
                                className="border border-gray-400 w-5 justify-center items-center rounded-full h-5"
                                onPress={() => setModal(false)}
                            >
                                <Text className="text-gray-400">
                                    X
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                           <Text className="text-1.5xl text-white">Are you sure you want to delete all items?</Text>
                        </View>
                        <View className=" justify-center items-center w-full mt-2">
                            <Button
                                title="Delete All Items"
                                handle={() => {
                                    deleteAllTasks()
                                    setModal(false)
                                }}
                            />
                        </View>
                    </View>
                </View>
              </Modal>
            </View>            
          )
          
        }}
      />
    </SafeAreaView>
  )
}



export default home