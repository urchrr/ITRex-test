import './Pagination.css'

const Pagination = ({data, onClick, currentPage}) => {
    return (
        <ul className={'pagination'} key={'prev'}>
            <li className={'pagination__li'}>
                <button className={'pagination__button'} onClick={onClick} name={'previousPage'}>Previous</button>
            </li>
            {data.map(i => <li className={'pagination__li'} key={i}>
                <button className={`pagination__button ${currentPage === i ? 'active' : ''}`} value={i}
                        onClick={onClick} name={`page-${i}`}>{i}</button>
            </li>)}
            <li className={'pagination__li'} key={'next'}>
                <button className={'pagination__button'} onClick={onClick} name={'nextPage'}>Next</button>
            </li>
        </ul>
    )
}

export default Pagination
