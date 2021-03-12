import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './RegisterContainer.module.css';
import CustomTextField from '../CustomTextField/CustomTextField';
import CustomButton from '../CustomButton/CustomButton';
import LogRegHeading from '../LogRegHeading/LogRegHeading';
function RegisterContainer() {
    const history = useHistory();

    const loginButtonHandler = () => {
        history.push('loginScreen');
    }
    return (
        <div className={styles.container}>
            <LogRegHeading 
                heading="Register"
            />
            <CustomTextField 
                placeholder="Name"
            />
            <CustomTextField 
                placeholder="Email"
            />
            <CustomTextField 
                placeholder="Password"
            />
            <CustomTextField 
                placeholder="Confirm Password"
            />
            <CustomButton
                displayText="Register"
            />
            <CustomButton
                displayText="Already a user? Login Now!"
                func={loginButtonHandler}
            />
        </div>
    )
}

export default RegisterContainer
