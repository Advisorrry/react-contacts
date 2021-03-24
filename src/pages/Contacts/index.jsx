import React from 'react'

import { Box, CircularProgress, Container, Grid, Typography } from '@material-ui/core'
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
    }),
)




export const Contacts = () => {
    const classes = useStyles()
    const contacts = useContacts()

    const [viewMode, setViewMode] = useViewMode()

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
                    <ToggleViewMode viewMode={viewMode} setViewMode={setViewMode} />
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
