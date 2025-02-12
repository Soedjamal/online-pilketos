// src/pages/HomePage.jsx
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate()

    return (
        <Container>
            <Typography variant="h4">Pemilihan Ketua OSIS</Typography>
            <Typography>Scan QR Code di TPU untuk memulai</Typography>

            <Button
                variant="contained"
                onClick={() => navigate("/input-token")}
            >
                Sudah Punya Token? Klik di Sini
            </Button>
        </Container>
    );
}