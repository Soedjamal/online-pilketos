import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
  query,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const VotePage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
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
    setSubmitLoading(true)
    const token = localStorage.getItem("userToken");

    const q = query(collection(db, "students"), where("token", "==", token));
    const querySnapshot = await getDocs(q);
    let studentDoc;
    querySnapshot.forEach((doc) => {
      studentDoc = doc;
    });

    try {
      // Update jumlah suara di Firestore
      const candidateRef = doc(db, "candidates", candidateId);
      await updateDoc(candidateRef, {
        votes: increment(1),
      });
      localStorage.removeItem("userToken");
      // localStorage.removeItem("userName");

      await updateDoc(doc(db, "students", studentDoc.id), { voted: true });

      setMessage("Terima kasih! Suara Anda telah tercatat.");
      setTimeout(() => navigate("/success"), 2000); // Redirect setelah 2 detik
    } catch (err) {
      console.error("Error voting:", err);
      setError("Gagal mengirim suara, coba lagi.");
    } finally {
      setSubmitLoading(false)
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
      <Box textAlign="center" mt={5} marginBottom="50px">
        <Typography variant="h5" fontWeight="700" color="#006787" textAlign="center" marginBottom="50px" gutterBottom>
          Pilih Kandidat Ketua OSIS
        </Typography>

        {/* Jika kandidat kosong, tampilkan pesan */}
        {candidates.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            Tidak ada kandidat yang tersedia.
          </Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {candidates.map((candidate) => (
              <Grid style={{}} item xs={12} sm={6} key={candidate.id}>
                <Card style={{ border: "2px solid rgb(220, 220, 220)", borderRadius: "15px" }}>

                  <div style={{ padding: "20px 20px 0 20px" }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={candidate.photo} // Placeholder jika tidak ada gambar
                      alt={candidate.name}
                    />
                  </div>

                  <CardContent>
                    <div style={{
                      display: "flex", flexDirection: "column", alignItems: "start"
                    }}>
                      <Typography fontWeight="700" color="" variant="subtitle2">{candidate.ketua}</Typography>
                      <Typography fontWeight="700" variant="subtitle2">{candidate.wakil}</Typography>
                    </div>

                    <Button
                      type="submit"
                      variant="outlined"
                      disabled={loading}
                      onClick={() => handleVote(candidate.id)}
                      sx={{ mt: 2 }}

                      style={{ color: "rgb(255, 255, 255)", fontWeight: "700", backgroundColor: "#006787", padding: "15px 20px", borderRadius: "10px" }} fullWidth>
                      {`Pilih Paslon ${candidate.paslon}`}
                    </Button>
                  </CardContent>

                </Card>
              </Grid>
            ))}
            {message && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {message}
              </Alert>
            )}
          </Grid>
        )}

        {/* Pesan sukses */}

      </Box>
    </Container>
  );
};

export default VotePage;
