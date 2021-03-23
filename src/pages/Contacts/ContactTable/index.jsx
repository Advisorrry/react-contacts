import React from 'react'
import { parseISO, format } from 'date-fns'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import { CopyToClickBoardText } from '../../../components/copyToClickBoardText'
import { FULL_NATIONALITIES_NAMES } from '../../../constants/nationality'

const useStyles = makeStyles({
    table: {},
})

export const ContactTable = ({ data }) => {
    const classes = useStyles()

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="cantacts table">
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
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.login.uuid}>
                            <TableCell component="th" scope="row">
                                <Avatar alt={item.name.first} src={item.picture.thumbnail} />
                            </TableCell>
                            <TableCell>
                                {item.name.title} {item.name.first} {item.name.last}
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {format(parseISO(item.dob.date), 'dd/MM/yyy')}
                                </Typography>

                                <Typography>{item.dob.age} years</Typography>
                            </TableCell>
                            <TableCell>
                                <CopyToClickBoardText text={item.email} />
                            </TableCell>
                            <TableCell className={classes.phoneWidth}>
                                <CopyToClickBoardText text={item.phone} />
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {'/'}
                                    {item.location.country}
                                    {'/'}
                                </Typography>
                                <Typography>
                                    {item.location.city}, {item.location.street.name}{' '}
                                    {item.location.street.number}{' '}
                                </Typography>
                            </TableCell>
                            <TableCell>{FULL_NATIONALITIES_NAMES[item.nat]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
