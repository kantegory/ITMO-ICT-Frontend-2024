import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 3,
        px: 2,
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Typography variant="body1" align="center">
        © {new Date().getFullYear()} Медицинский Портал. Все права защищены.
      </Typography>
    </Box>
  );
};

export default Footer;
