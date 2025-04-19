import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text, IconButton, Menu } from "react-native-paper";
import { db } from "./firebase";
import { ref, get } from "firebase/database";
import PopupExample from "@/components/EditPopup";

const StudentsList = () => {
  const [students, setStudents] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await get(ref(db, "Students"));
      if (snapshot.exists()) {
        setStudents(snapshot.val());
      }
    };
    fetchStudents();
  }, []);

  const [expandedId, setExpandedId] = useState(null);
  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const [showPopup, setShowPopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showMenu, setShowMenu] = useState(null);

  return (
    <>
      {showPopup && selectedStudent && (
        <PopupExample
          student={selectedStudent}
          onClose={() => setShowPopup(false)}
        />
      )}

      <ScrollView contentContainerStyle={styles.container}>
        {Object.entries(students).map(([id, student]) => (
          <Card key={id} style={styles.card} onPress={() => toggleExpand(id)}>
            <Card.Title
              title={student.name}
              left={(props) => (
                <IconButton
                  {...props}
                  icon="account"
                  onPress={() => {
                    setSelectedStudent({ id, ...student });
                    setShowPopup(true);
                  }}
                />
              )}
              right={(props) => (
                <Menu
                  visible={showMenu == id}
                  onDismiss={() => setShowMenu(null)}
                  anchor={
                    <IconButton
                      {...props}
                      icon="dots-vertical"
                      onPress={() => setShowMenu(id)}
                    />
                  }
                >
                  <Menu.Item onPress={() => {}} title="Edit" />
                  <Menu.Item onPress={() => {}} title="Delete" />
                </Menu>
              )}
            />
            {expandedId === id && (
              <Card.Content>
                <Text style={styles.cardContent}>ID: {id}</Text>
                <Text style={styles.cardContent}>Age: {student.age}</Text>
                <Text style={styles.cardContent}>Class: {student.class}</Text>
              </Card.Content>
            )}
          </Card>
        ))}
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
  cardContent: {
    margin: 5,
    fontWeight: "bold",
    fontStyle: "italic",
    fontFamily: "calibri",
  },
});

export default StudentsList;
