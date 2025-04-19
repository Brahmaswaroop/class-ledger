// components/EditPopup.tsx
import React, { RefCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material"; // or react-native-paper if you're mixing

const PopupExample = ({ student, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Student Details</DialogTitle>
      <DialogContent>
        <Typography>Name: {student.name}</Typography>
        <Typography>Age: {student.age}</Typography>
        <Typography>Class: {student.class}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupExample;
