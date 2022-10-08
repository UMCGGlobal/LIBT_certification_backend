import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import QualificationCreateForm from './QualificationCreateForm';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

function QualificationCreateView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Add new qualification"
    >
      <Container maxWidth="lg">
        <Header />
        <QualificationCreateForm />
      </Container>
    </Page>
  );
}

export default QualificationCreateView;
