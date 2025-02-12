// File: generate-tokens.js (Jalankan dengan Node.js)
import { db } from "../lib/firebase.js";
import { addDoc, collection } from "firebase/firestore";
import fs from "fs";
import crypto from "crypto"

const generateToken = () => crypto.randomInt(100000, 1000000).toString();

// Membaca file JSON yang berisi daftar nama siswa
const rawData = fs.readFileSync("nama_siswa.json");
const students = JSON.parse(rawData);

const uploadStudents = async () => {
    try {
        for (const name of students) {
            const studentData = {
                name: name,
                token: generateToken(),
                voted: false, // Awalnya belum memilih
                createdAt: new Date()
            }
            await addDoc(collection(db, "students"), studentData);
            console.log(`Uploaded: ${name} - Token: ${studentData.token}`);
        }
        console.log("Semua data siswa berhasil diunggah ke Firebase!");
    } catch (error) {
        console.error("Error uploading data:", error);
    }
};

// uploadStudents();


const addCandidates = async () => {
    try {
        await addDoc(collection(db, "candidates"), {
            name: "Paslon 1",
            photo: "",
            votes: 0
        });

        await addDoc(collection(db, "candidates"), {
            name: "Paslon 2",
            photo: "",
            votes: 0
        });

        console.log("Kandidat berhasil ditambahkan!");
    } catch (err) {
        console.error("Error menambahkan kandidat:", err);
    }
};

addCandidates();
