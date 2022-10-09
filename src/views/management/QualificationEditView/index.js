import React from 'react';
import { useLocation } from "react-router-dom";
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import QualificationEditForm from './QualificationEditForm';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

function QualificationEditView() {
  const classes = useStyles();
  const location = useLocation();
  const state = location.state;

  return (
    <Page
      className={classes.root}
      title="Edit qualification"
    >
      <Container maxWidth="lg">
        <Header />
        <QualificationEditForm state={state} />
      </Container>
    </Page>
  );
}

export default QualificationEditView;
