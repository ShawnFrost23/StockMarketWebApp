import React from 'react'

import styles from './PasswordResetContainer.module.css';
import CustomTextField from '../CustomTextField/CustomTextField';
import CustomButton from '../CustomButton/CustomButton';
import LogRegHeading from '../LogRegHeading/LogRegHeading';
function PasswordResetContainer() {
    // Verification Code State Variables
    const [veriCode, setVeriCode] = React.useState('');
    const [veriCodeErr, setVeriCodeErr] = React.useState(false);
    const [veriCodeHelpText, setVeriCodeHelpText] = React.useState('');

    // New Password State Variables
    const [newPass, setNewPass] = React.useState('');
    const [newPassErr, setNewPassErr] = React.useState(false);
    const [newPassHelpText, setNewPassHelpText] = React.useState('');

    // Confirm New Passwrod State Variables
    const [confirmNewPass, setConfirmNewPass] = React.useState('');
    const [confirmNewPassErr, setConfirmNewPassErr] = React.useState(false);
    const [confirmNewPassHelpText, setConfirmNewPassHelpText] = React.useState('');

    // Function to check verification code in input field.
    const checkVeriCode = (veriCode) => {
        if (veriCode === '') {
            setVeriCodeHelpText('Enter Verification Code');
            return false;
        }
        return true;
    }
    
    // Function to check confirm new passsword in the input field and verify
    // if the entered passwords match or not.
    const checkPass = (newPass, confirmNewPass) => {
        if (newPass === '' || confirmNewPass === '') {
            if (newPass === '') {
                setNewPassHelpText('Enter a new Password');
                setNewPassErr(true);
            } else {
                setNewPassHelpText('');
                setNewPassErr(false);
            }

            if (confirmNewPass === '') {
                setConfirmNewPassHelpText('Enter a new Password');
                setConfirmNewPassErr(true);
            } else {
                setConfirmNewPassHelpText('');
                setConfirmNewPassErr(false);
            }
            return false;
        } else if (confirmNewPass !== newPass) {
                setNewPassHelpText('Entered Passwords do not match');
                setNewPassErr(true);
                setConfirmNewPassHelpText('Entered Passwords do not match');
                setConfirmNewPassErr(true);
                return false;
        }
        return true;
    }

    // Change Password Button Handler
    const handleChangePassword = () => {
        const veriCodeStatus = checkVeriCode(veriCode);
        //const newPassStatus = checkNewPass(newPass);
        const confirmNewPassStatus = checkPass(newPass, confirmNewPass);
        
        if (veriCodeStatus === false) {
            setVeriCodeErr(true);
        } else if (veriCodeStatus === true) {
            setVeriCodeHelpText('');
            setVeriCodeErr(false);
        }

        if (confirmNewPassStatus === false) {
            // Do Nothing
        } else if (confirmNewPassStatus == true) {
            setConfirmNewPassHelpText('');
            setConfirmNewPassErr(false);
            setNewPassHelpText('');
            setNewPassErr(false);
        } 
    }
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
                errorStatus={newPassErr}
                helperText={newPassHelpText}
            />
            <CustomTextField 
                placeholder="Confirm New Password"
                type='password'
                setValue={setConfirmNewPass}
                errorStatus={confirmNewPassErr}
                helperText={confirmNewPassHelpText}
            />
            <CustomButton
                displayText="Change Password"
                func={handleChangePassword}
            />
            <CustomButton
                displayText="Cancel"
                //func={registerButtonHandler}
            />
        </div>
    )
}

export default PasswordResetContainer
