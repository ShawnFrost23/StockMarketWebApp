import React from 'react'
import styles from './LogRegHeading.module.css';
function LogRegHeading({ heading }) {
    return (
        <h1 className={styles.header}>
            {heading}
        </h1>
    )
}

export default LogRegHeading
