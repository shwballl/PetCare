import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native"; // Додав Alert та Image
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { petsAPI } from "../services/api";

export default function AddPetScreen({ navigation }) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddPet = async () => {
    if (!name || !breed) {
      Alert.alert("Помилка", "Заповніть обов'язкові поля");
      return;
    }

    setLoading(true);
    try {
      let photoUrl = null;

      // 1. Якщо є фото, спочатку завантажуємо його
      if (image) {
        const formData = new FormData();
        formData.append("file", {
          uri: image,
          name: "pet_photo.jpg",
          type: "image/jpeg",
        });
        const uploadRes = await petsAPI.uploadPhoto(formData);
        photoUrl = uploadRes.url;
      }

      // 2. Додаємо улюбленця в базу
      await petsAPI.addPet(name, breed, dob || "2023-01-01", photoUrl);

      Alert.alert("Успіх", "Улюбленця додано!");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Помилка", "Не вдалося зберегти дані");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <>
            <Ionicons name="camera" size={32} color="#6B7280" />
            <Text style={styles.photoText}>Додати фото</Text>
          </>
        )}
      </TouchableOpacity>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ім'я улюбленця *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Барсик"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Порода *</Text>
          <TextInput
            style={styles.input}
            value={breed}
            onChangeText={setBreed}
            placeholder="Шотландський висловухий"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Дата народження</Text>
          <TextInput
            style={styles.input}
            value={dob}
            onChangeText={setDob}
            placeholder="РРРР-ММ-ДД"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && { backgroundColor: "#93C5FD" }]}
          onPress={handleAddPet}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Додати улюбленця</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  photoButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F3F4F6",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 24,
    overflow: "hidden",
  },
  previewImage: { width: "100%", height: "100%" },
  photoText: { fontSize: 12, color: "#6B7280", marginTop: 8 },
  form: { padding: 16 },
  inputContainer: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "500", color: "#374151", marginBottom: 8 },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
