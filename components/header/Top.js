import React, { useState } from 'react'
import styles from './styles.module.scss'
import { MdSecurity } from 'react-icons/md'
import { BsHeart } from 'react-icons/bs'
import { RiAccountPinCircleLine, RiArrowDownFill } from 'react-icons/ri'
import Link from 'next/link'
import UserMenu from './UserMenu'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function Top({ country }) {
    const [visibale, setVisible] = useState(false)
    const { data: session } = useSession()

    return (
        <div className={styles.top}>
            <div className={styles.top__container}>
                <div></div>
                <ul className={styles.top__list}>
                    <li className={styles.li}>
                        {/* <Image src={country.flag} alt='hello' width={56} height={56} /> */}
                        <span>{country} / usd</span>
                    </li>

                    <li className={styles.li}>
                        <MdSecurity />
                        <span>Buyer Protection</span>
                    </li>

                    <li className={styles.li}>
                        <span>Customer Service</span>
                    </li>

                    <li className={styles.li}>
                        <span>Help</span>
                    </li>

                    <li className={styles.li}>
                        <BsHeart />
                        <Link href='/profile/whishlist'>
                            <span>Whishlist</span>
                        </Link>
                    </li>

                    <li
                        className={styles.li}
                        onMouseOver={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                    >
                        {session ? (
                            <div className={styles.li}>
                                <div className={styles.flex}>
                                    <RiAccountPinCircleLine />
                                    <span>{session.user.name}</span>
                                    <RiArrowDownFill />
                                </div>
                            </div>
                        ) : (
                            <div className={styles.li}>
                                <div className={styles.flex}>
                                    <RiAccountPinCircleLine />
                                    <span>Account</span>
                                    <RiArrowDownFill />
                                </div>
                            </div>
                        )}

                        {visibale && <UserMenu session={session} />}
                    </li>
                </ul>
            </div>
        </div>
    )
}
