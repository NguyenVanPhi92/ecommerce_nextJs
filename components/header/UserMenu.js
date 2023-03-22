import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'

export default function UserMenu({ session }) {
    console.log('user ', session)
    return (
        <div className={styles.menu}>
            <h4>Welcome to Shoppay !</h4>
            {session ? (
                <div className={styles.flex}>
                    <div className={styles.menu__img}>
                        {/* {session && (
                            <Image src={session.user.image} alt='avatar' width={69} height={69} />
                        )} */}
                        <div className={styles.avatar}></div>
                    </div>

                    <div className={styles.col}>
                        <span>Welcome Back</span>
                        <h3>M8ASD33</h3>
                        <span onClick={() => signOut()}>Sign out</span>
                    </div>
                </div>
            ) : (
                <div className={styles.flex}>
                    <button className={styles.btn_primary}>Register</button>
                    <button className={styles.btn_outline} onClick={() => signIn()}>
                        Login
                    </button>
                </div>
            )}

            <ul>
                <li>
                    <Link href='/profile'>Account</Link>
                </li>
                <li>
                    <Link href='/profile/orders'>My Orders</Link>
                </li>
                <li>
                    <Link href='/profile/message'>Message Center</Link>
                </li>
                <li>
                    <Link href='/profile/address'>Address</Link>
                </li>
                <li>
                    <Link href='/profile/wishlist'>Wishlist</Link>
                </li>
            </ul>
        </div>
    )
}
