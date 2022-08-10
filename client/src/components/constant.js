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