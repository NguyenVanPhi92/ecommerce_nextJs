import { activeEmailTemplate } from '@/emails/activateEmailTemplate'
import User from '@/models/User'
import db from '@/utils/db'
import { sendEmail } from '@/utils/sendEmails'
import { createActionToken } from '@/utils/tokens'
import { validateEmail } from '@/utils/validation'
import bcript from 'bcrypt'
import nc from 'next-connect'

const handler = nc()

handler.post(async (req, res) => {
    try {
        await db.connectDb()
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Cần nhập đủ thông tin' })
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Email không hợp lệ' })
        }

        const user = await User.findOne({ email: email })

        if (user) {
            return res.status(400).json({ message: 'email đã tồn tại.' })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'password có ít nhất 6 kí tự' })
        }

        const scryptedPassword = await bcript.hash(password, 16)
        const newUser = new User({ name, email, password: scryptedPassword })
        const addedUser = await newUser.save()
        const activation_token = createActionToken({
            id: addedUser._id.toString() // lấy ra _id ở trong database
        })
        const url = `${process.env.BASE_URL}/activate/${activation_token}`
        sendEmail(email, url, '', 'Active your account.', activeEmailTemplate) // send email veryfi Email
        await db.disconnectDb() // sau khi thực hiện gửi email thì ngưng kết nối với database

        res.status(200).json({
            message: 'Đăng kí thành công. Kiểm tra email của bạn để kích hoạt tài khoản.',
            data: addedUser,
            token: activation_token
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default handler
