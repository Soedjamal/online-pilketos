import crypto from "crypto";
import fs from "fs";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase.js";

const generateToken = () => `TS${crypto.randomInt(10000, 100000)}`;

const rawData = fs.readFileSync("nama_guru_staf.json");
const teacher = JSON.parse(rawData);

const uploadTeacher = async () => {
  try {
    for (const name of teacher) {
      const teacherData = {
        name: name,
        token: generateToken(), // Menggunakan format TSxxxxx
        voted: false, // Awalnya belum memilih
        createdAt: new Date(),
      };

      await addDoc(collection(db, "teacher"), teacherData);
      console.log(`Uploaded: ${name} - Token: ${teacherData.token}`);
    }
    console.log("Semua data guru berhasil diunggah ke Firebase!");
  } catch (error) {
    console.error("Error uploading data:", error);
  }
};

uploadTeacher();
