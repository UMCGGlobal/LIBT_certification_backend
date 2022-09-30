import 'date-fns';
import { format } from 'date-fns';
import React, { useEffect } from 'react';
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
    makeStyles,
    FormControl
} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import QuillEditor from 'src/components/QuillEditor';
import FilesDropzone from 'src/components/FilesDropzone';



const categories = [

    {
        id: 'level-7-diploma-in-strategic-management-and-leadership',
        name: 'Level 7 Diploma in Strategic Management and Leadership'
    },
    {
        id: 'level-7-diploma-in-educational-management-and-leadership',
        name: 'Level 7 Diploma in Educational Management and Leadership'
    },
    {
        id: 'level-7-diploma-in-international-business-law',
        name: 'Level 7 Diploma in International Business Law'
    },
    {
        id: 'level-7-extended-diploma-in-accounting-finance',
        name: 'Level 7 Diploma in Accounting and Finance'
    },
    {
        id: 'level-7-diploma-in-computing',
        name: 'Level 7 Diploma in Computing'
    },
    {
        id: 'level-7-diploma-in-human-resource-management',
        name: 'Level 7 Diploma in Human Resource Management'
    },
    {
        id: 'level-4-5-diploma-in-business-management',
        name: 'Level 4 & 5 Diploma in Business Management'
    },
    {
        id: 'level-4-5-diploma-in-information-technology',
        name: 'Level 4 & 5 Diploma in Information Technology'
    },

];


const useStyles = makeStyles(() => ({
    root: {},
    editor: {
        '& .ql-editor': {
            height: 400
        }
    }
}));

function StudentEditForm({ state, className, ...rest }) {



    useEffect(() => {
        console.log('nameeeeeeeeee' + JSON.stringify(state.id))
    })
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const [course, setCourse] = React.useState(state.course);

    const courseChange = (event) => {
        setCourse(event.target.value);
    };




    const [expireDate, setExpireDate] = React.useState(new Date());

    const handleDateChangeExpire = (date) => {
        setExpireDate(date);
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{
                category: state.course,
                description: state.description,
                name: state.name,
                studentId: state.studentId,
                studentEmail: state.email,
                issuedDate: state.issuedDate,
                // images: [],
                // includesTaxes: false,
                // isTaxable: false,                
                // price: '',                               
                // salePrice: '',

            }}
            validationSchema={Yup.object().shape({
                category: Yup.string().max(255),
                description: Yup.string().max(5000),
                name: Yup.string().max(255).required(),
                studentId: Yup.string().max(255),
                studentEmail: Yup.string().max(255),
                issuedDate: Yup.date().nullable(),
                // images: Yup.array(),
                // includesTaxes: Yup.bool().required(),
                // isTaxable: Yup.bool().required(),    
                // price: Yup.number().min(0).required(),    
                // salePrice: Yup.number().min(0)
            })}
            onSubmit={async (values, {
                setErrors,
                setStatus,
                setSubmitting
            }) => {
                try {
                    // Do api call
                    fetch(`http://localhost:3000/api/update/${state.id}`, {  // Enter your IP address here

                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                        body: JSON.stringify({
                            student: values.studentId,
                            name: values.name,
                            email: values.studentEmail,
                            description: values.description,
                            course: values.category,
                            issuedDate: values.issuedDate,
                            // expireDate: "2022/08/13"
                        }) // body data type must match "Content-Type" header   

                    })
                    alert(state._id);
                    setStatus({ success: true });
                    setSubmitting(false);
                    enqueueSnackbar('Student Updated', {
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

                                    {/* <TextField
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
                                                value={category.id}
                                                defaultValue={state.course}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </TextField> */}
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend" style={{ fontSize: 13 }}>Course</FormLabel>
                                        <RadioGroup aria-label="course" name="course" value={values.category} onChange={(course) => setFieldValue("category", course.currentTarget.value)}>
                                            <FormControlLabel style={{ marginBottom: '12px' }} value="Level 4 & 5 Diploma in Business Management" control={<Radio />} label={<Typography style={{ fontSize: 14 }}>Level 4 & 5 Diploma in Business Management</Typography>} />
                                            <FormControlLabel style={{ marginBottom: '12px' }} value="Level 7 Diploma in Strategic Management and Leadership" control={<Radio />} label={<Typography style={{ fontSize: 14 }}>Level 7 Diploma in Strategic Management and Leadership</Typography>} />
                                            <FormControlLabel style={{ marginBottom: '12px' }} value="Level 7 Diploma in Educational Management and Leadership" control={<Radio />} label={<Typography style={{ fontSize: 14 }}>Level 7 Diploma in Educational Management and Leadership</Typography>} />
                                            <FormControlLabel style={{ marginBottom: '12px' }} value="Level 7 Diploma in Computing" control={<Radio />} label={<Typography style={{ fontSize: 14 }}>Level 7 Diploma in Computing</Typography>} />
                                            <FormControlLabel value="Level 4 & 5 Diploma in Information Technology" control={<Radio />} label={<Typography style={{ fontSize: 14 }}>Level 4 & 5 Diploma in Information Technology</Typography>} />
                                        </RadioGroup>
                                    </FormControl>

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
                                            value={expireDate}
                                            onChange={handleDateChangeExpire}
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

                        >
                            Save student
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
}

StudentEditForm.propTypes = {
    className: PropTypes.string,
};

export default StudentEditForm;
