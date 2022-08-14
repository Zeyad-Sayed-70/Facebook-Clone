import { Box, IconButton, List, ListItemButton } from '@mui/material'
import ContactsStyled from './Contacts.styled'
import LongMenu from './components/MoreButton'
import { Section, Title } from './Contacts.styled'

const Contacts = () => {
  return (
    <ContactsStyled>
        <Box>
            <Section>
                <Title>Contacts</Title>
                <LongMenu />
            </Section>
            <List></List>
        </Box>
    </ContactsStyled>
  )
}

export default Contacts