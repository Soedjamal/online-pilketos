import { Typography } from "@mui/material";

const SuccessPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "50px",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <img
          style={{ width: "150px", height: "170px" }}
          src="https://ik.imagekit.io/nir38m3b3/20250213_174211_0000.png?updatedAt=1739443422808"
          alt=""
        />
        <Typography
          style={
            {
              // border: "1px solid black",
            }
          }
          variant="h4"
          fontWeight="700"
          color="#006787"
        >
          Berhasil memilih.👀
        </Typography>
      </div>
      <Typography fontWeight="500" color="rgb(130,130,130)" textAlign="center">
        "Terimakasih telah memilih"
      </Typography>
    </div>
  );
};

export default SuccessPage;

