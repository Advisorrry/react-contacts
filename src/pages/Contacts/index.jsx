import React from 'react'

import { Box, CircularProgress, Container, Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { useContacts } from '../../hooks/useContacts'
import { ContactTable } from './ContactTable'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import ViewListIcon from '@material-ui/icons/ViewList'
import ViewModuleIcon from '@material-ui/icons/ViewModule'

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
const DATA_VIEW_MODES = {
    TABLE: 'table',
    GRID: 'grid',
}

const getInitialDataViewMode = () => {
    return localStorage.getItem('viewMode') || DATA_VIEW_MODES.TABLE
}

export const Contacts = () => {
    const classes = useStyles()
    const contacts = useContacts()

    const [viewMode, setViewMode] = React.useState(getInitialDataViewMode)

    const handleChangeViewMode = (_, nextview) => {
        setViewMode(nextview)
    }

    React.useEffect(() => {
        localStorage.setItem('viewMode', viewMode)
    }, [viewMode])
    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.headContainer}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h4" component="h1">
                            Contacts
                        </Typography>
                        <ToggleButtonGroup
                            orientation="horizontal"
                            onChange={handleChangeViewMode}
                            value={viewMode}
                            exclusive>
                            <ToggleButton
                                value={DATA_VIEW_MODES.GRID}
                                aria-label={DATA_VIEW_MODES.GRID}>
                                <ViewModuleIcon />
                            </ToggleButton>
                            <ToggleButton
                                value={DATA_VIEW_MODES.TABLE}
                                aria-label={DATA_VIEW_MODES.TABLE}>
                                <ViewListIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
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
                            return <ContactTable data={contacts.data} />
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
