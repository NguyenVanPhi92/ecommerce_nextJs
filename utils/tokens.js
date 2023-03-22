import jwt from 'jsonwebtoken'

export const createActionToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SERECT, {
        expiresIn: '2d'
    })
}

export const createResetToken = (payload) => {
    return jwt.sign(payload, process.env.RESET_TOKEN_SERECT, {
        expiresIn: '6h'
    })
}
