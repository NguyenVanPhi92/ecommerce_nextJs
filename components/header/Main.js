import Link from 'next/link'
import React from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { FaOpencart } from 'react-icons/fa'
import styles from './styles.module.scss'
import { useSelector } from 'react-redux'

export default function Main() {
    const { cart } = useSelector((state) => ({ ...state }))
    return (
        <div className={styles.main}>
            <div className={styles.main__container}>
                <Link href='/'>
                    <div className={styles.avatar}>{/* <img/> */}</div>
                </Link>

                <div className={styles.search}>
                    <input type='text' placeholder='Search product...' />
                    <div className={styles.search__icon}>
                        <RiSearch2Line />
                    </div>
                </div>

                <Link href='/cart'>
                    <div className={styles.cart}>
                        <FaOpencart />
                        <span>{cart.length > 0 ? cart.length : 0}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
