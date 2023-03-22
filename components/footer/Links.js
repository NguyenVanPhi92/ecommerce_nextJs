import Link from 'next/link'
import React from 'react'
import styles from './styles.module.scss'

const links = [
    {
        heading: 'SHOPPAY1',
        links: [
            {
                name: 'About us',
                link: ''
            },
            {
                name: 'Contact us',
                link: ''
            },
            {
                name: 'About us',
                link: ''
            },
            {
                name: 'About us',
                link: ''
            },
            {
                name: 'About us',
                link: ''
            },
            {
                name: 'About us',
                link: ''
            },
            {
                name: 'About us',
                link: ''
            }
        ]
    },
    {
        heading: 'SHOPPAY2',
        links: [
            {
                name: 'About us',
                link: ''
            },
            {
                name: 'Contact us',
                link: ''
            },
            {
                name: 'About us',
                link: ''
            },
            {
                name: 'About us',
                link: ''
            },
            {
                name: 'About us',
                link: ''
            },
            {
                name: 'About us',
                link: ''
            },
            {
                name: 'About us',
                link: ''
            }
        ]
    },
    {
        heading: 'SHOPPAY3',
        links: [
            {
                name: 'About us',
                link: ''
            },
            {
                name: 'Contact us',
                link: ''
            },
            {
                name: 'About us',
                link: ''
            },
            {
                name: 'About us',
                link: ''
            },
            {
                name: 'About us',
                link: ''
            },
            {
                name: 'About us',
                link: ''
            },
            {
                name: 'About us',
                link: ''
            }
        ]
    }
]

export default function Links() {
    return (
        <div className={styles.footer__links}>
            {links.map((link, i) => (
                <React.Fragment key={i}>
                    <ul>
                        {i === 0 ? (
                            <div style={{ background: 'red', width: '50px', height: '50px' }}></div>
                        ) : (
                            <b>{link.heading}</b>
                        )}
                        {link.links.map((item, i) => (
                            <React.Fragment key={i}>
                                <li>
                                    <Link href={item.link}>{item.name}</Link>
                                </li>
                            </React.Fragment>
                        ))}
                    </ul>
                </React.Fragment>
            ))}
        </div>
    )
}
