import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dialog, Portal, TextInput, Button } from "react-native-paper";
import { addStudent, updateStudent } from "@/app/DatabaseMethods";

const PopupExample = ({ student, onClose, onSave, IsNewEntry }) => {
  if (IsNewEntry) {
    student = {};
  }
  const [studentDetails, setStudentDetails] = useState({
    name: student.name || "",
    age: student.age?.toString() || "",
    class: student.class || "",
    dateOfJoining: student.dateOfJoining || "",
  });

  const setName = (name) => setStudentDetails((prev) => ({ ...prev, name }));
  const setAge = (age) => setStudentDetails((prev) => ({ ...prev, age }));
  const setClassName = (className) =>
    setStudentDetails((prev) => ({ ...prev, class: className }));
  const setDateOfJoining = (dateOfJoining) =>
    setStudentDetails((prev) => ({ ...prev, dateOfJoining }));

  const handleSave = () => {
    if (IsNewEntry) {
      addStudent(studentDetails);
    } else {
      updateStudent(student.id, studentDetails);
    }
    onClose();
  };

  return (
    <Portal>
      <Dialog visible onDismiss={onClose}>
        <Dialog.Title>
          {IsNewEntry ? "Add Student" : "Edit Student"}
        </Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Name"
            value={studentDetails.name}
            onChangeText={setName}
            mode="outlined"
            style={styles.text}
          />
          <TextInput
            label="Age"
            value={studentDetails.age}
            onChangeText={setAge}
            keyboardType="numeric"
            mode="outlined"
            style={styles.text}
          />
          <TextInput
            label="Class"
            value={studentDetails.class}
            onChangeText={setClassName}
            mode="outlined"
            style={styles.text}
          />
          <TextInput
            label="Date of Joining"
            value={studentDetails.dateOfJoining}
            onChangeText={setDateOfJoining}
            mode="outlined"
            style={styles.text}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Cancel</Button>
          <Button
            onPress={() => {
              handleSave();
              onSave();
            }}
          >
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default PopupExample;

const styles = StyleSheet.create({
  text: { marginBottom: 10 },
});
