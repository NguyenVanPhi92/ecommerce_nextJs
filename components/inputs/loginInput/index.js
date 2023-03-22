import { ErrorMessage, useField } from 'formik'
import { AiOutlineMail } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import styles from './styles.module.scss'

export default function LoginInput({ icon, placeholder, ...props }) {
    const [field, meta] = useField(props)

    console.log('error ', meta.error)
    return (
        <div className={`${styles.input} ${meta.touched && meta.error ? styles.error : ''} `}>
            {icon === 'user' ? (
                <AiOutlineUser />
            ) : icon === 'email' ? (
                <AiOutlineMail />
            ) : icon === 'password' ? (
                <RiLockPasswordLine />
            ) : (
                <AiOutlineMail />
            )}

            <input
                type={field.type}
                name={field.name}
                placeholder={placeholder}
                {...field}
                {...props}
            />

            {meta.touched && meta.error && (
                <div className={styles.error__popup}>
                    <span></span>
                    <ErrorMessage name={field.name} />
                </div>
            )}
        </div>
    )
}
