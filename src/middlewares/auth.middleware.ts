import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { UserModel } from '../models/user.model.js';


export const isLoggedIn = async (req: any, res: any, next: any) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET as string);
        const user = await UserModel.findById((decoded as any).id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export const authenticate = async (req: any, res: any, next: any) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET as string);
        const user = await UserModel.findById((decoded as any).id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if(user.role !== 'seller'){
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}