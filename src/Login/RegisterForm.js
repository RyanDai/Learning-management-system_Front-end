import React from 'react';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';

const styles = {
    errorStyle: {
        color: orange500,
    },
    underlineStyle: {
        borderColor: orange500,
    },
    floatingLabelStyle: {
        color: orange500,
    },
    floatingLabelFocusStyle: {
        color: blue500,
    },
};

const RegisterForm = () => (
    <div>
        <TextField
            hintText="Styled Hint Text"
            hintStyle={styles.errorStyle}
        /><br />
        <TextField
            hintText="Custom error color"
            errorText="This field is required."
            errorStyle={styles.errorStyle}
        /><br />
        <TextField
            hintText="Custom Underline Color"
            underlineStyle={styles.underlineStyle}
        /><br />
        <TextField
            hintText="Custom Underline Focus Color"
            underlineFocusStyle={styles.underlineStyle}
        /><br />
        <TextField
            floatingLabelText="Styled Floating Label Text"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            fullWidth={true}
        />
    </div>
);

export default RegisterForm;