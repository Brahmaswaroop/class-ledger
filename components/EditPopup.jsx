import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dialog, Portal, TextInput, Button } from "react-native-paper";

const newStudentId = (studentsList) => {
  const studentCount = studentsList ? Object.keys(studentsList).at(-1) : 0;
  const studentCountNum = studentCount ? parseInt(studentCount.slice(3)) : 0;
  return `STD${String(studentCountNum + 1).padStart(3, "0")}`;
};

const addStudent = (studentsList, studentDetails) => {
  const studentId = newStudentId(studentsList);
  return { ...studentsList, [studentId]: studentDetails }; // RETURN a NEW object
};

const updateStudent = (studentsList, studentDetails) => {
  return { ...studentsList, [studentDetails.id]: studentDetails }; // RETURN a NEW object
};

const EditPopup = ({ studentsList, student, onClose, onSave, IsNewEntry }) => {
  const [studentDetails, setStudentDetails] = useState(
    IsNewEntry ? {} : student
  );

  const handleSave = () => {
    let updatedStudentsList;
    if (IsNewEntry) {
      updatedStudentsList = addStudent(studentsList, studentDetails);
    } else {
      updatedStudentsList = updateStudent(studentsList, studentDetails);
    }
    onSave(updatedStudentsList);
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
            onChangeText={(text) =>
              setStudentDetails((prev) => ({ ...prev, name: text }))
            }
            mode="outlined"
            style={styles.name}
          />
          <TextInput
            label="Age"
            value={studentDetails.age}
            onChangeText={(text) =>
              setStudentDetails((prev) => ({ ...prev, age: text }))
            }
            keyboardType="numeric"
            mode="outlined"
            style={styles.age}
          />
          <TextInput
            label="Class"
            value={studentDetails.class}
            onChangeText={(text) =>
              setStudentDetails((prev) => ({ ...prev, class: text }))
            }
            mode="outlined"
            style={styles.class}
          />
          <TextInput
            label="Date of Joining"
            value={studentDetails.dateOfJoining}
            onChangeText={(text) =>
              setStudentDetails((prev) => ({ ...prev, dateOfJoining: text }))
            }
            mode="outlined"
            style={styles.dateOfJoining}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Cancel</Button>
          <Button
            onPress={() => {
              handleSave();
              onClose();
            }}
          >
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default EditPopup;

const styles = StyleSheet.create({
  text: { marginBottom: 10 },
});
