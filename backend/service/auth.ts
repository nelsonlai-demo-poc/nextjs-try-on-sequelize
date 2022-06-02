import User from '../entity/user';
import { hashPassword } from '../util/password';

export const register = async (username: string, password: string) => {
    const check = await User.findOne({
        where: {
            username: username,
        },
    });

    if (check !== null) {
        throw 'User already exists';
    }

    const hash = await hashPassword(password);

    await User.create({
        username: username,
        password: hash,
    });
};
