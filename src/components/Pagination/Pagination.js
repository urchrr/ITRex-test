import './Pagination.css'

const Pagination = ({data, onClick}) => {
    return (
        <div>
            <button onClick={onClick} name={'previousPage'}>Previous</button>
            {data.map(i => <button value={i} onClick={onClick} name={`page-${i}`}>{i}</button>)}
            <button onClick={onClick} name={'nextPage'}>Next</button>
        </div>
    )
}

export default Pagination
