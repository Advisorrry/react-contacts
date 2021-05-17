import { TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'

export const ContactsTableHead = React.memo(() => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Full name</TableCell>
                <TableCell>Birthday</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Nationality</TableCell>
            </TableRow>
        </TableHead>
    )
})
