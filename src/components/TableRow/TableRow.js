import './TableRow.css'

const TableRow = ({data, onClick}) => {

    const {id, firstName, lastName, email, phone, adress} = data
    const handleClick = () => {
        onClick(data)
    }
    return (
        <tr onClick={handleClick} className={'table-row'}>
            <td>{id}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{adress.state}</td>
        </tr>
    )
}

export default TableRow
