import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase.js";

const LoginToken = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleTokenSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    setError(null);

    if (!token.trim()) {
      setError("Token tidak boleh kosong!");
      setLoading(false)
      return;
    }

    try {
      // Cek apakah token ada di Firestore
      const q = query(collection(db, "students"), where("token", "==", token));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Token tidak valid! Periksa kembali token Anda.");
        return;
      }

      let studentDoc;
      querySnapshot.forEach((doc) => {
        studentDoc = doc;
      });

      const studentData = studentDoc.data();

      // Cek apakah siswa sudah memilih
      if (studentData.voted) {
        setError(`${studentData.name}, kamu sudah pernah memilih`);
        return;
      }

      if (error.length > 0) {
        setLoading(false)
      }

      // Simpan token di localStorage agar sesi tetap berjalan
      localStorage.setItem("userToken", token);
      localStorage.setItem("userName", studentData.name);

      // Tandai siswa sebagai sudah memilih

      // Redirect ke halaman vote
      navigate("/vote");
    } catch (err) {
      setLoading(false)
      setError("Terjadi kesalahan, coba lagi.");
      console.error("Error:", err);
    } finally {
      setLoading(false)
    }
  };

  return (
    <Container maxWidth="sm" >
      <Box textAlign="center" mt={5}>
        <Typography
          variant="h4"
          marginBottom="60px"
          fontWeight="700"
          gutterBottom
        >
          Pilih Ketua OSIS
        </Typography>
        <form onSubmit={handleTokenSubmit} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" }}>
          <Typography variant="subtitle1" fontWeight="600" color="#404040" marginY="10px" >Masukkan Token</Typography>
          <TextField
            fullWidth
            label="Token"
            variant="outlined"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            sx={{ mb: 2 }}
          />
          {error && (
            <Alert style={{ width: "90%", marginBottom: "10px" }} severity="error">
              {error}
            </Alert>
          )}
          <Button type="submit" variant="outlined" disabled={loading} style={{ color: "rgb(200, 200, 200)", fontWeight: "700", backgroundColor: "#404040", padding: "15px 20px" }} fullWidth>
            {loading ? "Mengirim..." : "Kirim"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginToken;
