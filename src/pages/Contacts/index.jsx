import { CircularProgress, Container, Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { useContacts } from '../../hooks/useContacts'

import { ContactTable } from './ContactTable'

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

    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.headContainer}>
                    <Typography variant="h3" component="h1">
                        Contact
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {(() => {
                        if (contacts.isLoading) {
                            return <CircularProgress color="secondary" />
                        }
                        if (contacts.isError) {
                            return <div>...error</div>
                        }

                        return <ContactTable data={contacts.data} />
                    })()}
                </Grid>
            </Grid>
        </Container>
    )
}
