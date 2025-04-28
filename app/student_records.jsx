import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text, IconButton, Menu } from "react-native-paper";
import { getStudents, setAllStudents } from "@/app/DatabaseMethods"; // Adjust the import path as necessary
import EditPopup from "@/components/EditPopup";
import DeleteConfirmPopup from "@/components/DeleteConfirmPopup";

const StudentsList = () => {
  // Part 1: Fetching the students data
  const [students, setStudents] = useState({});
  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data || {});
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  const uploadStudents = async () => {
    console.log(students);
    if (Object.keys(students).length === 0) {
      console.log("No students to upload.");
      return;
    } else {
      const result = await setAllStudents(students);
      console.log("Upload result:", result);
    }
  };

  useEffect(() => {
    uploadStudents();
  }, [students]);

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
          }}
        />
      )}

      <ScrollView contentContainerStyle={styles.container}>
        {Object.entries(students).map(([id, student]) => (
          <Card key={id} style={styles.card} onPress={() => toggleExpand(id)}>
            <Card.Title
              title={student.name}
              titleStyle={styles.cardTitle}
              left={(props) => <IconButton {...props} icon="account" />}
              right={(props) => (
                <Menu
                  anchor={
                    <IconButton
                      {...props}
                      icon="dots-vertical"
                      onPress={() => {
                        setShowMenu(id);
                      }}
                    />
                  }
                  visible={showMenu == id}
                  onDismiss={() => {
                    setShowMenu(null);
                  }}
                >
                  <Menu.Item
                    title="Edit"
                    onPress={() => {
                      setShowMenu(null);
                      setSelectedStudent({ id, ...student });
                      setShowInputPopup(true);
                    }}
                  />
                  <Menu.Item
                    onPress={() => {
                      setShowMenu(null);
                      setSelectedStudent({ id, ...student });
                      setShowDeletePopup(true);
                    }}
                    title="Delete"
                  />
                </Menu>
              )}
            />
            {expandedId === id && (
              <Card.Content>
                <Text style={styles.cardContent}>ID: {id}</Text>
                {Object.entries(student).map(([key, value]) => (
                  <Text key={id + key} style={styles.cardContent}>
                    {key}: {value}
                  </Text>
                ))}
              </Card.Content>
            )}
          </Card>
        ))}
        <Card
          style={styles.card}
          onPress={() => {
            setIsNewStudent(true);
            setShowInputPopup(true);
          }}
        >
          <Card.Title
            titleStyle={styles.cardTitle}
            title="Add Student"
            left={(props) => <IconButton {...props} icon="plus" />}
          />
        </Card>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
    borderRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "calibri",
  },
  cardContent: {
    margin: 5,
    fontWeight: "bold",
    fontStyle: "italic",
    fontFamily: "calibri",
  },
});

export default StudentsList;
