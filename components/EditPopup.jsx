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

const updateStudent = (studentsList, studentId, studentDetails) => {
  return { ...studentsList, [studentId]: studentDetails }; // RETURN a NEW object
};

const EditPopup = ({ studentsList, student, onClose, onSave, IsNewEntry }) => {
  const [studentDetails, setStudentDetails] = useState(
    IsNewEntry ? {} : student.data
  );

  const handleSave = () => {
    let updatedStudentsList;
    if (IsNewEntry) {
      updatedStudentsList = addStudent(studentsList, studentDetails);
    } else {
      updatedStudentsList = updateStudent(
        studentsList,
        student.id,
        studentDetails
      );
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
            placeholder="Between 3 to 20 characters"
            onSelectionChange={(text) =>
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
            placeholder="between 1 to 12"
            onChangeText={(text) =>
              setStudentDetails((prev) => ({ ...prev, class: text }))
            }
            keyboardType="numeric"
            mode="outlined"
            style={styles.class}
          />
          <TextInput
            label="Date of Joining"
            value={studentDetails.dateOfJoining}
            placeholder="YYYY/MM/DD"
            onChangeText={(text) =>
              setStudentDetails((prev) => ({ ...prev, dateOfJoining: text }))
            }
            mode="outlined"
            style={styles.dateOfJoining}
          />
          <TextInput
            label="Fees assigned"
            value={studentDetails.feesAssigned}
            placeholder="Enter fees:"
            onChangeText={(text) =>
              setStudentDetails((prev) => ({ ...prev, feesAssigned: text }))
            }
            keyboardType="numeric"
            mode="outlined"
            style={styles.feesAssigned}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Cancel</Button>
          <Button
            onPress={() => {
              if (
                !studentDetails.name ||
                !studentDetails.age ||
                !studentDetails.class ||
                !studentDetails.dateOfJoining ||
                !studentDetails.feesAssigned
              ) {
                alert("Please fill all the fields");
                return;
              }
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
