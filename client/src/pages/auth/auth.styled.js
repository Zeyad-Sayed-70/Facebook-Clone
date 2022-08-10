import styled from 'styled-components'

const AuthStyled = styled.div`
    .auth_container {
        margin-left: 0 !important;
        margin-right: 0 !important;
        height: 100vh;
        align-items: center;
        background-color: #f0f2f5;
    }
    .welcome p {
        color: #1c1e21;
        font-size: 2rem;
        padding-left: 2.5rem;
    }
    .login {
        a {
            text-decoration: none;
        }
        hr {
            width: 100%;
        }
        span {
            color: #f44336;
            font-size: 14px;
        }
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,20%);
        z-index: 500;
    }
    .register {
        form {
            padding: 1rem;
            div {
                display: flex;
                gap: .5rem;
            }
            p {
                color: #777;
                font-size: .75rem;
                margin: 0.5rem;
            }
            label {
                display: flex;
                align-items: center;
                gap: .5rem;
                width: 100%;
                color: #333;
                font-size: 12px;
                margin-top: .5rem;
                margin-bottom: .5rem;
            }
        }
        select {
            width: 100%;
            border: 1px solid #b2b2b2;
            padding: 0.5rem;
            color: #333;
            outline: none;
        }
        .gender {
            label {
                font-size: 1rem;
                justify-content: space-around;
                border: 1px solid #b2b2b2;
                padding: 0.5rem 0;
                margin: 0;

                input {
                    width: 22px;
                    height: 15px;
                }
            }
        }
        .input_error {
            border-color: red !important;
        }
    }
    .error {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem 0 0;
        color: #f44336;
    }
`

export default AuthStyled