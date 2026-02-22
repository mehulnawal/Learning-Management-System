import jwt from 'jsonwebtoken';

export const userAuthentication = async (req, res, next) => {
    try {

        const { refreshToken } = req.cookies;

        if (!refreshToken)
            return res.status(400).json({ message: "Refresh Token not found" })

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET_KEY
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(403).json({
            message: "Invalid or expired refresh token",
        });

    }
}