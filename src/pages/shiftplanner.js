import React, { useState } from "react";
import ShiftTable from "../components/ShiftTable";
import ShiftForm from "../components/ShiftForm";
import ShiftCalender from "../components/ShiftCalender";
import { checkConsecutiveShifts } from "../utils/validation";
import axios from "axios";

const ShiftPlanner = () => {
  const [people, setPeople] = useState([{ name: "", leaves: [], shifts: 0 }]);
  const [backups, setBackups] = useState([{ name: "", leaves: [], shifts: 0 }]);
  const [errorMessage, setErrorMessage] = useState("");
  const [shiftData, setShiftData] = useState([]);

  const handleAddPerson = () => {
    setPeople([...people, { name: "", leaves: [], shifts: 0 }]);
    setBackups([...backups, { name: "", leaves: [], shifts: 0 }]);
  };

  const handleSaveShiftPerson = () => {
    for (let i = 0; i < people.length; i++) {
      if (
        checkConsecutiveShifts(people[i]) ||
        checkConsecutiveShifts(backups[i])
      ) {
        setErrorMessage("Consecutive shifts are not allowed!");
        return;
      }
    }

    setErrorMessage("");

    axios
      .post("http://localhost:5000/shifts", { people, backups })
      .then((response) => {
        setShiftData(response.data);
      })
      .catch((error) => {
        console.error("Error saving data", error);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <ShiftTable
        people={people}
        backups={backups}
        setPeople={setPeople}
        setBackups={setBackups}
      />
      <ShiftForm
        handleAddPerson={handleAddPerson}
        handleSaveShiftPerson={handleSaveShiftPerson}
        errorMessage={errorMessage}
      />
      {/* <ShiftCalender shiftData={shiftData} /> */}
    </div>
  );
};

export default ShiftPlanner;
