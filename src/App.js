import './App.css';
import {useEffect} from "react";
import * as api from './utils/api'
import {useDispatch, useSelector} from "react-redux";
import {setInitialData, setInfoFormData, setFilterValues, setCurrentPage, setSortValues} from "./redux/actions/actions";
import TableRow from "./components/TableRow";
import InfoForm from "./components/InfoForm";
import {checkLocalStorage, setLocalStorage} from "./utils/localStorage";
import {dataKey, rowsPerPage} from "./utils/constants";
import Pagination from "./components/Pagination";

function App() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.initialData)
    const formValues = useSelector((state) => state.infoFormState)
    const currentPage = useSelector((state) => state.currentPage)
    const filterValues = useSelector((state) => state.filterValues)
    const sortValues = useSelector((state) => state.sortValues)

    useEffect(() => {
        if (!checkLocalStorage(dataKey)) {
            api
                .getData()
                .then(res => {
                    dispatch(setInitialData(res))
                    setLocalStorage(dataKey, res)
                })
                .catch(err => console.log(err));
        }
    }, [])


    const filteredByName = (array) => array.filter((item) => {
        const search = filterValues.name.toLowerCase();
        const firstName = item.firstName === null ? 'null' : item.firstName.toLowerCase();
        const lastName = item.lastName === null ? 'null' : item.lastName.toLowerCase();
        return (firstName && true && firstName.includes(search)) || (lastName && true && lastName.includes(search))
            ? item
            : console.log('nothing found')
            ;
    });

    const getStates = (data) => {
        let states = {}
        data.forEach(i => {
            states[i.adress.state] = i.adress.state
        })
        return Object.keys(states).sort((a, b) => a - b)
    }

    const filteredByState = (array) => array.filter(item => {
        const {state} = filterValues
        if (state && state !== '') return item.adress.state === state
        return item
    })

    const sortedResult = (array) => array.sort(function (a, b) {
        const {column, ascending} = sortValues
        let aPath
        let bPath
        if (column.includes('.')) {
            aPath = a[column.split('.')[0]][column.split('.')[1]]
            bPath = b[column.split('.')[0]][column.split('.')[1]]
        } else {
            aPath = a[column]
            bPath = b[column]
        }
        if (aPath > bPath) {
            return ascending ? 1 : -1;
        }
        if (aPath < bPath) {
            return ascending ? -1 : 1;
        }
        // a === b
        return 0;
    })

    // ascending a -> z, descending z -> a
    const Chevron = ({id}) => {
        const {column, ascending} = sortValues
        const qt = id === column ? ascending : false;
        return qt ? <span>&#9650;</span> : <span>&#9660;</span>
    }

    const resultDataArray = () => {
        const f1 = filteredByName(data)
        const f2 = filteredByState(f1)
        return sortedResult(f2)

    }

    const rows = resultDataArray().length;
    const totalPages = Math.ceil(rows / rowsPerPage);

    const visibleDataArray = () =>
        resultDataArray().slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)


    const pages = () => {
        let pages = []
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
        return pages
    }

    const handleChange = (e) => {
        const {value, name} = e.target
        dispatch(setFilterValues({value, name}))
    }

    const handleSorting = (e) => {
        const {id} = e.target
        const {column, ascending} = sortValues
        if (column === id) dispatch(setSortValues({ascending: !ascending, column: id}))
        else dispatch(setSortValues({ascending: true, column: id}))
    }

    const handlePageChange = (e) => {
        const {value, name} = e.target
        if (name === 'previousPage') {
            let newPage = currentPage === 1 ? currentPage : (currentPage - 1)
            dispatch(setCurrentPage(newPage))
        }
        if (name === 'nextPage') {
            let newPage = currentPage < totalPages ? currentPage + 1 : currentPage
            dispatch(setCurrentPage(newPage))
        } else if (name.includes('page')) {
            dispatch(setCurrentPage(parseInt(value)))
        }
    }

    return (
        <div className={'page'}>
            <div className={'app'}>
                <label className={'app__search'}>Search by name: <input type="text" name={'name'}
                                                                        autoComplete={'off'}
                                                                        className={'app__search_input'}
                                                                        onChange={handleChange}/></label>
                <label className={'app__state'}>Filter by state:
                    <select name={'state'} onChange={handleChange} className={'app__state_input'}>
                        <option value={''}>---</option>
                        {getStates(data).map(i => <option value={i} key={i}>{i}</option>)}
                    </select>
                </label>
                <table border={1} className={'app__table'}>
                    <thead>
                    <tr>
                        {
                            Object.entries({
                                'id': 'Id',
                                'firstName': 'First Name',
                                'lastName': 'Last Name',
                                'email': 'Email',
                                'phone': 'Phone',
                                'adress.state': 'State'
                            })
                                .map(([key, value]) =>
                                    <td onClick={handleSorting} id={key} key={key}>{value} <Chevron id={key}/></td>
                                )}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        visibleDataArray()
                            .map(d =>
                                <TableRow key={d.id + d.firstName} data={d} onClick={(v) => {
                                    dispatch(setInfoFormData(v))
                                }}/>
                            )
                    }
                    </tbody>
                </table>
                <div className={'app__pagination'}><Pagination onClick={handlePageChange} data={pages()}
                                                               currentPage={currentPage}/></div>
                <div className={'app__infoForm'}><InfoForm data={formValues}/></div>
            </div>
        </div>
    );
}

export default App;
