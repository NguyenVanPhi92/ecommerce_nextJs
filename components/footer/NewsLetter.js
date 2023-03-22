import React from 'react'
import styles from './styles.module.scss'

export default function NewsLetter() {
    return (
        <div className={styles.footer__newsletter}>
            <h3>SIGN UP FOR OUR NEWLETTER</h3>
            <div className={styles.flex}>
                <input type='text' placeholder='your email address' />
                <button className={styles.btn_primary}>SUBSCRIBE</button>
            </div>
            <p>By click jahjkas aksmdlsd </p>
        </div>
    )
}
