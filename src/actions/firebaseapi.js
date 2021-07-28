import firebase from "../firebase";
const usersRef = firebase.firestore().collection("users");
const doctorsRef = firebase.firestore().collection("doctors");
const hospitalsRef = firebase.firestore().collection("hospitals");
const filesRef = firebase.storage().ref("files")
export const setLanguageCode = () => {
  firebase.auth().useDeviceLanguage();
};
export const sigininWithPhoneNumber = (phone, recaptcha) => {
  let phoneNumber = "+91" + phone;
  return firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha);
};
export const firebaseLogin = (email,password) => {
  console.log(email,password)
  return firebase.auth().signInWithEmailAndPassword(email,password)
}
export const firebaseRegister = (email,password) => {
  return firebase.auth().createUserWithEmailAndPassword(email,password)
}
export const editHospitalInfo = async(data,id) => {
  return await hospitalsRef.doc(`${id}`).update(data)
}
export const editInfo = async (name,
  address,
  country,
  state,
  city,
  id,) => {
    return await usersRef.doc(`${id}`).update({name,address,country,state,city})
}

export const addDoctor = async(hospitalId,doctorId) => {
  return await hospitalsRef.doc(`${hospitalId}`).update({
    doctors: firebase.firestore.FieldValue.arrayUnion(doctorId)
  })
}
const addDoctortoList = async() => {
  return doctorsRef.doc()
}
export const addDoctortoHospital = async(hospitalId,doctor_Info,photo) =>{
  const newDoctorKey = await addDoctortoList()
  await (newDoctorKey).set({...doctor_Info,hospitalId: hospitalId}).then(()=>{
    const storageRefphoto = filesRef.child(newDoctorKey.id).child("photo").put(photo,"image/jpeg")
    storageRefphoto.on("state_changed",(snap)=>{},(err)=>{console.log(err)},()=>{
      storageRefphoto.snapshot.ref.getDownloadURL().then((downloadURLphoto)=>{
        newDoctorKey.update({
          photo:downloadURLphoto
        })
      })
    })
  })
  return await addDoctor(hospitalId,newDoctorKey.id)
}
export const getDoctors = async(hospitalId) => {
  return await doctorsRef.where("hospitalId","==",hospitalId).get()
}
export const findDoctorByName = async(name,category) => {
  let value = name.toUpperCase()
  return await doctorsRef.where(`${category}`,"==",`${value}`).get()
}
export const uploadFileToFirestore = async(data) => {
    data.map((d) => {
      firebase.firestore().collection("files").doc(`${d.SNo}${d.ADDL}`).set(d)
    })
}
export const savedoctor = async(name,uid,email,mobileNumber,qualification,jobType,servingType,workTime,weekDays,address,state,city,photo,proof) => {
  const doctorRef = doctorsRef.doc(`${uid}`);
  return await doctorRef.set({
    name,email,mobileNumber,qualification,jobType,servingType,workTime,weekDays,address,state,city
  }).then(()=>{
    let id = doctorRef.id;
    const storageRefphoto = filesRef.child(id).child("photo").put(photo,"image/jpeg")
    const storageRefProof = filesRef.child(id).child("proof").put(proof,"image/jpeg")
    storageRefphoto.on("state_changed",(snap)=>{
    },(err)=>{
      console.log(err)
    },()=>{
      storageRefphoto.snapshot.ref.getDownloadURL().then((downloadURLphoto)=>{
        doctorRef.update({
          photo: downloadURLphoto
        })
      }).then(()=>{
        storageRefProof.on("state_changed",(snap)=>{
        },(err)=>{
          console.log(err)
        },()=>{
          storageRefProof.snapshot.ref.getDownloadURL().then((downloadURLproof)=>{
            doctorRef.update({
              proof: downloadURLproof
            })
          }).then(()=> console.log("done"))
        })
      })
    })
  })
}