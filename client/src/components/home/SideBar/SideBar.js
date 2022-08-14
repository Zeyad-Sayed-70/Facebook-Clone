import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import SidebarStyled from './SideBar.styled'
import { navListRes } from '../../constant'

const SideBar = () => {
  return (
    <>
    <SidebarStyled>
        {navListRes.map(list => (
            <a className="lb" key={list.title} as="a" href={list.href}>
                <ListItemIcon>{list.icon}</ListItemIcon>
                <ListItemText>{list.title}</ListItemText>
            </a>
        ))}
    </SidebarStyled>
    </>
  )
}

export default SideBar