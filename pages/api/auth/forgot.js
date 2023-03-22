import { resetEmailTemplate } from '@/emails/resetEmailTemplate'
import User from '@/models/User'
import db from '@/utils/db'
import { sendEmail } from '@/utils/sendEmails'
import { createResetToken } from '@/utils/tokens'
import nc from 'next-connect'

const handler = nc()

handler.post(async (req, res) => {
    try {
        await db.connectDb()
        const { email } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.json({ message: 'Email không tồn tại.' })
        }

        const user_id = createResetToken({
            id: user._id.toString()
        })

        const url = `${process.env.BASE_URL}/auth/reset/${user_id}`
        sendEmail(email, url, '', 'Reset your password.', resetEmailTemplate) // send email veryfi Email
        await db.disconnectDb() // sau khi thực hiện gửi email thì ngưng kết nối với database

        res.status(200).json({
            message: 'Vui lòng kiểm tra Email của bạn.',
            data: addedUser,
            token: user_id
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default handler
