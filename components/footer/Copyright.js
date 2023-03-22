import Link from 'next/link'
import React from 'react'
import { MdLocalFlorist } from 'react-icons/md'
import styles from './styles.module.scss'
const data = [
    {
        name: 'Privacy Center1',
        link: ''
    },
    {
        name: 'Privacy Center2',
        link: ''
    },
    {
        name: 'Privacy Center3',
        link: ''
    },
    {
        name: 'Privacy Center4',
        link: ''
    },
    {
        name: 'Privacy Center5',
        link: ''
    },
    {
        name: 'Privacy Center6',
        link: ''
    }
]

export default function Copyright({ country }) {
    return (
        <div className={styles.footer__copyright}>
            <section>@2022 shoppy all rights reserved.</section>
            <ul>
                {data.map((link, id) => (
                    <React.Fragment key={id}>
                        <li>
                            <Link href={link.link}>{link.name}</Link>
                        </li>
                    </React.Fragment>
                ))}
                <li>
                    <MdLocalFlorist /> {country}
                </li>
            </ul>
        </div>
    )
}
