import { Menu, Button } from "react-native-paper";
import React, { useState } from "react";
import { View } from "react-native";

function SelectMonth() {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  return (
    <View>
      <Menu
        style={styles.menu}
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button
            style={styles.button}
            onPress={() => setVisible(true)}
            theme={{ colors: { primary: "#25A18E" } }}
          >
            {selected ? selected : "Select Month"}
          </Button>
        }
      >
        {["January", "February", "March"].map((month) => (
          <Menu.Item
            key={month}
            onPress={() => {
              setSelected(month);
              setVisible(false);
            }}
            title={month}
          />
        ))}
      </Menu>
    </View>
  );
}

export default function StudentFeeMarker() {
  return <SelectMonth />;
}
const styles = {
  menu: {
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  button: {
    backgroundColor: "#004E64",
    color: "#004E64",
    fontSize: 16,
  },
};
