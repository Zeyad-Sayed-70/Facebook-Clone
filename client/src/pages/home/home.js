import HomeStyled from "./home.styled"
import Nav from "../../components/home/Nav/Nav"
import SideBar from '../../components/home/SideBar/SideBar'
import Contacts from '../../components/home/Contacts/Contacts'

const Home = () => {
  return (
    <HomeStyled>
        <Nav />
        <div className="main" >
          <section className="main_sec_1">
            <SideBar />
          </section>
          <section className="main_sec_2">
            Section 2
          </section>
          <section className="main_sec_3">
            <Contacts />
          </section>
        </div>
    </HomeStyled>
  )
}

export default Home