import { useEffect, useState } from "react"
import { Button, Dialog, InputUp, Symbol } from "./Login.styled"
import { GrClose } from 'react-icons/gr'
import { birth } from '../../constant'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { postUserAuth } from "../../../features/auth/authSlice"
import { useNavigate } from 'react-router'

// handle validate schema with yup
const yupSchema = yup.object({
    firstName: yup.string().min(2).max(12).required(),
    surname: yup.string().min(2).max(12).required(),
    email_or_phone: yup.string().required(),
    password: yup.string().min(4).max(8).required(),
    day: yup.string().required(),
    month: yup.string().required(),
    year: yup.string().required(),
    gender: yup.string().required(),
})

const Register = ({setOpen}) => {
  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(yupSchema)
  })
  const dispatch = useDispatch()
  const {isLoading, isSuccess, isError, data} = useSelector(state => state.auth)
  const [error, setError] = useState(null)
  const [recived, setRecived] = useState(false)
  const navigate = useNavigate()

  const onSubmit = (data) => {

    const userData = {
        firstName: data.firstName,
        surname: data.surname,
        email: null,
        phoneNumber: null,
        password: data.password,
        day: data.day,
        month: data.month,
        year: data.year,
        gender: data.gender,
    }

    if ( data.email_or_phone.includes('@') )
        userData.email = data.email_or_phone
    else
        userData.phoneNumber = data.email_or_phone

    setRecived(true)
    dispatch(postUserAuth(userData))
  }

  useEffect(() => {
    // when the post success you will redirect to home page => ('/')
    if ( isSuccess && recived ) {
        if ( data.data.status === 200 ) {
            setError(null)
            // save your token in localStorage
            localStorage.setItem('token', data.data.token)
            navigate('/')
            window.location.reload()
        } else {
            setError(data.data.message)
        }
    }
  }, [isLoading, isSuccess, isError, data])

  const handleClose = () => {
    setError(null)
    setOpen(false)
  }

  return (
    <>
    <div className="overlay"></div>
    <Dialog className="register">
        <div className="head">
            <div>
                <h1>Sign Up</h1>
                <span onClick={handleClose}><GrClose /></span>
            </div>
            <span>It's quick and easy.</span>
        </div>
        <hr />
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <InputUp type="text" placeholder="First name" {...register('firstName')} className={errors.firstName?.message ? 'input_error' : ''} />
                <InputUp type="text" placeholder="Surname" {...register('surname')} className={errors.surname?.message ? 'input_error' : ''} />
            </div>
            <InputUp type="text" placeholder="Mobile Number or Email Address" {...register('email_or_phone')} className={errors.email_or_phone?.message ? 'input_error' : ''} />
            <InputUp type="password" placeholder="New Password" {...register('password')} className={errors.password?.message ? 'input_error' : ''} />
            
            <label>Date of birth <Symbol>?</Symbol></label>
            <div>
                <select {...register('day')} className={errors.day?.message ? 'input_error' : ''}>
                    {birth.day.map(day => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                </select>
                <select {...register('month')} className={errors.mongth?.message ? 'input_error' : ''}>
                    {birth.month.map(month => (
                        <option key={month} value={month}>{month}</option>
                    ))}                
                </select>
                <select {...register('year')} className={errors.year?.message ? 'input_error' : ''}>
                    {birth.year.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}                
                </select>
            </div>

            <label>Gender <Symbol>?</Symbol></label>
            <div className="gender">
                <label className={errors.gender?.message ? 'input_error' : ''} htmlFor="male">Male <input id="male" type="radio" name="gender" value="male" {...register('gender')} /></label>
                <label className={errors.gender?.message ? 'input_error' : ''} htmlFor="female">Female <input id="female" type="radio" name="gender" value="female" {...register('gender')} /></label>
                <label className={errors.gender?.message ? 'input_error' : ''} htmlFor="custom">Custom <input id="custom" type="radio" name="gender" value="custom" {...register('gender')} /></label>
            </div>
            <p>People who use our service may have uploaded your contact information to Facebook. <a href="#">Learn more</a>.</p>
            <p>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</p>
            <Button variant="success" fullWidth>Sign Up</Button>
        </form>
    </Dialog>
    </>
  )
}

export default Register