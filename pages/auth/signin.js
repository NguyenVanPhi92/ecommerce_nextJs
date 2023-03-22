import Footer from '@/components/footer'
import Header from '@/components/header'
import FadeLoaderSpinner from '@/components/loaders/dotLoader'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import { getCsrfToken, getProviders, getSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiFillCaretLeft } from 'react-icons/ai'
import * as Yup from 'yup'
import styles from '../../styles/signin.module.scss'

export default function Signin({ providers, csrfToken, callbackUrl }) {
    const [loading, setLoading] = useState(false)
    const [stateAddNewUser, setStateAddNewUser] = useState({
        error: '',
        success: '',
        login_error: ''
    })
    const router = useRouter()

    // schema validate form
    const loginValidation = Yup.object({
        login_email: Yup.string().required('Email address is require.').email('Please enter email'),
        login_password: Yup.string().required('Please enter a password')
    })
    const registerValidation = Yup.object({
        name: Yup.string()
            .required('What is your name ?')
            .min(2, 'First name must be between 2 and 16 characters.')
            .max(16, 'First name must be between 2 and 16 characters.')
            .matches(/^[aA-zZ]/, 'Numbers and special characters are not allowed.'),
        email: Yup.string().required('Email a valid email address.'),
        password: Yup.string()
            .required(
                'Enter a combination of at least six numbers, letters and punctuation marks(such as ! and &).'
            )
            .min(6, 'Password must be atleast 6 characters')
            .max(36, 'Password can not be more than 36 characters'),
        conf_password: Yup.string()
            .required('Confirm your password.')
            .oneOf([Yup.ref('password')], 'Password must match.')
    })

    // hanlde login and register
    const formikRegister = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            conf_password: ''
        },
        validationSchema: registerValidation,
        onSubmit: async (values) => {
            console.log('form value ', values)
            const newUser = {
                name: values.name,
                email: values.email,
                password: values.password
            }
            try {
                setLoading(true)
                const { data } = await axios.post('/api/auth/signup', newUser)
                setStateAddNewUser({ ...stateAddNewUser, error: '', success: data.message })
                setLoading(false)

                // sau khi add user thành công thì chuyển trang
                setTimeout(() => {
                    router.push('/')
                }, 2000)
            } catch (error) {
                setLoading(false)
                setStateAddNewUser({
                    ...stateAddNewUser,
                    success: '',
                    error: error.response.data.message
                })
            }
        }
    })

    const formikLogin = useFormik({
        initialValues: {
            login_email: '',
            login_password: ''
        },
        validationSchema: loginValidation,
        onSubmit: async (values) => {
            console.log('form value ', values)

            try {
                let options = {
                    redirect: false,
                    email: values.login_email,
                    password: values.login_password
                }
                setLoading(true)
                // signIn => Auth của NextJs
                // Server side rendering
                const res = await signIn('credentials', options)
                setLoading(false)

                if (res?.error) {
                    setLoading(false)
                    setStateAddNewUser({
                        ...stateAddNewUser,
                        login_error: res?.error
                    })
                    return
                } else {
                    return router.push(callbackUrl || '/')
                }
            } catch (error) {
                setLoading(false)
                setStateAddNewUser({
                    ...stateAddNewUser,
                    success: '',
                    error: error.response.data.message
                })
            }
        }
    })

    return (
        <>
            {loading && <FadeLoaderSpinner loading={loading} />}
            <Header country='Viet Nam' />

            <div className={styles.login}>
                {/* SignIn */}
                <div className={styles.login__container}>
                    <div className={styles.login__header}>
                        <div className={styles.back__svg}>
                            <AiFillCaretLeft />
                        </div>
                        <span>
                            Wed be happy to join us ! <Link href='/'>Go Store</Link>
                        </span>
                    </div>

                    <div className={styles.login__form}>
                        <h1>Sign in</h1>
                        <p>Get access to one of the best Eshopping service in the world</p>

                        <Formik>
                            <form
                                onSubmit={formikLogin.handleSubmit}
                                method='post'
                                action='/api/auth/signin/email'
                            >
                                <input type='hidden' name='csrfToken' defaultValue={csrfToken} />

                                <div className=''>
                                    <label htmlFor='login_email'>Email</label>
                                    <input
                                        id='login_email'
                                        type='text'
                                        value={formikLogin.values.login_email}
                                        onChange={formikLogin.handleChange}
                                    />
                                    {formikLogin.touched.login_email &&
                                    formikLogin.errors.login_email ? (
                                        <div style={{ color: 'red' }}>
                                            {formikLogin.errors.login_email}
                                        </div>
                                    ) : null}
                                </div>

                                <div>
                                    <label htmlFor='login_password'>Password</label>
                                    <input
                                        id='login_password'
                                        type='text'
                                        value={formikLogin.values.login_password}
                                        onChange={formikLogin.handleChange}
                                    />
                                    {formikLogin.touched.login_password &&
                                    formikLogin.errors.login_password ? (
                                        <div style={{ color: 'red' }}>
                                            {formikLogin.errors.login_password}
                                        </div>
                                    ) : null}
                                </div>
                                <div style={{ color: 'red' }}>
                                    {stateAddNewUser.login_error.length !== 0 && (
                                        <span>{stateAddNewUser.login_error}</span>
                                    )}
                                </div>

                                <button type='submit'>Submit</button>

                                <div className={styles.forgot}>
                                    <Link href='/auth/forgot'>Forgot password</Link>
                                </div>
                            </form>
                        </Formik>

                        {/* login with social */}
                        <div className={styles.login__socials}>
                            <span className={styles.or}>Or continue with</span>
                            <div className={styles.login__socials_wrap}>
                                {providers.map((el, i) => {
                                    if (el.name == 'Credentials') {
                                        return
                                    }
                                    return (
                                        <div key={i}>
                                            <button
                                                className={styles.social__btn}
                                                onClick={() => signIn(el.id)}
                                            >
                                                Sign in with {el.name}
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SignUp */}
                <div className={styles.login__container}>
                    <div className={styles.login__form}>
                        <h1>Sign up</h1>
                        <p>Get access to one of the best Eshopping service in the world</p>

                        <Formik>
                            <form onSubmit={formikRegister.handleSubmit}>
                                <div className=''>
                                    <label htmlFor='name'>Full Name</label>
                                    <input
                                        id='name'
                                        type='text'
                                        value={formikRegister.values.name}
                                        onChange={formikRegister.handleChange}
                                    />
                                    {formikRegister.touched.name && formikRegister.errors.name ? (
                                        <div style={{ color: 'red' }}>
                                            {formikRegister.errors.name}
                                        </div>
                                    ) : null}
                                </div>

                                <div>
                                    <label htmlFor='email'>First email</label>
                                    <input
                                        id='email'
                                        type='text'
                                        value={formikRegister.values.email}
                                        onChange={formikRegister.handleChange}
                                    />
                                    {formikRegister.touched.email && formikRegister.errors.email ? (
                                        <div style={{ color: 'red' }}>
                                            {formikRegister.errors.email}
                                        </div>
                                    ) : null}
                                </div>

                                <div>
                                    <label htmlFor='password'>Password</label>
                                    <input
                                        id='password'
                                        type='text'
                                        value={formikRegister.values.password}
                                        onChange={formikRegister.handleChange}
                                    />
                                    {formikRegister.touched.name && formikRegister.errors.name ? (
                                        <div style={{ color: 'red' }}>
                                            {formikRegister.errors.name}
                                        </div>
                                    ) : null}
                                </div>

                                <div>
                                    <label htmlFor='conf_password'>First conf_password</label>
                                    <input
                                        id='conf_password'
                                        type='text'
                                        value={formikRegister.values.conf_password}
                                        onChange={formikRegister.handleChange}
                                    />
                                    {formikRegister.touched.conf_password &&
                                    formikRegister.errors.conf_password ? (
                                        <div style={{ color: 'red' }}>
                                            {formikRegister.errors.conf_password}
                                        </div>
                                    ) : null}
                                </div>
                                <button type='submit'>Submit</button>
                            </form>
                        </Formik>

                        <div style={{ color: 'green' }}>
                            {stateAddNewUser.success.length !== 0 && (
                                <span>{stateAddNewUser.success}</span>
                            )}
                        </div>
                        <div style={{ color: 'red' }}>
                            {stateAddNewUser.error.length !== 0 && (
                                <span>{stateAddNewUser.error}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer country='Viet Nam' />
        </>
    )
}

export async function getServerSideProps(context) {
    const { req, query } = context

    const session = await getSession({ req })
    const { callbackUrl } = query

    if (session) {
        return {
            redirect: {
                destination: callbackUrl
            }
        }
    }

    const csrfToken = await getCsrfToken(context)
    const providers = Object.values(await getProviders())

    return {
        props: { providers, csrfToken, callbackUrl }
    }
}
