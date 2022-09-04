import { Box, Button, Container, Typography } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateUserAuth, deleteUserAuth } from "../../../features/auth/authSlice"
import { BootstrapInput, GenderSelect } from "../Settings.styled"

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function AlertDialog({ open, setOpen, me }) {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const handleClose = () => {
    setOpen(false);
  }

  const handleDelete = () => {
    dispatch(deleteUserAuth({userId: me?._id, token }))
    console.log(token)
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"are you Sure want to Delete your Account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Warning: this delete is permanently, you can't return it again. take your choice.
            if you want to delete it please press 'Agree' if you don't press 'Disagree'
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



const Account = ({ me }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const [accoutnData, setAccoutnData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
  })

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  const handleUpdate = (key, value) => {
    console.log(key, value)
    switch (key) {
      case 'email':
        const email = value
        dispatch(updateUserAuth({userId: me?._id, userData: { email }, token: localStorage.getItem('token')}))
      break
      case 'phoneNumber':
        const phoneNumber = value
        console.log(key, value)
        dispatch(updateUserAuth({userId: me?._id, userData: { phoneNumber }, token: localStorage.getItem('token')}))
      break
      case 'password':
        const password = value
        dispatch(updateUserAuth({userId: me?._id, userData: { password }, token: localStorage.getItem('token')}))
      break
    }
  }
  return (
    <>
    {open && <AlertDialog open={open} setOpen={setOpen} me={me}/>}
    <Typography variant="h5">Account</Typography>
    <Container style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '2rem', flexWrap: 'wrap'}}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Box style={{ width: 'fit-content' }}>
          <p style={{ marginBottom: '.5rem' }}>Email, {me?.email || 'empty'}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BootstrapInput name="Email" placeholder="new Email" value={accoutnData.email} onChange={(e) => setAccoutnData({...accoutnData, email: e.target.value})}/>
            <Button variant="secondary" onClick={() => handleUpdate('email', accoutnData.email)} >Change</Button>
          </div>
        </Box>
        <Box style={{ width: 'fit-content' }}>
          <p style={{ marginBottom: '.5rem' }}>Phone Number, {me?.phoneNumber || 'empty'}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BootstrapInput name="Phone" placeholder="new Phone Number" value={accoutnData.phoneNumber} onChange={(e) => setAccoutnData({...accoutnData, phoneNumber: e.target.value})}/>
            <Button variant="secondary" onClick={() => handleUpdate('phoneNumber', accoutnData.phoneNumber)} >Change</Button>
          </div>
        </Box>
        <Box style={{ width: 'fit-content' }}>
          <p style={{ marginBottom: '.5rem' }}>New Password, ******</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BootstrapInput type="password" name="password" placeholder="new password" value={accoutnData.password} onChange={(e) => setAccoutnData({...accoutnData, password: e.target.value})}/>
            <Button variant="secondary" onClick={() => handleUpdate('password', accoutnData.password)} >Change</Button>
          </div>
        </Box>
      </section>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '2rem' }}>
        <Button variant="contained" color="warning" onClick={handleLogout}>Logout</Button>
        <Button variant="contained" color="error" onClick={() => setOpen(true)}>Delete Account</Button>
      </section>
    </Container>
    </>
  )
}

export default Account