import { AiOutlineHome, AiFillHome, AiOutlineShop } from 'react-icons/ai'
import { MdOndemandVideo } from 'react-icons/md'
import { RiGroupLine, RiGroupFill } from 'react-icons/ri'
import { HiUserGroup, HiOutlineUserGroup } from 'react-icons/hi'
import { BiUserCircle } from 'react-icons/bi'
import { BsGear } from 'react-icons/bs'


// backend server url
export const BACKEND_URL = 'http://localhost:5000/'

// login data schema
export const loginSchema = {
    email: '',
    phoneNumber: '',
    password: '',
}

// current year
export const YEAR_NOW = 2022

// Birth date {day, month, year}
export const birth = {
    day: [],
    month: ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Seb', 'Oct', 'Nov', 'Dec'],
    year: [],
}

for ( let i = 1; i <= YEAR_NOW; i++ ) {
    if ( i >= 1 && i <= 31 ) {
        birth.day.push(i)
    }

    if ( i >= 1905 && i <= YEAR_NOW ) {
        birth.year.push(i)
    }
}

birth.year.reverse()


// Nav List
export const navListRes = [
    {
        title: 'Profile',
        href: '/profile',
        icon: <BiUserCircle />,
        iconSelected: <BiUserCircle />
    },
    {
        title: 'Home',
        href: '/',
        icon: <AiOutlineHome />,
        iconSelected: <AiFillHome />
    },
    {
        title: 'Friends',
        href: '#',
        icon: <RiGroupLine />,
        iconSelected: <RiGroupFill />
    },
    {
        title: 'Watch',
        href: '#',
        icon: <MdOndemandVideo />,
        iconSelected: <MdOndemandVideo />
    },
    {
        title: 'Market',
        href: '#',
        icon: <AiOutlineShop />,
        iconSelected: <AiOutlineShop />
    },
    {
        title: 'Groups',
        href: '#',
        icon: <HiOutlineUserGroup />,
        iconSelected: <HiUserGroup />
    },
    {
        title: 'Setting',
        href: '/setting',
        icon: <BsGear />,
        iconSelected: <BsGear />
    }
]

export const navList = [
    {
        title: 'Home',
        href: '/',
        icon: <AiOutlineHome />,
        iconSelected: <AiFillHome />
    },
    {
        title: 'Friends',
        href: '#',
        icon: <RiGroupLine />,
        iconSelected: <RiGroupFill />
    },
    {
        title: 'Watch',
        href: '#',
        icon: <MdOndemandVideo />,
        iconSelected: <MdOndemandVideo />
    },
    {
        title: 'Market',
        href: '#',
        icon: <AiOutlineShop />,
        iconSelected: <AiOutlineShop />
    },
    {
        title: 'Groups',
        href: '#',
        icon: <HiOutlineUserGroup />,
        iconSelected: <HiUserGroup />
    }
]