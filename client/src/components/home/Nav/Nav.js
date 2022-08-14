import { useContext, useEffect, useState } from "react"
import { Section, AccountMenu, TemporaryDrawer } from "./Nav.styled"
import { BiSearch } from 'react-icons/bi'
import { FiMenu } from 'react-icons/fi'
import { Link, Tooltip } from "@mui/material"
import { navList } from '../../../components/constant'
import { GeneralContext } from '../../../contextAPIs/GeneralContext'

const Nav = () => {
  const { me } = useContext(GeneralContext)
  const [state, setState] = useState({
      left: false,
      top: false,
      bottom: false,
      right: false,
  })
  const [screen, setScreen] = useState(false)

  const onResize = () => {
    if ( window.innerWidth <= 991 ) setScreen(true) 
    else setScreen(false)
  }

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [screen])

  return (
    <>
    <TemporaryDrawer state={state} setState={setState} />
    <nav>
        <Section className="nav_sec_1">
            <img src="./favicon.png" alt="facebook logo" />
            <div className="search">
                <input type="text" name="search" placeholder="search on facebook" />
                <span><BiSearch /></span>
            </div>
        </Section>
        <Section className="nav_sec_2">
            <ul>
                {navList.map(list => (
                    <Tooltip key={list.title} title={list.title}><li><Link href={list.href}>{list.icon}</Link></li></Tooltip>
                ))}
                {<Tooltip title="Menu"><li className="menu" onClick={() => setState({...state, left: true})}><a href="#"><FiMenu /></a></li></Tooltip>}
            </ul>
        </Section>
        <Section className="nav_sec_3">
            < AccountMenu me={me} />
        </Section>
    </nav>
    </>
  )
}

export default Nav