import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import Navbar from "@/components/Navbar";

export default function Photos() {
  return (
    <>
      <Head>
        <title>Photos</title>
        <meta name="description" content="Sung-Yan Hsieh's photos" />
        <meta name="og:title" content="Photos" />
        <link rel="icon" href="/internet.png" />
      </Head>
      <Navbar />
      <Container
        maxWidth="xl"
        sx={{
          my: "6rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            fontWeight={"bold"}
            sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
          >
            Photos
          </Typography>
        </Box>
        <Box height={"2rem"} sx={{ my: 2 }}>
          <Typography sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}>
            A list of photos I've taken.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
