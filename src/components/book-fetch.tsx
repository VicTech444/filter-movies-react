import { bookResponse } from "../interfaces/interfaces";

export const bookInformation = async (): Promise<bookResponse> => {
    let response = await fetch('./src/assets/books.json');
    return response.json();
}