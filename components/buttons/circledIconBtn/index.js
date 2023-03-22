import React from 'react'
import { BsBoxArrowInRight } from 'react-icons/bs'
import styles from './styles.module.scss'

export default function CircledIconBtn({ type, text }) {
    return (
        <button type={type} className={styles.button}>
            {text}
            <div className={styles.svg__wrap}>
                <BsBoxArrowInRight />
            </div>
        </button>
    )
}
