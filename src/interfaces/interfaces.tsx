import { ChangeEvent, ReactElement } from "react";

export interface filterProps {
    amountBooks: number;
    booksInfo: book[] | undefined;
    genreSelect: (ev: ChangeEvent<HTMLSelectElement>) => void;
    pageFilter: (ev: ChangeEvent<HTMLInputElement>) => void;
    minPageFilter: {
        minPages: number;
    };
}

export interface book {
    book: {
        title: string;
        pages: number;
        genre: string;
        cover: string;
        synopsis: string;
        year: number;
        ISBN: string;
        author: {
            name: string;
            otherBooks: Array<string>;
        }
    }
}
export interface bookProps {
    cover: string;
    ["id"]: string;
    onImgClick?: (ev: MouseEvent) => void;
    svgComponent?: ReactElement
}

export interface bookResponse {
    library: book[];
}

export type genreFilter = {
    genre: string;
}

export type amountPages = {
    minPages: number;
}