import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase.js";

const LoginToken = () => {
    const [token, setToken] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleTokenSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!token.trim()) {
            setError("Token tidak boleh kosong!");
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
                setError(`${studentData.name} kamu udah pernah memilih ya`);
                return;
            }

            // Simpan token di localStorage agar sesi tetap berjalan
            localStorage.setItem("userToken", token);
            localStorage.setItem("userName", studentData.name);

            // Tandai siswa sebagai sudah memilih
            await updateDoc(doc(db, "students", studentDoc.id), { voted: true });

            // Redirect ke halaman vote
            navigate("/vote");
        } catch (err) {
            setError("Terjadi kesalahan, coba lagi.");
            console.error("Error:", err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box textAlign="center" mt={5}>
                <Typography variant="h4" marginBottom="20px" fontWeight="700" gutterBottom>
                    Masukkan Token Anda
                </Typography>
                <form onSubmit={handleTokenSubmit}>
                    <TextField
                        fullWidth
                        label="Token"
                        variant="outlined"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    {error && <Alert style={{ marginBottom: "10px" }} severity="error">{error}</Alert>}
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Lanjutkan
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default LoginToken;
