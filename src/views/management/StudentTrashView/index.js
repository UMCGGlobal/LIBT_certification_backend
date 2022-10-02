import React, {
    useState,
    useEffect,
    useCallback
} from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function StudentTrashView() {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [customers, setCustomers] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/getAll')
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCustomers(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }

            )
    }, [])

    if (!customers) {
        return null;
    }

    return (
        <Page
            className={classes.root}
            title="Students Trash"
        >
            <Container maxWidth={false}>
                <Header />
                {customers && (
                    <Box mt={3}>
                        <Results customers={customers} />
                    </Box>
                )}
            </Container>
        </Page>
    );
}

export default StudentTrashView;
