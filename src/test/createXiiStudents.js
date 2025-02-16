import { db } from "../lib/firebase.js";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import fs from "fs";

const rawData = fs.readFileSync("nama_siswa_xii.json");
const students = JSON.parse(rawData);

const deleteXiiStudents = async () => {
  try {
    for (const name of students) {
      // Buat query untuk mencari dokumen dengan nama tertentu
      const q = query(collection(db, "students"), where("name", "==", name));
      const querySnapshot = await getDocs(q);

      // Loop untuk menghapus semua dokumen yang cocok
      querySnapshot.forEach(async (docSnapshot) => {
        await deleteDoc(doc(db, "students", docSnapshot.id));
        console.log(`Deleted: ${name}`);
      });
    }

    console.log("Semua data siswa tertera berhasil dihapus");
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

// Panggil fungsi
deleteXiiStudents();
