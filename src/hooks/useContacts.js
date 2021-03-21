import axios from 'axios'
import React from 'react'

export const useContacts = () => {
    const [data, setData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [isError, setIsError] = React.useState(false)

    React.useEffect(() => {
        const getContacts = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get('https://randomuser.me/api/?results=15')
                const { results, error } = await response.data
                if (error) {
                    throw new Error(error)
                }
                setData(results)
                setIsError(false)
            } catch (e) {
                setIsError(true)
            } finally {
                setIsLoading(false)
            }
        }
        getContacts()
    }, [])
    return {
        data,
        isLoading,
        isError,
    }
}
