import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { getStudents } from "@/app/DatabaseMethods";

const attendance = () => {
  return (
    <>
      <View>
        <TouchableOpacity style={styles.button} onPress={getStudents()}>
          <Text>Get Students</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default attendance;

const styles = {
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
};
