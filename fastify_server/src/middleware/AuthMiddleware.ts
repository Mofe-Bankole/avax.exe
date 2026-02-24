export async function validateRequest(req: any, res: any): Promise<boolean> {
    try {
        // Check for Authorization header
        const authHeader = req.headers?.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            await res.status(401).send({
                success: false,
                message: 'No token provided',
            });
            return false;
        }

        const token = authHeader.split(' ')[1];


        try {
            await req.jwtVerify();
            return true;
        } catch (err) {
            await res.status(401).send({
                success: false,
                message: 'Invalid or expired token',
                error: err
            });
            return false;
        }
    } catch (error) {
        await res.status(500).send({
            success: false,
            message: 'Internal server error during token validation',
            error
        });
        return false;
    }
}