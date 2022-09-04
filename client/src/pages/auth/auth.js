import { useState } from 'react'
import {Row} from 'react-bootstrap'
import AuthStyled from './auth.styled'
import Welcome from "../../components/auth/Welcome/Welcome"
import Login from '../../components/auth/Form/Login'
import Register from '../../components/auth/Form/Register'

const Auth = () => {
  const [open, setOpen] = useState(false) // for open register dialog (popup)
  
  return (
    <AuthStyled>
        <Row className="auth_container px-0 px-lg-5">
            {open && <Register setOpen={setOpen}/>}
            <Welcome />
            <Login setOpen={setOpen}/>
        </Row>
    </AuthStyled>
  )
}

export default Auth
