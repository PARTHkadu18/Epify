import { Box, Container } from "@mui/material"
import Navbar from "./Navbar"

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <Box>
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 4 }}>
            {children}
        </Container>
    </Box>
  )
}

export default Layout