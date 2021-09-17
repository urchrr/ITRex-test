import './InfoForm.css'

const InfoForm = ({data}) => {
    const {adress, description, firstName, lastName} = data
    const {zip, state, city, streetAddress} = adress
    return (
        <div>
            <h3>Profile info: </h3>
            <ul className={'infoForm__list'}>
                <li className={'infoForm__li'}><span>Selected profile:</span> {firstName + ' ' + lastName}</li>
                <li className={'infoForm__li'}><span>Description: </span> {description}</li>
                <li className={'infoForm__li'}><span>Address: </span> {streetAddress}</li>
                <li className={'infoForm__li'}><span>City: </span> {city}</li>
                <li className={'infoForm__li'}><span>State: </span> {state}</li>
                <li className={'infoForm__li'}><span>Index: </span> {zip}</li>
            </ul>
        </div>
    )
}

export default InfoForm
