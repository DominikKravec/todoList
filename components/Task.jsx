import { View, Text, TouchableOpacity, Alert, Modal } from 'react-native'
import React, {useState} from 'react'
import { databaseSetIsChecked, deleteTask } from '../lib/appWrite'
import Button from './Button'
import useAppwrite from '../lib/useAppWrite'

const Task = ({task: {title, checked, dueDate, description, $id}, fetchfn}) => {

    const [isChecked, setIsChecked] = useState(checked)
    const [modal, setModal] = useState(false)

    const {refetch} = useAppwrite(fetchfn)

    const toggle = () => {
        try {
            databaseSetIsChecked($id, !isChecked)
        } catch (error) {
            Alert.alert(error)
        }
        setIsChecked(!isChecked)
        
    }
    
    let stringDate

    if(dueDate === null){
        stringDate = ""
    }else {
        dueDate = new Date(dueDate)
        stringDate = dueDate.getDate() + "." + dueDate.getMonth() + "." + dueDate.getFullYear()
    }

    return (
        <View className="flex flex-row space-x-4">
            <View className="flex flex-row items-center space-x-4">
                <TouchableOpacity 
                    className={`${!isChecked ? "border border-blue-600" : "border border-blue-600 bg-blue-600"} h-5 w-5`}
                    onPress={() => { toggle() }}
                >           
                </TouchableOpacity>
                <Text 
                    className=" text-lg text-white max-w-[51vw] text-ellipsis"
                    numberOfLines={1}
                >
                    {title}
                </Text>
            </View>
            <View className="flex flex-row items-center space-x-4 justify-end">
                {stringDate && (
                    <Text className="text-1.5xl text-white">
                        {stringDate}
                    </Text>
                )}
                
                <TouchableOpacity 
                    className="border border-gray-400 w-5 justify-center items-center rounded-full h-5"
                    onPress={() => setModal(true)}
                >
                    <Text className="text-gray-400 ">
                        i
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(!modal);
                }}>
                <View className='justify-center items-center h-full'>
                    <View className='justify-center items-start border-blue-600 bg-black-100 border px-5 py-5 rounded-xl w-[85vw]'>
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
                            <Text className='text-white text-lg'>
                                {title}
                            </Text>
                            {stringDate && (
                                <Text className="text-1.5xl text-white">
                                    {stringDate}
                                </Text>
                            )}
                            {description && (
                                <Text className="text-1 text-white">
                                    {description}
                                </Text>
                            )}
                        </View>
                        <View className=" justify-center items-center w-full mt-2">
                            <Button
                                title="Delete task"
                                handle={() => {
                                    deleteTask($id)
                                    setModal(false)
                                    refetch()
                                }}
                            />
                        </View>



                    </View>
                </View>
            </Modal>
            
        </View>
    )
}

export default Task