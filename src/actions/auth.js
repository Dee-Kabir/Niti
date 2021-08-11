import firebase from "../firebase";
const usersRef = firebase.firestore().collection("users");
const doctorsRef = firebase.firestore().collection("doctors");
const hospitalsRef = firebase.firestore().collection("hospitals");
export const isAuthenticated = () => {
  return localStorage.getItem("user");
};
export const authenticateUser = async (token,type) => {
  if (localStorage) {
    localStorage.setItem("user", token);
    if(type==="user"){
      await getUser(token).then((data) => 
      localStorage.setItem("userInfo",JSON.stringify(data.data())))
    }else if(type === "doctor"){
      await getDoctor(token).then((data) => {
        localStorage.setItem("userInfo",JSON.stringify(data.data()));
      })
    }
    localStorage.setItem("userType", type === "user" ? "user" : "doctor");
  }
};
export const getDoctor = async(token) => {
  return await doctorsRef.doc(`${token}`).get()
}
export const authenticateHospital = async(token) => {
  if (localStorage) {
    localStorage.setItem("user", token);
    await getHospital(token).then((data) => {
      localStorage.setItem("userInfo", JSON.stringify(data.data()));
    });
    localStorage.setItem("userType", "hospital");
  }
}
export const getHospital = async(token) => {
  return await hospitalsRef.doc(`${token}`).get()
}
export const getUser = async (id) => {
  return await usersRef
    .doc(`${id}`).get()
};
export const checkUser = async (id,type) => {
  console.log("id",id)
  let result = false;
  if(type==="user")
  await checkUserb(id).then((data) => (result = data.exists));
  else
  await checkdoctorb(id).then(data => (result = data.exists))
  return result;
};
export const checkUserb = async (id) => {
  return await usersRef.doc(`${id}`).get();
};
export const checkdoctorb = async (id) => {
  return await doctorsRef.doc(`${id}`).get();
};
export const register = async ({
  name,
  mobileNumber,
  address,
  state,
  city,
  id,
}) => {
  return await usersRef.doc(`+91${mobileNumber}`).set({
    name: name,
    mobileNumber: '+91'+mobileNumber,
    address: address,
    state: state.toUpperCase(),
    city: city.toUpperCase(),
  });
};
export const registerHospital = async(hospital_Info,id) => {
  return await hospitalsRef.doc(`${id}`).set(hospital_Info)
}
export const signout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
      localStorage.removeItem("userInfo");
      window.location.reload();
    });
};
export const typeOfUser = () => {
  let user = localStorage.getItem("userType");
  return user;
};
