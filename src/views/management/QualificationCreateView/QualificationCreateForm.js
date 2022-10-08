import 'date-fns';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
  FormControl
} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import QuillEditor from 'src/components/QuillEditor';
import FilesDropzone from 'src/components/FilesDropzone';
import { values } from 'lodash';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';

const categories = [
  {
    id: 'no-id',
    name: 'Select a category'
  },
  {
    id: 'business-management',
    name: 'Business and Management'
  },
  {
    id: 'education-teaching-coaching',
    name: 'Education, Teaching and Coaching'
  },
  {
    id: 'law',
    name: 'Law'
  },
  {
    id: 'account-finance',
    name: 'Account and Finance'
  },
  {
    id: 'computer-science-it',
    name: 'Computer Science and IT'
  },
  {
    id: 'cyber-security',
    name: 'Cyber Security'
  },
  {
    id: 'human-resoruce-management',
    name: 'Human Resorce Management'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 200
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  accordianDetails: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textBox: {
    padding: '10px',
    border: '1px solid rgba(224, 224, 224)',
    borderRadius: '5px',
    width: '100%',
    marginBottom: '10px'
  },
  textBoxCode: {
    padding: '10px',
    border: '1px solid rgba(224, 224, 224)',
    borderRadius: '5px',
    width: '100%',
    marginBottom: '10px'
  },
  removeButton: {
    background: 'none',
    padding: '10px 8px',
    border: 'none',
    color: 'red'

  },
  col: {
    width: '55%'
  },
  colCode: {
    width: '85%'
  },
  col2: {
    width: '20%',
    marginLeft: '10px'
  }

}));

function StudentCreateForm({ className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();


  const [expanded, setExpanded] = React.useState(false);

  const handleChangeTab = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const emptyCodeArray = () => {
    console.log('ahjfh')
  }

  return (
    <Formik
      initialValues={{
        category: '',
        description: '',
        name: '',
        qualificationCode: [
          {
            code: '',
          }
        ],
        l4modules: [
          {
            name: '',
            code: ''

          },
        ],
        l5modules: [
          {
            name: '',
            code: ''

          },
        ],
        l7modules: [
          {
            name: '',
            code: ''

          },
        ],
        qualificationLevel: 'Level4/5'
        //isDelete: false,
        // salePrice: '',
        // images: [],
        // includesTaxes: false,
        // isTaxable: false,
        //price: '',
      }}
      validationSchema={Yup.object().shape({
        category: Yup.string().max(255),
        qualificationLevel: Yup.string().max(255),
        description: Yup.string().max(5000),
        name: Yup.string().max(255).required(),
        l4modules: Yup.array(),
        l5modules: Yup.array(),
        l7modules: Yup.array(),
        qualificationCode: Yup.array(),
        //isDelete: Yup.bool().required(),
        //qualificationCode: Yup.string().max(255),
        // salePrice: Yup.number().min(0),
        // images: Yup.array(),
        // includesTaxes: Yup.bool().required(),
        // isTaxable: Yup.bool().required(),
        //price: Yup.number().min(0).required(),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // Do api call
          fetch('http://localhost:3000/api/qualifications/post', {  // Enter your IP address here

            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
              category: values.category,
              name: values.name,
              qualificationCode: values.qualificationCode,
              description: values.description,
              l4modules: values.l4modules,
              l5modules: values.l5modules,
              l7modules: values.l7modules,
              qualificationLevel: values.qualificationLevel
              //isDelete: values.isDelete,
            }) // body data type must match "Content-Type" header   
          })
          console.log(JSON.stringify({
            category: values.category,
            name: values.name,
            qualificationCode: values.qualificationCode,
            description: values.description,
            l4modules: values.l4modules,
            l5modules: values.l5modules,
            l7modules: values.l7modules,
            qualificationLevel: values.qualificationLevel
            //isDelete: values.isDelete
          }))
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Qualification Successfully Created', {
            variant: 'success'
          });
          history.push('/app/management/qualifications');
        } catch (err) {
          setErrors({ submit: err.message });
          setStatus({ success: false });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        touched,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              lg={8}
            >
              <Card>
                <CardContent>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Qualification Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                  <Box
                    mt={3}
                    mb={1}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                    >
                      Description
                    </Typography>
                  </Box>
                  <Paper variant="outlined">
                    <QuillEditor
                      className={classes.editor}
                      value={values.description}
                      onChange={(value) => setFieldValue('description', value)}
                    />
                  </Paper>
                  {(touched.description && errors.description) && (
                    <Box mt={2}>
                      <FormHelperText error>
                        {errors.description}
                      </FormHelperText>
                    </Box>
                  )}
                </CardContent>
              </Card>
              <Box mt={3}
                mb={1} />
              <Typography
                variant="h6"
                color="textPrimary"
              >
                Add qualification modules
              </Typography>
              <Box mt={1}
                mb={3} />
              {/* Accordian Component */}

              <Accordion style={{ display: values.qualificationLevel !== 'Level4/5' ? 'none' : '' }} expanded={expanded === 'panel1'} onChange={handleChangeTab('panel1')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>Level 4 modules</Typography>
                  {/* <Typography className={classes.secondaryHeading}>I am an accordion</Typography> */}
                </AccordionSummary>
                <AccordionDetails className={classes.accordianDetails}>
                  <FieldArray name="l4modules">
                    {({ insert, remove, push }) => (
                      <div>
                        {values.l4modules.length > 0 &&
                          values.l4modules.map((friend, index) => (
                            <div className={classes.row} key={index}>
                              <div className={classes.col}>
                                {/* <label htmlFor={`l4modules.${index}.name`}>Name</label> */}
                                <Field
                                  name={`l4modules.${index}.name`}
                                  placeholder={`Enter module no ${index + 1}`}
                                  type="text"
                                  className={classes.textBox}
                                />
                                <ErrorMessage
                                  name={`l4modules.${index}.name`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>
                              <div className={classes.col2}>
                                {/* <label htmlFor={`l7modules.${index}.name`}>Name</label> */}
                                <Field
                                  name={`l4modules.${index}.code`}
                                  placeholder={`Enter module code ${index + 1}`}
                                  type="text"
                                  className={classes.textBox}
                                />
                                <ErrorMessage
                                  name={`l4modules.${index}.code`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>

                              <div className="col">
                                <button
                                  type="button"
                                  className={classes.removeButton}
                                  onClick={() => remove(index)}
                                >
                                  Remove module
                                </button>
                              </div>
                            </div>
                          ))}
                        <Button
                          type="button"
                          variant="outlined"
                          size="small"
                          color='secondary'
                          onClick={() => push({ name: '', code: '' })}
                        >
                          Add another module
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                </AccordionDetails>
              </Accordion>
              <Accordion style={{ display: values.qualificationLevel !== 'Level4/5' ? 'none' : '' }} expanded={expanded === 'panel2'} onChange={handleChangeTab('panel2')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography className={classes.heading}>Level 5 modules</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordianDetails}>
                  <FieldArray name="l5modules">
                    {({ insert, remove, push }) => (
                      <div>
                        {values.l5modules.length > 0 &&
                          values.l5modules.map((friend, index) => (
                            <div className={classes.row} key={index}>
                              <div className={classes.col}>
                                {/* <label htmlFor={`l5modules.${index}.name`}>Name</label> */}
                                <Field
                                  name={`l5modules.${index}.name`}
                                  placeholder={`Enter module no ${index + 1}`}
                                  type="text"
                                  className={classes.textBox}
                                />
                                <ErrorMessage
                                  name={`l5modules.${index}.name`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>
                              <div className={classes.col2}>
                                {/* <label htmlFor={`l7modules.${index}.name`}>Name</label> */}
                                <Field
                                  name={`l5modules.${index}.code`}
                                  placeholder={`Enter module code ${index + 1}`}
                                  type="text"
                                  className={classes.textBox}
                                />
                                <ErrorMessage
                                  name={`l5modules.${index}.code`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>

                              <div className="col">
                                <button
                                  type="button"
                                  className={classes.removeButton}
                                  onClick={() => remove(index)}
                                >
                                  Remove module
                                </button>
                              </div>
                            </div>
                          ))}
                        <Button
                          type="button"
                          variant="outlined"
                          size="small"
                          color='secondary'
                          onClick={() => push({ name: '', code: '' })}
                        >
                          Add another module
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                </AccordionDetails>
              </Accordion>
              <Accordion style={{ display: values.qualificationLevel !== 'Level7' ? 'none' : '' }} expanded={expanded === 'panel3'} onChange={handleChangeTab('panel3')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <Typography className={classes.heading}>Level 7 modules</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordianDetails}>
                  <FieldArray name="l7modules">
                    {({ insert, remove, push }) => (
                      <div>
                        {values.l7modules.length > 0 &&
                          values.l7modules.map((friend, index) => (
                            <div className={classes.row} key={index}>
                              <div className={classes.col}>
                                {/* <label htmlFor={`l7modules.${index}.name`}>Name</label> */}
                                <Field
                                  name={`l7modules.${index}.name`}
                                  placeholder={`Enter module no ${index + 1}`}
                                  type="text"
                                  className={classes.textBox}
                                />
                                <ErrorMessage
                                  name={`l7modules.${index}.name`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>
                              <div className={classes.col2}>
                                {/* <label htmlFor={`l7modules.${index}.name`}>Name</label> */}
                                <Field
                                  name={`l7modules.${index}.code`}
                                  placeholder={`Enter module code ${index + 1}`}
                                  type="text"
                                  className={classes.textBox}
                                />
                                <ErrorMessage
                                  name={`l7modules.${index}.code`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>

                              <div className="col">
                                <button
                                  type="button"
                                  className={classes.removeButton}
                                  onClick={() => remove(index)}
                                >
                                  Remove module
                                </button>
                              </div>
                            </div>
                          ))}
                        <Button
                          type="button"
                          variant="outlined"
                          size="small"
                          color='secondary'
                          onClick={() => push({ name: '', code: '' })}
                        >
                          Add another module
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                </AccordionDetails>
              </Accordion>

              {/* Accordian component end */}



            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
            >
              <Card>
                <CardHeader title="Select Qualification Level" />
                <Divider />
                <CardContent>

                  <FormControl component="fieldset">
                    {/* <FormLabel component="legend" style={{ fontSize: 18, fontWeight: 'bold' }}>Qualification Level</FormLabel> */}
                    <RadioGroup
                      style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                      aria-label="Qualification Level"
                      name="qualificationLevel"
                      value={values.qualificationLevel}
                      onChange={(qlevel) => { setFieldValue("qualificationLevel", qlevel.currentTarget.value); setFieldValue("qualificationCode", []) }}>
                      <FormControlLabel value="Level4/5" control={<Radio />} label={<Typography style={{ fontSize: 14 }}>Level 4 & 5</Typography>} />
                      <FormControlLabel value="Level7" control={<Radio />} label={<Typography style={{ fontSize: 14 }}>Level 7</Typography>} />
                    </RadioGroup>
                  </FormControl>

                </CardContent>
              </Card>
              <Box mt={3} />
              <Card>
                <CardHeader title="Other Details" />
                <Divider />
                <CardContent>
                  <Box mt={1}>


                    {values.qualificationLevel == 'Level4/5' ? <FieldArray name="qualificationCode">
                      {({ insert, remove, push }) => (
                        <div>
                          {values.qualificationCode.length > 0 &&
                            values.qualificationCode.map((friend, index) => (
                              <div className={classes.row} key={index}>
                                <div className={classes.colCode}>
                                  <Field
                                    name={`qualificationCode.${index}.code`}
                                    placeholder={`Enter level ${index + 4} code `}
                                    type="text"
                                    className={classes.textBoxCode}
                                  />
                                  <ErrorMessage
                                    name={`qualificationCode.${index}.code`}
                                    component="div"
                                    className="field-error"
                                  />
                                </div>


                                <div className="col">
                                  <button
                                    type="button"
                                    className={classes.removeButton}
                                    onClick={() => remove(index)}
                                  >
                                    X
                                  </button>
                                </div>
                              </div>
                            ))}
                          <Button
                            type="button"
                            variant="outlined"
                            size="small"
                            color='secondary'
                            style={{ display: values.qualificationCode.length == 2 && 'none' }}
                            onClick={() => push({ code: '', })}
                          >
                            Add a code
                          </Button>
                        </div>
                      )}
                    </FieldArray> :
                      <FieldArray name="qualificationCode">
                        {({ insert, remove, push }) => (
                          <div>
                            {values.qualificationCode.length > 0 &&
                              values.qualificationCode.map((friend, index) => (
                                <div className={classes.row} key={index}>
                                  <div className={classes.colCode}>
                                    <Field
                                      name={`qualificationCode.${index}.code`}
                                      placeholder={`Enter level ${index + 7} code `}
                                      type="text"
                                      className={classes.textBoxCode}
                                    />
                                    <ErrorMessage
                                      name={`qualificationCode.${index}.code`}
                                      component="div"
                                      className="field-error"
                                    />
                                  </div>


                                  <div className="col">
                                    <button
                                      type="button"
                                      className={classes.removeButton}
                                      onClick={() => remove(index)}
                                    >
                                      X
                                    </button>
                                  </div>
                                </div>
                              ))}
                            <Button
                              type="button"
                              variant="outlined"
                              size="small"
                              color='secondary'
                              style={{ display: values.qualificationCode.length == 1 && 'none' }}
                              onClick={() => push({ code: '', })}
                            >
                              Add a code
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                    }






                    {/* <TextField
                      error={Boolean(touched.qualificationCode && errors.qualificationCode)}
                      fullWidth
                      helperText={touched.qualificationCode && errors.qualificationCode}
                      label="Qualification ID"
                      name="qualificationCode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.qualificationCode}
                      variant="outlined"
                    />
                  </Box>
                  <Box mt={2} mb={2}>
                    <TextField
                      error={Boolean(touched.qualificationCode && errors.qualificationCode)}
                      fullWidth
                      helperText={touched.qualificationCode && errors.qualificationCode}
                      label="Qualification Code"
                      name="qualificationCode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.qualificationCode}
                      variant="outlined"
                    /> */}
                  </Box>
                  <Box mt={5} />
                  <TextField
                    fullWidth
                    label="Qualification Category"
                    name="category"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.category}
                    variant="outlined"
                  >
                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.name}
                      >
                        {category.name}
                      </option>
                    ))}
                  </TextField>


                </CardContent>
              </Card>


            </Grid>
          </Grid>
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            //onClick={() => { addStudent() }}
            >
              Save student
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

StudentCreateForm.propTypes = {
  className: PropTypes.string
};

export default StudentCreateForm;
