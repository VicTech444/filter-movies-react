import { ChangeEvent, useState } from "react";
import { bookInformation } from "./book-fetch";
import { Book } from "./book";
import { BookFilter } from "./book-filter";
import { urlExpression } from "./urlExp";
import { Backspace } from "./backspace-svg";
import { bookProps, bookResponse, genreFilter, amountPages } from "../interfaces/interfaces";
import { effect } from "../hooks/hooks";
import '../styles/book-galery.css'


export const BookGalery = () => {
    const [bookData, setBookData] = useState<bookResponse | null>(null);
    const [bookPageFilter, setBookPageFilter] = useState<amountPages>({ minPages: 1 });
    const [bookGenreFilter, setBookGenreFilter] = useState<genreFilter>({ genre: "" });
    const [lectureList, setLectureList] = useState<bookProps[]>([])
    const [showLectureList, setShowLectureList] = useState<boolean>(false);

    
    effect({bookInformation, setBookData})

    const genreSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
        if (bookGenreFilter.genre === ev.target.value) return;
        setBookGenreFilter({ genre: ev.target.value });
    }

    const pagesFilter = (ev: ChangeEvent<HTMLInputElement>) => {
        setBookPageFilter({ minPages: parseInt(ev.target.value) });
    }

    const saveLectureList = (ev: MouseEvent) => {
        let target = (ev.target as HTMLElement);

        let url = urlExpression(target)

        let src = { cover: url, id: target.id };

        let newLectureList = lectureList.slice();

        newLectureList.push(src);

        let noDuplicatesCover = new Set<string>();
        let lectureListSet = new Set<bookProps>();

        newLectureList.forEach(element => {
            if (!noDuplicatesCover.has(element.cover)) {
                noDuplicatesCover.add(element.cover);

                lectureListSet.add({ cover: element.cover, id: element.id })
            }
        });

        let noDuplicatedList: bookProps[] = [];

        [...lectureListSet].forEach(element => {

            noDuplicatedList.push({ cover: element.cover, id: element.id })
        })

        setLectureList(noDuplicatedList);

        if (showLectureList) return;

        setShowLectureList(true);
    }

    const removeFromLectureList = (ev: MouseEvent) => {
        let target = (ev.target as HTMLElement);

        if (!target) {
            return;

        } else if (target instanceof SVGPathElement) {
            if (target.parentElement?.parentElement) target = target.parentElement.parentElement;

        } else if (target instanceof SVGElement){
            if (target.parentElement) target = target.parentElement;
        }

        let newLectureList = lectureList.filter(element => {
            if (element.id !== target.id) {
                return element;
            }
        })

        setLectureList(newLectureList);

        let bolLectureList = newLectureList.length === 0 ? !showLectureList : showLectureList;

        if(bolLectureList) return;

        setShowLectureList(bolLectureList)
    }

    let filterGenre = (bookGenreFilter.genre === ""
        || bookGenreFilter.genre === "Todos") ? bookData?.library : (

        bookData?.library.filter(element => {
            if (element.book.genre === bookGenreFilter.genre) return element;
        })
    )

    let filterPages = (bookPageFilter.minPages === 1) ? bookData?.library : (
        bookData?.library.filter(element => {
            if (element.book.pages >= bookPageFilter.minPages) return element;
        })
    )

    let setPages = new Set(filterPages);
    let setGenres = new Set(filterGenre);

    let filter = [...setPages].filter(element => {
        return setGenres.has(element)
    })

    let amountBooks = bookData ? filter.length : 10;
    let allBookGenres = bookData?.library;

    let listIsVisible = showLectureList ? 'showing' : 'not-showing';

    return (
        <div className="book-galery">
            <div className="book-menu">
                <BookFilter amountBooks={amountBooks}
                    booksInfo={allBookGenres}
                    genreSelect={(ev : ChangeEvent<HTMLSelectElement>) => genreSelect(ev)}
                    pageFilter={(ev : ChangeEvent<HTMLInputElement>) => pagesFilter(ev)}
                    minPageFilter={bookPageFilter} />
                <div className="book-container">
                    {filter.map(element => {
                        return (
                            <Book
                                key={element.book.ISBN}
                                cover={element.book.cover}
                                id={element.book.ISBN}
                                onImgClick={(ev: MouseEvent) => saveLectureList(ev)} />
                        )
                    })}
                </div>
            </div>
            <div className={`lecture-list ${listIsVisible}`} >
                <header>
                    <h1>Lecture list</h1>
                </header>
                <div className="list-content">
                    {lectureList.map((element, index) => {
                        return (
                            <Book
                                key={index}
                                cover={element.cover}
                                id={element.id}
                                onImgClick={(ev: MouseEvent) => removeFromLectureList(ev)}
                                svgComponent={<Backspace/>}
                            />
                        )
                    })}
                </div>
            </div>
        </div>

    )
}

