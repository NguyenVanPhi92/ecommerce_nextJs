import React from 'react'
import { FaFacebookF } from 'react-icons/fa'
import styles from './styles.module.scss'

export default function Socials() {
    return (
        <div className={styles.footer__socials}>
            <section>
                <h3>STAY CONNECTED</h3>
                <ul>
                    <li>
                        <FaFacebookF />
                    </li>
                    <li>
                        <FaFacebookF />
                    </li>
                    <li>
                        <FaFacebookF />
                    </li>
                    <li>
                        <FaFacebookF />
                    </li>
                    <li>
                        <FaFacebookF />
                    </li>
                    <li>
                        <FaFacebookF />
                    </li>
                    <li>
                        <FaFacebookF />
                    </li>
                </ul>
            </section>
        </div>
    )
}
