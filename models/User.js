import mongoose from 'mongoose'
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: 'full name là bắt buộc'
        },
        email: {
            type: String,
            required: 'email là bắt buộc và là duy nhất',
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: 'mật khẩu là bắt buộc'
        },
        role: {
            type: String,
            default: 'user'
        },
        image: {
            type: String,
            default:
                'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg'
        },
        emailVeryfied: {
            type: Boolean,
            default: false
        },
        defaultPaymentMethod: {
            type: String,
            default: ''
        },
        address: [
            {
                firstName: {
                    type: String
                },
                lastName: {
                    type: String
                },
                phoneNumber: {
                    type: String
                },
                address1: {
                    type: String
                },
                address2: {
                    type: String
                },
                city: {
                    type: String
                },
                zipCode: {
                    type: String
                },
                state: {
                    type: String
                },
                country: {
                    type: String
                },
                active: {
                    type: Boolean,
                    default: false
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
