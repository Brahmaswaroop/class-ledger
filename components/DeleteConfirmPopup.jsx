import React from "react";
import { Text } from "react-native";
import { Dialog, Portal, Button } from "react-native-paper";

const deleteStudent = (studentsList, student) => {
  const updatedStudentsList = { ...studentsList };
  delete updatedStudentsList[student.id];
  return updatedStudentsList; // RETURN a NEW object
};

const DeleteConfirmPopup = ({ studentsList, student, onClose, onDelete }) => {
  const handleDelete = () => {
    let updatedStudentsList = deleteStudent(studentsList, student);
    onDelete(updatedStudentsList);
    onClose();
  };

  return (
    <Portal>
      <Dialog visible onDismiss={onClose}>
        <Dialog.Title>
          <Text>Delete Confirmation</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text>
            Are you sure you want to delete the student {student.name}?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Cancel</Button>
          <Button
            onPress={() => {
              handleDelete();
            }}
          >
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeleteConfirmPopup;
