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

    /* Posts Start */
    .main_sec_2 {
        width: 50%;
        padding: 0 3rem;
        @media (max-width: 991px ) {
            & {
                width: 65%;
                padding: 0 1rem;
            }
        }
        @media (max-width: 767px) { 
            & {
                width: 100%;
            }
        }
        .stories {
            display: flex;
            color: white;
            gap: .5rem;
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            padding: .5rem 0;

            &::-webkit-scrollbar {
                background-color: #212529;
                height: 2px;
            }
            &::-webkit-scrollbar-thumb {
                background-color: #fff;
            }

            .create {
                .list_btn {
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    background-color: #242424;
                    color: #d6d6d6;
                }
                p {
                    margin: 0;
                    padding: 1.2rem 0;
                }
                .addicon {
                    padding: 0.3rem;
                    background-color: #242424;
                    color: #fff;
                    border-radius: 50%;
                    position: absolute;
                    top: 168px;
                    left: 50%;
                    -webkit-transform: translateX(-50%);
                    -ms-transform: translateX(-50%);
                    transform: translateX(-50%);
                    div {
                        background-color: #0071e6;
                        border-radius: 50%;
                        width: 30px;
                        height: 30px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        svg {
                            font-size: 1.5rem;
                        }
                    }
                }
            }

            .list {
                width: 160px;
                min-width: 160px;
                max-width: 160px;
                /* width: calc((100% / 4) - 0.5rem);
                min-width: calc((100% / 4) - 0.5rem);
                max-width: calc((100% / 4) - 0.5rem); */
                height: 250px;
                position: relative;
                display: flex;

                /* @media (min-width: 1590px) {
                    & {
                        width: calc((100% / 5) - 0.5rem);
                        min-width: calc((100% / 5) - 0.5rem);
                        max-width: calc((100% / 5) - 0.5rem);
                    }
                }
                @media (max-width: 1191px) {
                    & {
                        width: calc((100% / 3) - 0.5rem);
                        min-width: calc((100% / 3) - 0.5rem);
                        max-width: calc((100% / 3) - 0.5rem);
                    }
                }
                @media (max-width: 991px) {
                    & {
                        width: calc((100% / 4) - 0.5rem);
                        min-width: calc((100% / 4) - 0.5rem);
                        max-width: calc((100% / 4) - 0.5rem);
                    }
                }
                @media (max-width: 767px) {
                    & {
                        width: calc((100% / 2) - 0.5rem);
                        min-width: calc((100% / 2) - 0.5rem);
                        max-width: calc((100% / 2) - 0.5rem);
                    }
                } */
                .list_btn {
                    height: 100%;
                    padding: 0;
                    .text_prev {
                        height: 100%;
                        width: 100%;
                    }
                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center center;
                    user-select: none;
                }
                .avatar {
                    position: absolute;
                    left: 10px;
                    top: 10px;
                    width: 35px;
                    height: 35px;
                    z-index: 22;
                    img {
                        border-radius: 50%;
                        width: 100%;
                    }
                }
            }
        }
        
    }
    /* Posts End */

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