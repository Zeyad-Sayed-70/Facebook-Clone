import { useEffect, useRef, useState } from 'react'
import { Col } from 'react-bootstrap'
import { Form, InputIn, Button } from './Login.styled'
import { loginSchema } from '../../constant'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { loginAuth } from '../../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

// login validation schema
const yupSchema = yup.object({
  email_or_phone: yup.string().required('email or phone number is required field'),
  password: yup.string().min(4).max(16).required('password is required field'),
}).required()

const Login = ({setOpen}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(yupSchema)
  })
  const dispatch = useDispatch()
  const { isError, isLoading, isSuccess, data } = useSelector(state => state.auth)
  const [error, setError] = useState(null)
  const [recived, setRecived] = useState(false)
  const navigate = useNavigate()

  // useEffect(() => {
  //   focusInput.current.focus()
  // }, [focusInput])

  const onSubmit = (e) => {
    let loginData = {}
    
    if ( e.email_or_phone.includes('@') )
      loginData.email = e.email_or_phone
    else
      loginData.phoneNumber = e.email_or_phone
    
    loginData.password = e.password
    
    setRecived(true)
    dispatch(loginAuth(loginData))
  }

  useEffect(() => {
    // when the post success you will redirect to home page => ('/')
    if ( isSuccess && recived ) {
      if ( data.data.status === 200 ) {
          setError(null)
          localStorage.setItem('token', data.data.token)
          navigate('/')
          window.location.reload()
      } else {
          setError(data.data.message)
      }
  }
  }, [isError, isLoading, isSuccess, data])

  return (
    <>
        <Col className="login col-12 col-md-6">
          <Form onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error">{error}</div>}
            <InputIn type="text" {...register('email_or_phone')} placeholder="Email Adress or Phone Number" />
            <span>{errors.email_or_phone?.message}</span>
            <InputIn type="password" {...register('password')} placeholder="Password"/>
            <span>{errors.password?.message}</span>
            <Button type="submit" fullWidth>Login</Button>
            <a href='#'>Forgotten password?</a>
            <hr />
            <Button type="button" variant="success" onClick={() => setOpen(true)}>Create New Account</Button>
          </Form>
        </Col>
    </>
  )
}

export default Login