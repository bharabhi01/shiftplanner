import React from "react";
import { Button, Form } from "semantic-ui-react";

const ShiftForm = ({
  people,
  handleAddPerson,
  handleSaveShiftPerson,
  errorMessage,
}) => {
  return (
    <Form>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <Button primary onClick={handleAddPerson}>
        Add Person
      </Button>
      <Button secondary onClick={handleSaveShiftPerson}>
        Save Shift
      </Button>
    </Form>
  );
};

export default ShiftForm;
