import Footer from '@/components/footer'
import Header from '@/components/header'
import FadeLoaderSpinner from '@/components/loaders/dotLoader'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import Link from 'next/link'
import { useState } from 'react'
import { AiFillCaretLeft } from 'react-icons/ai'
import * as Yup from 'yup'
import styles from '../../styles/forgot.module.scss'

export default function Forgot() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // handler
    const formikForgot = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email address is require.').email('Please enter email')
        }),
        onSubmit: async (values) => {
            console.log('form value ', values)

            try {
                setLoading(true)
                const { data } = await axios.post('/api/auth/forgot', values)
                setSuccess(data.message)
                setLoading(false)

                if (res?.error) {
                    setLoading(false)
                    setError({
                        ...stateAddNewUser,
                        login_error: res?.error
                    })
                    return
                } else {
                    return router.push(callbackUrl || '/')
                }
            } catch (error) {
                setLoading(false)
                setError(error.response.data.message)
            }
        }
    })
    return (
        <>
            {loading && <FadeLoaderSpinner loading={loading} />}
            <Header country='Viet Name' />
            <div className={styles.forgot}>
                <div>
                    <div className={styles.forgot__header}>
                        <div className={styles.back__svg}>
                            <AiFillCaretLeft />
                        </div>
                        <span>
                            Forgot your password? <Link href='/'>Login instead</Link>
                        </span>
                    </div>

                    {/* form */}
                    <div className={styles.login__container}>
                        <div className={styles.login__form}>
                            <Formik>
                                <form onSubmit={formikForgot.handleSubmit}>
                                    <div className=''>
                                        <label htmlFor='email'>Email</label>
                                        <input
                                            id='email'
                                            name='email'
                                            type='email'
                                            value={formikForgot.values.email}
                                            onChange={formikForgot.handleChange}
                                        />
                                        {formikForgot.touched.email && formikForgot.errors.email ? (
                                            <div style={{ color: 'red' }}>
                                                {formikForgot.errors.email}
                                            </div>
                                        ) : null}
                                    </div>

                                    <button type='submit'>Submit</button>
                                </form>
                            </Formik>
                        </div>
                    </div>

                    <div style={{ color: 'green' }}>
                        {success.length !== 0 && <span>{success}</span>}
                    </div>
                    <div style={{ color: 'red' }}>{error.length !== 0 && <span>{error}</span>}</div>
                </div>
            </div>
            <Footer country='Viet Name' />
        </>
    )
}
