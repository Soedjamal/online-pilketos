import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button, Box, CircularProgress, Alert } from "@mui/material";
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../lib/firebase";

const VotePage = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "candidates"));
                const candidateList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                console.log("Data Kandidat:", candidateList); // Debug log
                setCandidates(candidateList);
            } catch (err) {
                console.error("Error fetching candidates:", err);
                setError("Gagal memuat data kandidat. Coba lagi nanti.");
            } finally {
                setLoading(false);
            }
        };

        fetchCandidates();
    }, []);

    const handleVote = async (candidateId) => {
        try {
            // Update jumlah suara di Firestore
            const candidateRef = doc(db, "candidates", candidateId);
            await updateDoc(candidateRef, {
                votes: increment(1),
            });
            localStorage.removeItem("userToken")
            localStorage.removeItem("userName")

            setMessage("Terima kasih! Suara Anda telah tercatat.");
            setTimeout(() => navigate("/"), 2000); // Redirect setelah 2 detik
        } catch (err) {
            console.error("Error voting:", err);
            setError("Gagal mengirim suara, coba lagi.");
        }
    };

    // Tampilkan loading saat data masih dimuat
    if (loading) {
        return (
            <Box textAlign="center" mt={5}>
                <CircularProgress />
                <Typography>Memuat kandidat...</Typography>
            </Box>
        );
    }

    // Jika ada error, tampilkan pesan error
    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Container maxWidth="md">
            <Box textAlign="center" mt={5}>
                <Typography variant="h4" gutterBottom>
                    Pilih Kandidat Ketua OSIS
                </Typography>

                {/* Jika kandidat kosong, tampilkan pesan */}
                {candidates.length === 0 ? (
                    <Typography variant="h6" color="textSecondary">Tidak ada kandidat yang tersedia.</Typography>
                ) : (
                    <Grid container spacing={3} justifyContent="center">
                        {candidates.map((candidate) => (
                            <Grid item xs={12} sm={6} key={candidate.id}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={candidate.photo || "https://via.placeholder.com/250"} // Placeholder jika tidak ada gambar
                                        alt={candidate.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h5">{candidate.name}</Typography>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            onClick={() => handleVote(candidate.id)}
                                            sx={{ mt: 2 }}
                                        >
                                            Pilih {candidate.name}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* Pesan sukses */}
                {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
            </Box>
        </Container>
    );
};

export default VotePage;
