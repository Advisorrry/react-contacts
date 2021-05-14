import React from 'react'

import {
    Box,
    CircularProgress,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { useContacts } from '../../hooks/useContacts'
import { ContactTable } from './ContactTable'
import { ToggleViewMode } from '../../components/ToggleViewMode'
import { DATA_VIEW_MODES } from '../../constants/data_view_modes'
import { useViewMode } from '../../hooks/useViewMode'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(3),
        },
        headContainer: {
            marginBottom: theme.spacing(3),
        },
        filtersContainer: {},
        formControl: {
            minWidth: 120,
        },
    }),
)

const filtersDefaultValue = {
    fullname: '',
    gender: '',
}

export const Contacts = () => {
    const classes = useStyles()
    const contacts = useContacts()

    const [filters, setFilters] = React.useState(filtersDefaultValue)

    const [viewMode, setViewMode] = useViewMode()

    React.useEffect(() => {
        localStorage.setItem('viewMode', viewMode)
    }, [viewMode])

    const handleChangeFilter = (e) => {
        setFilters((prevFilter) => ({
            ...prevFilter,
            [e.target.name]: e.target.value,
        }))
    }

    const filterByFullname = ({ first, last }, fullname) => {
        return (
            first?.toLowerCase().includes(fullname.toLowerCase()) ||
            last?.toLowerCase().includes(fullname.toLowerCase())
        )
    }
    const filterByGender = (gender, filterGender) => {
        if (filterGender.length === 0) return true
        return gender === filterGender
    }

    const filteredContacts = contacts.data
        .filter((c) => filterByFullname(c.name, filters.fullname))
        .filter((c) => filterByGender(c.gender, filters.gender))

    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.headContainer}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h4" component="h1">
                            Contacts
                        </Typography>
                        <ToggleViewMode viewMode={viewMode} setViewMode={setViewMode} />
                    </Box>
                </Grid>
                <Grid item xs={12} className={classes.filtersContainer}>
                    <Box display="flex">
                        <TextField
                            label="Search by full name"
                            variant="outlined"
                            size="small"
                            name="fullname"
                            value={filters.fullname}
                            onChange={handleChangeFilter}
                        />
                        <FormControl
                            variant="outlined"
                            size="small"
                            className={classes.formControl}>
                            <InputLabel id="gender">Gender</InputLabel>
                            <Select
                                onChange={handleChangeFilter}
                                labelId="gender"
                                name="gender"
                                value={filters.gender}>
                                <MenuItem value={''}>All</MenuItem>
                                <MenuItem value={'male'}>Male</MenuItem>
                                <MenuItem value={'female'}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
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
