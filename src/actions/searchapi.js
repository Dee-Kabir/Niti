import {placeToken,placeapi,placeemail} from "../Config"
const generateToken = async() => {
    return await fetch('https://www.universal-tutorial.com/api/getaccesstoken',{
        method:'GET',
        headers:{
            'Accept': 'application/json',
            'api-token': placeapi,
            'user-email': placeemail
        }
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const getdata = async(category) => {
    // let placeToken ;
    // await generateToken().then(data => {
    //     placeToken = data.auth_token
    //     console.log(placeToken)
        
    // })
    return await fetch(`https://www.universal-tutorial.com/api/${category}/`,{
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${placeToken}`,
            'Accept': 'application/json',
            'api-token': placeapi,
            'user-email': placeemail
        }
    }).then(res => res.json())
    .catch(err => console.log(err))
    
}
export const getDropdownList = async(category) => {
    return await fetch().then(res => res.json())
    .catch(err => console.log(err))
}