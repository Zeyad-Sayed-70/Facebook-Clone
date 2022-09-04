import HomeStyled from "./home.styled"
import Nav from "../../components/home/Nav/Nav"
import SideBar from '../../components/home/SideBar/SideBar'
import Contacts from '../../components/home/Contacts/Contacts'
import Posts from '../../components/home/Posts/Posts'
import Story from '../../components/home/Stories/Story'
import { GeneralContext } from '../../contextAPIs/GeneralContext'
import { useContext } from "react"

const Home = () => {
  return (
    <HomeStyled>
        <Nav />
        <div className="main" >
          <section className="main_sec_1">
            <SideBar />
          </section>
          <section className="main_sec_2">
            <Story />
            <Posts />
          </section>
          <section className="main_sec_3">
            <Contacts />
          </section>
        </div>
    </HomeStyled>
  )
}

export default Home