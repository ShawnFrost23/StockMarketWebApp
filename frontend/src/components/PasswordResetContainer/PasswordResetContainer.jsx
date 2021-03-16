import React from 'react'
import { useHistory } from 'react-router-dom';

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

    const history = useHistory();

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
        if (newPass.length < 8) {
            setNewPassHelpText('Password should have atleast 8 characters');
            setNewPassErr(true);
            return false;
        } else if (newPass === '' || confirmNewPass === '') {
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
    async function handleChangePassword () {
        const veriCodeStatus = checkVeriCode(veriCode);
        const passStatus = checkPass(newPass, confirmNewPass);
        
        if (veriCodeStatus === false) {
            setVeriCodeErr(true);
        } else if (veriCodeStatus === true) {
            setVeriCodeHelpText('');
            setVeriCodeErr(false);
        }

        if (passStatus === false) {
            // Do Nothing
        } else if (passStatus === true) {
            setConfirmNewPassHelpText('');
            setConfirmNewPassErr(false);
            setNewPassHelpText('');
            setNewPassErr(false);
        } 

        if (veriCodeStatus && passStatus) {
            const requestOptions = {
                method: 'POST',
            }

            const response = await fetch('/auth/reset_password' + '?' + new URLSearchParams({reset_code: veriCode, new_password: newPass, }), requestOptions);
            if (response.status === 200) {
                history.push('loginScreen');
            } else {
                setVeriCodeHelpText('Wrong Code, Try Again!');
                setVeriCodeErr(true);
            }
        }
    }

    async function cancelButtonHandler() {
        history.push('loginScreen');
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
                func={cancelButtonHandler}
            />
        </div>
    )
}

export default PasswordResetContainer
