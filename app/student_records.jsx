import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text, IconButton, Menu } from "react-native-paper";
import { getStudents, deleteStudent } from "@/app/DatabaseMethods"; // Adjust the import path as necessary
import PopupExample from "@/components/EditPopup";
import DeleteConfirmPopup from "@/components/DeleteConfirmPopup";
import { router } from "expo-router";

const StudentsList = () => {
  const [students, setStudents] = useState({});
  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const [expandedId, setExpandedId] = useState(null);
  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };
  const [showPopup, setShowPopup] = useState(false);
  const [isNewStudent, setIsNewStudent] = useState(false);
  const [isDeleteStudent, setIsDeleteStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showMenu, setShowMenu] = useState(null);

  return (
    <>
      {showPopup && (selectedStudent || isNewStudent) && !isDeleteStudent && (
        <PopupExample
          IsNewEntry={isNewStudent}
          student={selectedStudent}
          onClose={() => {
            setShowPopup(false);
            setIsNewStudent(false);
            setSelectedStudent(null);
          }}
          onSave={async () => {
            fetchStudents();
            router.push("/student_records");
          }}
        />
      )}

      {showPopup && isDeleteStudent && (
        <DeleteConfirmPopup
          student={selectedStudent}
          onClose={() => {
            setShowPopup(false);
            setIsDeleteStudent(false);
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
                      setShowPopup(true);
                    }}
                  />
                  <Menu.Item
                    onPress={() => {
                      setShowMenu(null);
                      setSelectedStudent({ id, ...student });
                      setIsDeleteStudent(true);
                      setShowPopup(true);
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
            setShowPopup(true);
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
