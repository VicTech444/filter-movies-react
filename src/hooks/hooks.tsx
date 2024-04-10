import { useEffect } from "react";
import { bookResponse } from "../interfaces/interfaces";

interface effectProps {
    bookInformation: () => bookResponse;
    setBookData: (data: bookResponse) => void;
}

export const effect = ({bookInformation, setBookData}: effectProps) => {
    useEffect(() => {
        const fetchCall = async () => {
            try {
                let data = await bookInformation();
                setBookData(data);
            } catch (error) {
                console.log(error)
            }
        }
    
        fetchCall();
    }, [])
}