import styled from "styled-components"

const SidebarStyled = styled.div`
    max-height: calc(100vh - 70px);
    overflow-y: auto;
    padding-right: .5rem;
    &::-webkit-scrollbar {
        background-color: transparent;
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #888;
    }
    .lb {
        height: 50px;
        color: #fff;
        display: flex;
        align-items: center;
        border-radius: 8px;
        text-decoration: none;
        padding: 0 1rem;
        div {
            color: #fff;
            font-size: 2rem;
            svg {
                color: #0da4fa;
            }
        }
    }
    .lb:hover {
        background-color: var(--bs-gray-800);
    }
`

export default SidebarStyled