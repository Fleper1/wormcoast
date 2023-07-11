import {useState} from "react";

export const useFetching = (callback: any): [() => void, boolean, string] => {

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const fetching = async (): Promise<void> => {
        try {
            setIsLoading(true)
            await callback();
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }
    return [fetching, isLoading, error]
}