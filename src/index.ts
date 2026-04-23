import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from './config/config.js';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(passport.initialize());

passport.use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID as string,
  clientSecret: config.GOOGLE_CLIENT_SECRET as string,
  callbackURL: "/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  // Here you would typically find or create a user in your database
  // For this example, we'll just return the profile
  // accessToken and refreshToken can be used to access Google APIs on behalf of the user
  return done(null, profile);
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);



export default app;