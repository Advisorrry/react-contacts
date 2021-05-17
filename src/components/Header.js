import { Box, createStyles, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { ToggleViewMode } from './ToggleViewMode'

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
export const Header = React.memo(({ viewMode, setViewMode }) => {
    const classes = useStyles()
    return (
        <Grid item xs={12} className={classes.headContainer}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h4" component="h1">
                    Contacts
                </Typography>
                <ToggleViewMode viewMode={viewMode} setViewMode={setViewMode} />
            </Box>
        </Grid>
    )
})
