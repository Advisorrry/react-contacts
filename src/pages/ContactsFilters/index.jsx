import {
    Box,
    FormControl,
    Grid,
    Select,
    TextField,
    MenuItem,
    makeStyles,
    createStyles,
    Button,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'
import PropTypes from 'prop-types'
import { FULL_NATIONALITIES_NAMES } from '../../constants/nationality'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(3),
        },
        fieldsContainer: {
            '& > *:not(:last-child)': {
                marginRight: theme.spacing(4),
            },
        },
        filtersContainer: {},
        formControl: {
            minWidth: 140,
        },
        button: {
            minWidth: 120,
        },
    }),
)

const FieldGender = React.memo(({ value, onChange }) => {
    const classes = useStyles()
    return (
        <FormControl size="small" variant="outlined" className={classes.formControl}>
            <Select onChange={onChange} labelId="gender" name="gender" value={value}>
                <MenuItem value={'all'}>All</MenuItem>
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
            </Select>
        </FormControl>
    )
})
const FieldNationality = React.memo(({ value, onChange }) => {
    const classes = useStyles()
    return (
        <FormControl size="small" variant="outlined" className={classes.formControl}>
            <Select onChange={onChange} labelId="nationality" name="nationality" value={value}>
                <MenuItem value={'all'}>All</MenuItem>
                {Object.entries(FULL_NATIONALITIES_NAMES).map(([key, name]) => (
                    <MenuItem key={key} value={key}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
})
const FieldFullname = React.memo(({ value, onChange }) => {
    return (
        <TextField
            label="Search by full name"
            size="small"
            variant="outlined"
            name="fullname"
            value={value}
            onChange={onChange}
        />
    )
})

export const ContactsFilters = React.memo(({ filters, updateFilters, clearFilters }) => {
    const classes = useStyles()
    const handleChangeFilter = React.useCallback(
        (e) => {
            updateFilters(e.target.name, e.target.value)
        },
        [updateFilters],
    )

    return (
        <Grid item xs={12} className={classes.filtersContainer}>
            <Box display="flex" justifyContent="space-between">
                <Box display="flex" className={classes.fieldsContainer}>
                    <FieldFullname value={filters.fullname} onChange={handleChangeFilter} />
                    <FieldGender value={filters.gender} onChange={handleChangeFilter} />
                    <FieldNationality value={filters.nationality} onChange={handleChangeFilter} />
                </Box>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                    size="small"
                    startIcon={<CloseIcon />}
                    onClick={clearFilters}>
                    Clear
                </Button>
            </Box>
        </Grid>
    )
})

ContactsFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    updateFilters: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
}
