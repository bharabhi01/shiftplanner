import React from "react";
import { Table, Form } from "semantic-ui-react";

const ShiftTable = ({ people, backups, setPeople, setBackups }) => {
  // Function to handle input changes for shifts and leaves
  const handleInputChange = (index, value, field, type) => {
    const updatedList = type === "person" ? [...people] : [...backups];
    updatedList[index][field] = value; // Update shifts or leaves
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
          <Table.HeaderCell>Backup Shifts (Weeks)</Table.HeaderCell>
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
                onChange={(e) => handleInputChange(index, e.target.value, "name", "person")}
              />
            </Table.Cell>

            {/* Person's Leaves Input */}
            <Table.Cell>
              <Form.Input
                type="text"
                placeholder="Leaves (e.g., 2023-10-01, 2023-10-10)"
                value={person.leaves || ''}
                onChange={(e) => handleInputChange(index, e.target.value, "leaves", "person")}
              />
            </Table.Cell>

            {/* Person's Shifts Input */}
            <Table.Cell>
              <Form.Input
                type="text"
                placeholder="Shifts (Weeks, e.g., 1, 2, 3)"
                value={person.shifts || ''}
                onChange={(e) => handleInputChange(index, e.target.value, "shifts", "person")}
              />
            </Table.Cell>

            {/* Backup Name Input */}
            <Table.Cell>
              <Form.Input
                placeholder="Backup Name"
                value={backups[index]?.name}
                onChange={(e) => handleInputChange(index, e.target.value, "name", "backup")}
              />
            </Table.Cell>

            {/* Backup's Leaves Input */}
            <Table.Cell>
              <Form.Input
                type="text"
                placeholder="Backup Leaves (e.g., 2023-10-05)"
                value={backups[index]?.leaves || ''}
                onChange={(e) => handleInputChange(index, e.target.value, "leaves", "backup")}
              />
            </Table.Cell>

            {/* Backup's Shifts Input */}
            <Table.Cell>
              <Form.Input
                type="text"
                placeholder="Backup Shifts (Weeks, e.g., 1, 3, 5)"
                value={backups[index]?.shifts || ''}
                onChange={(e) => handleInputChange(index, e.target.value, "shifts", "backup")}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default ShiftTable;
