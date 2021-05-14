import React from 'react'
import { render, screen } from '@testing-library/react'
import { ContactTable } from '../pages/Contacts'

test(`contacts get data succes`, () => {
    render(<ContactTable />)
    screen.debug()
})
