import TillNowCard from "../cards/TillNowCard";
import classes from "./ImageContainer.module.css";
import firebase from "../../firebase";
import { useEffect, useState } from "react";
const recordsRef = firebase
  .firestore()
  .collection("tillNowRecords")
  .doc("records");
const TillNow = ({ workDone }) => {
  const [values, setValues] = useState({
    consultationCompleted: 0,
    inseminationCompleted: 0,
    vaccineAdministered: 0,
    creditCards: 0,
    insuranceRolledOut: 0,
  });
  useEffect(() => {
    getRecords();
  }, []);
  const getRecords = () => {
    recordsRef.get().then((data) => setValues({ ...data.data() }));
  };
  return (
    <div className={classes.TillNow}>
      <div className={classes.TillNow_Heading}>Achievements Till Now</div>
      <div className={classes.TillNow_items}>
        {workDone.map((work, _) => (
          <TillNowCard
            key={work.title}
            service={work}
            numberDone={work && values[work.docName]}
          />
        ))}
      </div>
    </div>
  );
};
export default TillNow;
