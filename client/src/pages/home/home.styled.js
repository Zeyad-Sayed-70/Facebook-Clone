import styled from 'styled-components'

const HomeStyled = styled.div`
    /* Nav Start */
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70px;
        background-color: #242526;
    }
    .nav_sec_1 {
        gap: 1rem;
        padding: .5rem;
        img {
            max-width: 50px;
        }
        div {
            position: relative;
        }
        input {
            border: 0;
            background-color: #3A3B3C;
            padding: .75rem 0 .75rem 3.3rem;
            color: #B0B3B8;
            border-radius: 50px;
            outline: none;
        }
        input::placeholder {
            color: #B0B3B8;
        }
        span {
            position: absolute;
            color: #B0B3B8;
            font-size: 1.5rem;
            left: 10px;
            top: 7px;
            border-radius: 50%;
            padding: 5px 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: .3s;
        }
        span:hover {
            background-color: #565656;
        }
        @media (max-width: 767px) {
            .search {
                display: none;
            }            
        }
    }
    .nav_sec_2 {
        flex: 2;
        justify-content: center;
        ul {
            list-style-type: none;
            display: flex;
            align-items: center;
            gap: 1rem;
            margin: 0;
            padding: 0;
        }
        a {
            height: 100%;
            display: block;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.75rem;
            padding: .75rem 2rem;
            border-radius: 6px;
            color: #b0b3b8;
        }
        a:hover {
            background-color: #3e3e3e;
        }
        .menu {
            display: none;
        }
        @media (max-width: 991px) {
            & {
                justify-content: end;
                padding-right: 1rem;
            }
            .menu {
                display: flex;
            }
            li:not(.menu) {
                display: none;
            }
        }
    }
    .nav_sec_3 {
        justify-content: end;
        padding-right: 2rem;

        @media (max-width: 991px) {
            & {
                display: none;
            }
        }
    }
    /* Nav End */

    /* Main Start */
    .main {
        display: flex;
    }
    .main_sec_1 {
        flex: 1;
    }
    @media (max-width: 991px) {
        .main_sec_1 {
            display: none;
        }        
    }
    .main_sec_2 {
        flex: 2;
    }
    .main_sec_3 {
        flex: 1;
    }
    @media (max-width: 767px) {
        .main_sec_3 {
            display: none;
        }        
    }
    /* Main End */
`

export default HomeStyled