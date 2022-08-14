import { Box, Button, Container, Typography } from "@mui/material"
import { BootstrapInput, GenderSelect } from '../Settings.styled'
import { useDispatch } from 'react-redux'
import { updateUserAuth } from '../../../features/auth/authSlice'
import { useState } from "react"

const General = ({me}) => {
  const dispatch = useDispatch()
  const [generalData, setGeneralData] = useState({
    username: '',
    birth: '',
    gender: '',
  })

  const handleUpdate = (key, value) => {
    switch (key) {
      case 'username':
        const firstName = value.split(' ')[0]
        const surname = value.split(' ')[1]
        dispatch(updateUserAuth({userId: me?._id, userData: { firstName, surname }, token: localStorage.getItem('token')}))
      break
      case 'birth':
        const birth = value
        dispatch(updateUserAuth({userId: me?._id, userData: { birth }, token: localStorage.getItem('token')}))
      break
      case 'gender':
        const gender = value
        dispatch(updateUserAuth({userId: me?._id, userData: { gender }, token: localStorage.getItem('token')}))
      break
    }
  }

  return (
    <>
    <Typography variant="h5">General</Typography>
    <Container style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap', flexDirection: 'column' }}>
      <Box style={{ width: 'fit-content' }}>
        <p style={{ marginBottom: '.5rem' }}>Username, {me?.firstName} {me?.surname}</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BootstrapInput name="username" placeholder="new username" valuie={generalData} onChange={(e) => setGeneralData({...generalData, username: e.target.value})} />
          <Button variant="secondary" onClick={() => handleUpdate('username', generalData.username)}>Change</Button>
        </div>
      </Box>
      <Box style={{ width: 'fit-content' }}>
        <p style={{ marginBottom: '.5rem' }}>Birth, {me?.birth}</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BootstrapInput name="birth" placeholder="M / D / Y" onChange={(e) => setGeneralData({...generalData, birth: e.target.value})} />
          <Button variant="secondary" onClick={() => handleUpdate('birth', generalData.birth)}>Change</Button>
        </div>
      </Box>
      <Box style={{ width: 'fit-content' }}>
        <p style={{ marginBottom: '.5rem' }}>Gender, {me?.gender}</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <GenderSelect generalData={generalData} setGeneralData={setGeneralData} />
          <Button variant="secondary" onClick={() => handleUpdate('gender', generalData.gender)}>Change</Button>
        </div>
      </Box>
    </Container>
    </>
  )
}

export default General