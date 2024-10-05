import React from "react";
import { Table, Form } from "semantic-ui-react";

const ShiftTable = ({ people, backups, setPeople, setBackups }) => {
  // Function to handle date changes
  const handleDateChange = (index, date, type) => {
    const updatedList = type === "person" ? [...people] : [...backups];
    updatedList[index].leaves = date;
    if (type === "person") {
      setPeople(updatedList);
    } else {
      setBackups(updatedList);
    }
  };

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Person Name</Table.HeaderCell>
          <Table.HeaderCell>Leaves</Table.HeaderCell>
          <Table.HeaderCell>Shifts (Weeks)</Table.HeaderCell>
          <Table.HeaderCell>Backup Name</Table.HeaderCell>
          <Table.HeaderCell>Backup Leaves</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {people.map((person, index) => (
          <Table.Row key={index}>
            {/* Person Name Input */}
            <Table.Cell>
              <Form.Input
                placeholder="Person Name"
                value={person.name}
                onChange={(e) => {
                  const updatedPeople = [...people];
                  updatedPeople[index].name = e.target.value;
                  setPeople(updatedPeople);
                }}
              />
            </Table.Cell>

            {/* Date Input for Person's Leaves */}
            <Table.Cell>
              <Form.Input
                type="date"
                value={person.leaves || ''}
                onChange={(e, { value }) => handleDateChange(index, value, "person")}
                placeholder="Select Leave Date"
              />
            </Table.Cell>

            {/* Shifts (Week Numbers) */}
            <Table.Cell>
              <Form.Input
                type="number"
                placeholder="Shifts (Week Numbers)"
                value={person.shifts}
                onChange={(e) => {
                  const updatedPeople = [...people];
                  updatedPeople[index].shifts = e.target.value
                    .split(",")
                    .map(Number);
                  setPeople(updatedPeople);
                }}
              />
            </Table.Cell>

            {/* Backup Name Input */}
            <Table.Cell>
              <Form.Input
                placeholder="Backup Name"
                value={backups[index]?.name}
                onChange={(e) => {
                  const updatedBackups = [...backups];
                  updatedBackups[index].name = e.target.value;
                  setBackups(updatedBackups);
                }}
              />
            </Table.Cell>

            {/* Date Input for Backup's Leaves */}
            <Table.Cell>
              <Form.Input
                type="date"
                value={backups[index]?.leaves || ''}
                onChange={(e, { value }) => handleDateChange(index, value, "backup")}
                placeholder="Select Backup Leave Date"
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default ShiftTable;