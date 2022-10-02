import 'date-fns';
import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
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
  makeStyles
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import QuillEditor from 'src/components/QuillEditor';
import FilesDropzone from 'src/components/FilesDropzone';
import { values } from 'lodash';

const categories = [
  {
    id: 'no-id',
    name: 'Select a course'
  },
  {
    id: 'level-4-5-diploma-in-business-management',
    name: 'Level 4 & 5 Diploma in Business Management'
  },
  {
    id: 'level-7-diploma-in-strategic-management-and-leadership',
    name: 'Level 7 Diploma in Strategic Management and Leadership'
  },
  {
    id: 'level-7-diploma-in-educational-management-and-leadership',
    name: 'Level 7 Diploma in Educational Management and Leadership'
  },
  {
    id: 'level-7-diploma-in-computing',
    name: 'Level 7 Diploma in Computing'
  },
  {
    id: 'level-4-5-diploma-in-information-technology',
    name: 'Level 4 & 5 Diploma in Information Technology'
  }
];

const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}));

function StudentCreateForm({ className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        category: '',
        description: '',
        name: '',
        studentId: '',
        studentEmail: '',
        issuedDate: new Date(),
        expireDate: '',
        isDelete: false,
        // salePrice: '',
        // images: [],
        // includesTaxes: false,
        // isTaxable: false,
        //price: '',
      }}
      validationSchema={Yup.object().shape({
        category: Yup.string().max(255),
        description: Yup.string().max(5000),
        name: Yup.string().max(255).required(),
        studentId: Yup.string().max(255),
        issuedDate: Yup.date().nullable(),
        expireDate: Yup.date().nullable(),
        isDelete: Yup.bool().required(),
        //studentEmail: Yup.string().max(255),
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
          fetch('http://ec2-3-91-144-53.compute-1.amazonaws.com:3000/api/post', {  // Enter your IP address here

            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
              student: values.studentId,
              name: values.name,
              email: values.studentEmail,
              description: values.description,
              course: values.category,
              issuedDate: values.issuedDate,
              expireDate: values.expireDate,
              isDelete: values.isDelete,
            }) // body data type must match "Content-Type" header   
          })
          console.log(JSON.stringify({
            student: values.studentId,
            name: values.name,
            email: values.studentEmail,
            description: values.description,
            course: values.category,
            issuedDate: values.issuedDate,
            expireDate: values.expireDate,
            isDelete: values.isDelete
          }))
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Student Created', {
            variant: 'success'
          });
          history.push('/app/management/students');
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
                    label="Student Name"
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
              <Box mt={3}>
                <Card>
                  <CardHeader title="Upload Certificate" />
                  <Divider />
                  <CardContent>
                    <FilesDropzone />
                  </CardContent>
                </Card>
              </Box>
              {/* <Box mt={3}>
                <Card>
                  <CardHeader title="Prices" />
                  <Divider />
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.price && errors.price)}
                          fullWidth
                          helperText={touched.price && errors.price
                            ? errors.price
                            : 'If you have a sale price this will be shown as old price'}
                          label="Price"
                          name="price"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.price}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.salePrice && errors.salePrice)}
                          fullWidth
                          helperText={touched.salePrice && errors.salePrice}
                          label="Sale price"
                          name="salePrice"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.salePrice}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Box mt={2}>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={values.isTaxable}
                            onChange={handleChange}
                            value={values.isTaxable}
                            name="isTaxable"
                          />
                        )}
                        label="Product is taxable"
                      />
                    </Box>
                    <Box mt={2}>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={values.includesTaxes}
                            onChange={handleChange}
                            value={values.includesTaxes}
                            name="includesTaxes"
                          />
                        )}
                        label="Price includes taxes"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box> */}
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
            >
              <Card>
                <CardHeader title="Other Details" />
                <Divider />
                <CardContent>
                  <Box mt={1}>
                    <TextField
                      error={Boolean(touched.studentId && errors.studentId)}
                      fullWidth
                      helperText={touched.studentId && errors.studentId}
                      label="Student ID"
                      name="studentId"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.studentId}
                      variant="outlined"
                    />
                  </Box>
                  <Box mt={2} mb={2}>
                    <TextField
                      error={Boolean(touched.studentEmail && errors.studentEmail)}
                      fullWidth
                      helperText={touched.studentEmail && errors.studentEmail}
                      label="Student Email"
                      name="studentEmail"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.studentEmail}
                      variant="outlined"
                    />
                  </Box>
                  <TextField
                    fullWidth
                    label="Course"
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

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Issued date"
                      value={values.issuedDate}
                      onChange={value => setFieldValue("issuedDate", value)}
                      fullWidth
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />

                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Expire date"
                      value={values.expireDate}
                      onChange={value => setFieldValue("expireDate", value)}
                      fullWidth
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}

                    />

                  </MuiPickersUtilsProvider>
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
