import { Box, Button, Container, Typography } from "@mui/material"
import { BootstrapInput, GenderSelect } from "../Settings.styled"

const Account = () => {
  return (
    <>
    <Typography variant="h5">Account</Typography>
    <Container style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '2rem', flexWrap: 'wrap'}}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Box style={{ width: 'fit-content' }}>
          <p style={{ marginBottom: '.5rem' }}>Email, zeyad@gmail.com</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BootstrapInput name="Email" placeholder="new Email" />
            <Button variant="secondary" >Change</Button>
          </div>
        </Box>
        <Box style={{ width: 'fit-content' }}>
          <p style={{ marginBottom: '.5rem' }}>Phone Number, 0106652896</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BootstrapInput name="Phone" placeholder="new Phone Number" />
            <Button variant="secondary" >Change</Button>
          </div>
        </Box>
      </section>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '2rem' }}>
        <Button variant="contained" color="warning">Logout</Button>
        <Button variant="contained" color="error">Delete Account</Button>
      </section>
    </Container>
    </>
  )
}

export default Account