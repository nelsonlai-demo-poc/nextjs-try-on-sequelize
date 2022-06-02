import type { NextApiRequest, NextApiResponse } from 'next';
import { register } from '../../../backend/service/auth';

interface RegisterRequest {
    username: string;
    password: string;
}

const handler = async (req: NextApiRequest, resp: NextApiResponse) => {
    if (req.method !== 'POST') {
        resp.status(405).end();
        return;
    }

    const { username, password } = req.body as RegisterRequest;
    if (!username || username === '' || !password || password === '') {
        resp.status(200).end({
            code: -1,
            message: 'username or password is empty',
        });
        return;
    }

    try {
        await register(username, password);
    } catch (e) {
        resp.status(200).json({ code: -1, message: e });
        return;
    }

    resp.status(200).json({ code: 0, message: 'success' });
};

export default handler;
