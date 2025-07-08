import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text, IconButton, Menu, FAB } from "react-native-paper";

import { uploadAllStudents } from "@/utils/DatabaseMethods"; // Adjust the import path as necessary
import EditPopup from "@/components/StudentDetailsEditorPopup";
import DeleteConfirmPopup from "@/components/DeleteConfirmPopup";
import { useAppData } from "@/utils/AppDataContext";

export default StudentRecordScreen = () => {
  // Part 1: Fetching the students data
  const [students, setStudents] = useState({});
  const { students: contextStudents, refresh, setRefresh } = useAppData();

  useEffect(() => {
    setStudents(contextStudents);
  }, [refresh, contextStudents]);

  const uploadStudents = async () => {
    console.log(students);
    if (!Object.keys(students).length) return;
    setUploading(true);
    try {
      const result = await uploadAllStudents(students);
      console.log("Upload result:", result);
      setRefresh((prev) => !prev);
    } catch (e) {
      console.error("Upload failed", e);
    }
    setUploading(false);
  };

  // Part 2: Handling the menu and popups
  const [showMenu, setShowMenu] = useState(null);
  const [showInputPopup, setShowInputPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Part 3: Handling the student data
  const [isNewStudent, setIsNewStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <>
      {showInputPopup && (selectedStudent || isNewStudent) && (
        <EditPopup
          IsNewEntry={isNewStudent}
          studentsList={students}
          student={selectedStudent}
          onClose={() => {
            setShowInputPopup(false);
            setIsNewStudent(false);
            setSelectedStudent(null);
          }}
          onSave={(updatedStudentsList) => {
            setStudents(updatedStudentsList);
            uploadStudents();
          }}
        />
      )}

      {showDeletePopup && (
        <DeleteConfirmPopup
          studentsList={students}
          student={selectedStudent}
          onClose={() => {
            setShowDeletePopup(false);
            setSelectedStudent(null);
          }}
          onDelete={(updatedStudentsList) => {
            setStudents(updatedStudentsList);
            uploadStudents();
          }}
        />
      )}

      <ScrollView contentContainerStyle={styles.container}>
        {Object.entries(students).map(([id, student]) => (
          <Card key={id} style={styles.card} onPress={() => toggleExpand(id)}>
            <Card.Title
              title={student.name}
              titleStyle={styles.cardTitle}
              left={(props) => (
                <IconButton {...props} icon="account" iconColor="#004e64" />
              )}
              right={(props) => (
                <Menu
                  anchor={
                    <IconButton
                      {...props}
                      icon="dots-vertical"
                      iconColor="#004e64"
                      onPress={() => {
                        setShowMenu(id);
                      }}
                    />
                  }
                  visible={showMenu == id}
                  onDismiss={() => {
                    setShowMenu(null);
                  }}
                  style={styles.menu}
                >
                  <Menu.Item
                    title="Edit"
                    onPress={() => {
                      setShowMenu(null);
                      setSelectedStudent({ id: id, data: { ...student } });
                      setShowInputPopup(true);
                    }}
                  />
                  <Menu.Item
                    title="Delete"
                    onPress={() => {
                      setShowMenu(null);
                      setSelectedStudent({ id: id, data: { ...student } });
                      setShowDeletePopup(true);
                    }}
                  />
                </Menu>
              )}
            />
            {expandedId === id && (
              <Card.Content>
                <Text style={styles.cardContent}>ID: {id}</Text>
                {Object.entries(student).map(([key, value]) => (
                  <Text key={id + key} style={styles.cardContent}>
                    {key}:{" "}
                    {typeof value === "object" ? JSON.stringify(value) : value}
                  </Text>
                ))}
              </Card.Content>
            )}
          </Card>
        ))}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => openEditor()}
          color="white"
          label="Add Student"
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  menu: {
    width: 150,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  card: {
    marginBottom: 10,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: "#f8f8f8",
  },
  cardTitle: {
    padding: 10,
    fontSize: 18,
    color: "#004E64",
    fontWeight: "bold",
    fontFamily: "calibri",
  },
  cardContent: {
    margin: 5,
    color: "#004E64",
    fontWeight: "bold",
    fontStyle: "italic",
    fontFamily: "calibri",
  },
  fab: {
    padding: 8,
    fontSize: 18,
    alignItems: "center",
    fontWeight: "bold",
    fontFamily: "calibri",
    backgroundColor: "#004e64",
    elevation: 4,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
});
