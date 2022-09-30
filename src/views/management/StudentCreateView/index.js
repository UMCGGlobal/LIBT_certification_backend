import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import StudentCreateForm from './StudentCreateForm';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

function StudentCreateView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Add new student"
    >
      <Container maxWidth="lg">
        <Header />
        <StudentCreateForm />
      </Container>
    </Page>
  );
}

export default StudentCreateView;
