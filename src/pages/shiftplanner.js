import React, { useState } from "react";
import ShiftTable from "../components/ShiftTable";
import ShiftForm from "../components/ShiftForm";
import { checkConsecutiveShifts } from "../utils/validation";
import axios from "axios";

const ShiftPlanner = () => {
  const [people, setPeople] = useState([{ name: "", leaves: "", shifts: "" }]);
  const [backups, setBackups] = useState([{ name: "", leaves: "", shifts: "" }]);
  const [errorMessage, setErrorMessage] = useState("");
  const [shiftData, setShiftData] = useState([]);

  const handleAddPerson = () => {
    const newPerson = { name: "", leaves: "", shifts: "" };
    const newBackup = { name: "", leaves: "", shifts: "" };
    setPeople([...people, newPerson]);
    setBackups([...backups, newBackup]);
  };

  const handleSaveShiftPerson = async () => {
    // Check for consecutive shifts before saving
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

    const requests = people.map((person, index) => {
      return {
        name: person.name,
        leaves: person.leaves,
        backupName: backups[index]?.name,
        backupLeaves: backups[index]?.leaves,
        shifts: person.shifts.split(",").map(Number), // assuming shifts are input as a comma-separated string
        backupShifts: backups[index]?.shifts.split(",").map(Number), // same for backup shifts
      };
    });

    try {
      const response = await axios.post("http://localhost:8080/api/shifts", requests);
      setShiftData(response.data);
    } catch (error) {
      console.error("Error saving data", error);
    }
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
