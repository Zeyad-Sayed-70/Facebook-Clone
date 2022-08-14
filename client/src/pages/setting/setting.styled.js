import  styled from 'styled-components'

const SettingStyled = styled.div`
    width: calc(100% - 10rem);
    max-width: calc(100% - 10rem);
    margin: 5rem 5rem;
    @media (max-width: 991px) {
        margin: 0;
        width: 100%;
        max-width: 100%;
    }
    .main {
        min-height: calc(100vh - 10rem);
    }
    @media (max-width: 767px) {
        .main {
            flex-direction: column;
        }
    }
    .bg-overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: #333;
        z-index: -1;
    }
   .sidebar > div {
    position: static;
    background-color: #222;
    color: #dcdcdc;
    svg {
        color: #999;
    }
   }
   .sidebar .list:hover {
        background-color: var(--bs-gray-700);
   }
   .list.selected {
        background-color: var(--bs-gray-800);
   }
   @media (max-width: 767px) {
        .sidebar {
            width: 100%;
        }
        .sidebar > div {
            flex-direction: row;
            width: 100%;
        }
   }
`

export default SettingStyled