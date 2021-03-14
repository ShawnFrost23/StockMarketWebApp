import React from 'react'

import styles from './PasswordResetContainer.module.css';
import CustomTextField from '../CustomTextField/CustomTextField';
import CustomButton from '../CustomButton/CustomButton';
import LogRegHeading from '../LogRegHeading/LogRegHeading';
function PasswordResetContainer() {
    const [veriCode, setVeriCode] = React.useState(0);
    const [veriCodeErr, setVeriCodeErr] = React.useState(false);
    const [veriCodeHelpText, setVeriCodeHelpText] = React.useState('');
    const [newPass, setNewPass] = React.useState('');
    const [confirmNewPass, setConfirmNewPass] = React.useState('');

    return (
        <div className={styles.container}>
            <LogRegHeading 
                heading="Password Reset"
            />
            <CustomTextField 
                placeholder="Verification Code"
                setValue={setVeriCode}
                errorStatus={veriCodeErr}
                helperText={veriCodeHelpText}
            />
            <CustomTextField 
                placeholder="New Password"
                type='password'
                setValue={setNewPass}
            />
            <CustomTextField 
                placeholder="Confirm New Password"
                type='password'
                setValue={setConfirmNewPass}
            />
            <CustomButton
                displayText="Change Password"
                //func={handleLogin}
            />
            <CustomButton
                displayText="Cancel"
                //func={registerButtonHandler}
            />
        </div>
    )
}

export default PasswordResetContainer
