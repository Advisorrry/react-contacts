import React from 'react'

import { CircularProgress, Container, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { useContacts } from '../../hooks/useContacts'
import { ContactTable } from './ContactTable'
import { DATA_VIEW_MODES } from '../../constants/data_view_modes'
import { useViewMode } from '../../hooks/useViewMode'
import { ContactsFilters } from '../ContactsFilters'
import { Header } from '../../components/Header'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(3),
        },
        headContainer: {
            marginBottom: theme.spacing(3),
        },
    }),
)

const filtersDefaultValue = {
    fullname: '',
    gender: 'all',
    nationality: 'all',
}
const filterByFullname = ({ first, last }, fullname) => {
    return (
        first?.toLowerCase().includes(fullname.toLowerCase()) ||
        last?.toLowerCase().includes(fullname.toLowerCase())
    )
}
const filterByGender = (gender, filterGender) => {
    if (filterGender === 'all') return true
    return gender === filterGender
}
const filterByNationality = (nationality, filterNationality) => {
    if (filterNationality === 'all') return true
    return nationality === filterNationality
}

export const Contacts = () => {
    const classes = useStyles()
    const contacts = useContacts()

    const [filters, setFilters] = React.useState(filtersDefaultValue)

    const [viewMode, setViewMode] = useViewMode()

    React.useEffect(() => {
        localStorage.setItem('viewMode', viewMode)
    }, [viewMode])

    const updateFilters = React.useCallback((name, value) => {
        setFilters((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        }))
    }, [])

    const clearFilters = React.useCallback(() => {
        setFilters(filtersDefaultValue)
    }, [])

    const filteredContacts = contacts.data
        .filter((c) => filterByFullname(c.name, filters.fullname))
        .filter((c) => filterByGender(c.gender, filters.gender))
        .filter((c) => filterByNationality(c.nat, filters.nationality))

    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Header viewMode={viewMode} setViewMode={setViewMode} />
                <ContactsFilters
                    filters={filters}
                    updateFilters={updateFilters}
                    clearFilters={clearFilters}
                />
                <Grid item xs={12}>
                    {(() => {
                        if (contacts.isLoading) {
                            return <CircularProgress color="secondary" />
                        }
                        if (contacts.isError) {
                            return <div>...error</div>
                        }
                        if (viewMode === DATA_VIEW_MODES.TABLE) {
                            return <ContactTable data={filteredContacts} />
                        }
                        if (viewMode === DATA_VIEW_MODES.GRID) {
                            return 'grid'
                        }
                    })()}
                </Grid>
            </Grid>
        </Container>
    )
}
