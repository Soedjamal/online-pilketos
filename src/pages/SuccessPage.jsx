
import { Typography } from '@mui/material'

const SuccessPage = () => {
    return (
        <>
            <div className="container" style={{ display: "flex", marginTop: "50px", alignItems: "center", padding: "0 20px" }}>
                <img style={{ width: "130px", height: "150px", }} src="https://ik.imagekit.io/nir38m3b3/undraw_check-boxes_ewf2%20(1).svg?updatedAt=1739420816582" alt="" />
                <Typography textAlign="center" variant='h4' fontWeight="700" color="#006787">Berhasil memilih.👀</Typography>
            </div>
            <Typography fontWeight="500" color="rgb(130,130,130)" textAlign="center" >"Terimakasih telah memilih"</Typography>
        </>
    )
}

export default SuccessPage