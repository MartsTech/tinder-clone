import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { useStore } from "../../../stores/store";
import { AppNavigationProp } from "../../../types/navigation";

const UpdateForm = () => {
  const { updateUserProfile } = useStore().userStore;
  const navigation = useNavigation<AppNavigationProp>();

  const [image, setImage] = useState("");
  const [job, setJob] = useState("");
  const [age, setAge] = useState("");

  const disabledForm = !image || !job || !age;

  return (
    <>
      <Text style={styles.label}>Step 1: The Profile Pic</Text>
      <TextInput
        value={image}
        onChangeText={setImage}
        style={styles.input}
        placeholder="Enter a Profile Pic URL"
      />
      <Text style={styles.label}>Step 2: The Job</Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        style={styles.input}
        placeholder="Enter your job"
      />
      <Text style={styles.label}>Step 3: The Age</Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        style={styles.input}
        placeholder="Enter your age"
        maxLength={2}
        keyboardType="numeric"
      />
      <TouchableOpacity
        disabled={disabledForm}
        onPress={() =>
          updateUserProfile(image, job, Number(age), () =>
            navigation.navigate("Home")
          )
        }
        style={[styles.button, disabledForm && styles.disabledButton]}
      >
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </>
  );
};

export default UpdateForm;

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    padding: 16,
    fontWeight: "bold",
    color: "rgba(248, 113, 113, 1)",
  },
  input: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 28,
    paddingBottom: 8,
    width: "90%",
  },
  button: {
    position: "absolute",
    bottom: 20,
    width: 256,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(248, 113, 113, 1)",
  },
  disabledButton: {
    backgroundColor: "rgba(156, 163, 175, 1)",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    lineHeight: 28,
  },
});
