import styled from "styled-components"

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 1px 1px 5px 3px #dadada;
    background-color: #fff;
    padding: 1.5rem 1rem;
    border-radius: 10px;
    margin: 0 40px;
    max-width: 400px;
    margin: 0 auto;
`

export const InputIn = styled.input`
    border: 1px solid #d4d4d4;
    border-radius: 6px;
    caret-color: #1877f2;
    outline: none;
    background-color: #fff;
    width: 100%;
    padding: .75rem 1rem;
    margin: .5rem 0;

    &:focus {
        border-color: #1877f2;
    }
`

export const Button = styled.button`
    border: none;
    outline: none;
    padding: .5rem 1rem;
    color: #fff;
    font-weight: bold;
    font-size: 1.3rem;
    margin: .5rem 0;
    width: ${props => props.fullWidth ? '100%' : 'auto' };
    background-color: ${props => props.variant === 'success' ? '#42b72a' : '#1877f2'};
    border-radius: 6px;
    &:hover {
        background-color: ${props => props.variant === 'success' ? '#399e25' : '#156ee0'};
    }
`

export const Dialog = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 500px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 1px 1px 8px 3px #969696;
    padding: 0;

    .head {
        padding: 1rem 1.5rem;
        div {
            display: flex;
            align-items: center;
            justify-content: space-between;

            h1 {
                font-weight: 600;
                font-size: 2.2rem;
            }
            span {
                font-size: 1.5rem;
            }
        }
        span {
            color: #606770;
        }
    }

    hr {
        margin: 0;
    }
`

export const InputUp = styled.input`
    border: 1px solid #d4d4d4;
    border-radius: 4px;
    caret-color: #333;
    outline: none;
    background-color: #f5f6f7;
    width: 100%;
    padding: .5rem 1rem;
    margin: .5rem 0;
`

export const Symbol = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    font-size: 10px;
    color: #fff;
    background-color: #888;
    display: flex;
    justify-content: center;
    align-items: center;
`