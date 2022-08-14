import { Container, Avatar as Av, Typography, Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { uploadAvatar } from '../../../features/auth/authSlice'

const Avatar = ({ me }) => {
  const { data } = useSelector(state => state.auth)
  const [file, setFile] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(data)
  }, [data])

  const handleUpdate = () => {
    const formData = new FormData()
    formData.append('avatar', file)
    dispatch(uploadAvatar({ userId: me._id, file: formData, token: localStorage.getItem('token') }))
  }

  return (
    <>
    <Typography variant="h5">Avatar</Typography>
    <Container>
      <Box style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '2rem', width: 'fit-content', flexDirection: 'column' }}>
        <Av style={{ width: '60px', height: '60px' }} alt="Remy Sharp" src={data?.data?.data?.avatar} />
        <div>
          <input style={{ width: '200px' }} type="file" name="Avatar" onChange={(e) => setFile(e.target.files[0])} />
          <Button variant="secondary" onClick={handleUpdate}>Save</Button>
        </div>
      </Box>
    </Container>
    </>
    )
}

export default Avatar