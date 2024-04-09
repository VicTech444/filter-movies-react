import '../styles/book-filter.css'
import { filterProps } from '../interfaces/interfaces';

export const BookFilter = ({ amountBooks, booksInfo, genreSelect, pageFilter, minPageFilter }: filterProps) => {
    if (booksInfo) {

        let pagesAmount = booksInfo.map(element => element.book.pages);

        let maxPage = pagesAmount.sort((a, b) => b - a).splice(0, 1);

        let setNoRepeatedGenres = new Set(booksInfo.map(element => element.book.genre));
        let noRepeatedGenres = [...setNoRepeatedGenres];
        noRepeatedGenres.unshift('Todos');

        return (
            <div className="book-filter dp-flex fd-column" title='hola'>
                <div className="filter-header dp-flex fd-column">
                    <h1>{amountBooks} libros disponibles</h1>
                    <small>

                    </small>
                </div>
                <div className="filter-body dp-flex">
                    <div className="filter-page dp-flex fd-column">
                        <span>Filtrar por paginas</span>
                        <input onChange={pageFilter} 
                        type='range' 
                        className='filter-range' 
                        min={1} max={[...maxPage].toString()} 
                        title={minPageFilter.minPages.toString()}
                        name='filter range'/>
                    </div>
                    <div className="filter-genre dp-flex fd-column">
                        <span>Filtrar por genero</span>
                        <select className='select-genre' 
                        onChange={genreSelect}
                        id='select-genre'>
                            {noRepeatedGenres.map(element => {
                                return (
                                    <option key={element}>
                                        {element}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </div>
        )
    }

}