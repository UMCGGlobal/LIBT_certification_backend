import React from 'react';
import { useLocation } from "react-router-dom";
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import StudentEditForm from './StudentEditForm';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: 100
    }
}));

function StudentEditView(props) {
    const location = useLocation();
    const state = location.state;
    const classes = useStyles();

    return (
        <Page
            className={classes.root}
            title={state.name}
        >
            <Container maxWidth="lg">
                <Header />
                <StudentEditForm state={state} />
            </Container>
        </Page>
    );
}

export default StudentEditView;
