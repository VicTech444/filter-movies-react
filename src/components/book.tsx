import React, { ReactElement } from "react";
import '../styles/book.css'
import { bookProps } from "../interfaces/interfaces";

export const Book = ({ cover, id, onImgClick, svgComponent }: bookProps): ReactElement<HTMLDivElement> => {

    return (
        <div id={id} className="book-card" style={{backgroundImage: `url(${cover})`}} onClick={onImgClick as () => void}>
             {svgComponent}   
        </div>
    )
}