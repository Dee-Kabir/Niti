import firebase from "../firebase";
const usersRef = firebase.firestore().collection("users");
const doctorsRef = firebase.firestore().collection("doctors");
const hospitalsRef = firebase.firestore().collection("hospitals");
const filesRef = firebase.storage().ref("files");
export const setLanguageCode = () => {
  firebase.auth().useDeviceLanguage();
};
export const sigininWithPhoneNumber = (phone, recaptcha) => {
  let phoneNumber = "+91" + phone;
  return firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha);
};
export const firebaseLogin = (email, password) => {
  console.log(email, password);
  return firebase.auth().signInWithEmailAndPassword(email, password);
};
export const firebaseRegister = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};
export const editHospitalInfo = async (data, id) => {
  return await hospitalsRef.doc(`${id}`).update(data);
};
export const editInfo = async (name, address, state, city, id) => {
  return await usersRef
    .doc(`${id}`)
    .update({
      name: name.toUpperCase(),
      address,
      state: state.toUpperCase(),
      city: city.toUpperCase(),
    });
};

export const addDoctor = async (hospitalId, newDoctorKey) => {
  return await hospitalsRef.doc(`${hospitalId}`).update({
    doctors: firebase.firestore.FieldValue.arrayUnion(newDoctorKey),
  });
};
const addDoctortoList = async (mobileNumber) => {
  return doctorsRef.doc(`${mobileNumber}`);
};
export const existornot = async(mobileNumber) => {
  return (await doctorsRef.doc(mobileNumber).get()).exists
}
export const addDoctortoHospital = async (hospitalId, doctor_Info, photo) => {
  const newDoctorKey = await addDoctortoList(doctor_Info.mobileNumber);
  if(!(await newDoctorKey.get()).exists){
    await newDoctorKey
    .set({
      ...doctor_Info,
      token: 100000,
      available: true,
      hospitalId: hospitalId,
    })
    .then(() => {
      newDoctorKey
        .collection("appointments")
        .doc("pendingAppointments")
        .set({ appointments: [] });
      newDoctorKey
        .collection("appointments")
        .doc("completedAppointments")
        .set({ appointments: [] });
      const storageRefphoto = filesRef
        .child(newDoctorKey.id)
        .child("photo")
        .put(photo, "image/jpeg");
      storageRefphoto.on(
        "state_changed",
        (snap) => {},
        (err) => {
          console.log(err);
        },
        () => {
          storageRefphoto.snapshot.ref
            .getDownloadURL()
            .then((downloadURLphoto) => {
              newDoctorKey.update({
                photo: downloadURLphoto,
              });
            });
        }
      );
    });
  return await addDoctor(hospitalId, newDoctorKey);
  }
};

export const findDoctorByName = async (name, category) => {
  let value = name.toUpperCase();
  return await doctorsRef.where(`${category}`, "==", `${value}`).get();
};
export const uploadFileToFirestore = async (data) => {
  // data.map((d) => {
  //   const doctorRef = doctorsRef.doc(`+91${d.mobileNumber}`)
  //   doctorRef.set({...d,token: 100000,available: true,fee: 0,state: "GUJARAT"}).then(()=>{
  //     doctorRef.collection("appointments").doc("pendingAppointments").set({appointments: []})
  //     doctorRef.collection("appointments").doc("completedAppointments").set({appointments: []})
  //   })
  // }

  // )
  data.map((d) => {
    firebase.firestore().collection("dispensary").doc().set(d);
  });
};
export const savedoctor = async (
  name,
  email,
  mobileNumber,
  qualification,
  speciality,
  jobType,
  servingType,
  fee,
  workTime,
  weekDays,
  address,
  state,
  city,
  photo,
  proof
) => {
  const doctorRef = doctorsRef.doc(`+91${mobileNumber}`);
  return await doctorRef
    .set({
      name: name.toUpperCase(),
      email: email,
      token: 100000,
      fee,
      mobileNumber,
      qualification,
      speciality,
      jobType,
      servingType,
      workTime,
      weekDays,
      address,
      state: state.toUpperCase(),
      city: city.toUpperCase(),
      available: true,
    })
    .then(() => {
      doctorRef
        .collection("appointments")
        .doc("pendingAppointments")
        .set({ appointments: [] });
      doctorRef
        .collection("appointments")
        .doc("completedAppointments")
        .set({ appointments: [] });
      let id = doctorRef.id;
      const storageRefphoto = filesRef
        .child(id)
        .child("photo")
        .put(photo, "image/jpeg");
      const storageRefProof = filesRef
        .child(id)
        .child("proof")
        .put(proof, "image/jpeg");
      storageRefphoto.on(
        "state_changed",
        (snap) => {},
        (err) => {
          console.log(err);
        },
        () => {
          storageRefphoto.snapshot.ref
            .getDownloadURL()
            .then((downloadURLphoto) => {
              doctorRef.update({
                photo: downloadURLphoto,
              });
            })
            .then(() => {
              storageRefProof.on(
                "state_changed",
                (snap) => {},
                (err) => {
                  console.log(err);
                },
                () => {
                  storageRefProof.snapshot.ref
                    .getDownloadURL()
                    .then((downloadURLproof) => {
                      doctorRef.update({
                        proof: downloadURLproof,
                      });
                    })
                    .then(() => console.log("done"));
                }
              );
            });
        }
      );
    });
};
export const findHospitals = async (value, type) => {
  let val = value.toUpperCase();
  return await hospitalsRef.where(`${type}`, "==", `${val}`).get();
};
export const editDoctor = async (
  name,
  email,
  id,
  mobileNumber,
  qualification,
  jobType,
  servingType,
  workTime,
  weekDays,
  address,
  speciality,
  state,
  city
) => {
  return await doctorsRef.doc(`${id}`).update({
    name: name.toUpperCase(),
    email,
    mobileNumber,
    qualification,
    jobType,
    servingType,
    workTime,
    weekDays,
    address,
    speciality,
    state: state.toUpperCase(),
    city: city.toUpperCase(),
  });
};
export const getStates = async () => {
  return await (await firebase.database().ref("jsonfiles/states").get()).val();
};
export const setRoomIdOfHostInFirebase = async(roomId, userId) => {
  console.log("userId",userId,"roomId",roomId)
  await firebase.firestore().collection("doctors").doc(`+${userId}`).update({
    roomId: roomId
  })
}
export const getRoomId = async(doctorId) => {
  console.log("doctorId",doctorId)
  return await (await firebase.firestore().collection("doctors").doc(`+${doctorId}`).get()).data().roomId
}