import firebase from "../firebase"

export const getdata = async(category) => {
    return await firebase.database().ref("jsonfiles").child(`${category}`).once("value",snap => snap)
}
export const getDropdownList = async(category) => {
    return await fetch().then(res => res.json())
    .catch(err => console.log(err))
}