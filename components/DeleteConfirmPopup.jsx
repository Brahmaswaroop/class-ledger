import React from "react";
import { Text } from "react-native";
import { Dialog, Portal, Button } from "react-native-paper";
import { deleteStudent } from "@/app/DatabaseMethods"; // Adjust the import path as necessary

const DeleteConfirmPopup = ({ student, onClose, onDelete }) => {
  const handleDelete = () => {
    deleteStudent(student.id);
    onClose();
  };

  return (
    <Portal>
      <Dialog visible onDismiss={onClose}>
        <Dialog.Title>
          <Text>Delete Confirmation</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text>Are you sure you want to delete this student?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Cancel</Button>
          <Button
            onPress={() => {
              handleDelete();
              onDelete(); // Call the onDelete callback to refresh the list
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
