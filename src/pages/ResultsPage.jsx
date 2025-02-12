import { useEffect, useState } from "react";
import { Container, Typography, Grid, Card, CardMedia, CardContent, CircularProgress, Alert } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

const ResultsPage = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "candidates"));
                const results = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCandidates(results);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching results:", err);
                setError("Gagal memuat hasil voting.");
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom textAlign="center">
                Hasil Pemilihan OSIS
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {candidates.map((candidate) => (
                    <Grid item xs={12} sm={6} key={candidate.id}>
                        <Card>
                            <CardMedia component="img" height="250" image={candidate.photo} alt={candidate.name} />
                            <CardContent>
                                <Typography variant="h5">{candidate.name}</Typography>
                                <Typography variant="h6">Total Suara: {candidate.votes}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ResultsPage;
