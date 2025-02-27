import { useState, useEffect } from "react"
import { Alert } from "react-native"

const useAppwrite = (fn) => {
    const [data, setData] = useState([])
    
    const [completeTasks, setCompleteTasks] = useState(0)

    const fetchData = async () => {

        try {
            const response = await fn()
            setData(response)
            setCompleteTasks(data.filter((task) => task.checked).length)
        } catch (error) {
            Alert.alert('error', error.message)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const refetch = () => fetchData()
    return {data, refetch, completeTasks}
}

export default useAppwrite