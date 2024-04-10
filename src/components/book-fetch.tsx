import { bookResponse } from "../interfaces/interfaces";
import bookData from '../assets/books.json'

export const bookInformation = ():bookResponse => {
    return bookData
}