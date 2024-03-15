import { Router } from 'express';
 import bcrypt from 'bcrypt';
 import jwt from 'jsonwebtoken';
import userModel from '../model/user.js';
const router = Router();
const JWTSecret = "HarishMaurya@123"

router.get('/', (req, res) => {
	res.json({ message: 'Health is OK !!' });
});

router.post('/create', async (req, res) => {
	try {
		const { name, phone, email, password } = req.body;

		if (!name || !phone || !email || !password) {
			return res
				.status(400)
				.json({ message: 'Please provide all required fields.' });
		}

		const existingUser = await userModel.findOne({ email,password });
		if (existingUser) {
			return res.status(409).json({ message: 'Email & password already exists.' });
		}

		const hasPassword = await bcrypt.hash(password,10)

		const createUser = {
			phone,
			email,
			name,
			password:hasPassword,
		};

		const newUser = await userModel.create(createUser);

		return res.json({
			newUser,

			message: 'User created successfully.',
		});
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({
			message: 'Internal server error.',
		});
	}
});

router.get('/getuser', async (req, res) => {
	try {
		const getuser = await userModel.find().select('name mobile phone email');
		return res.json({
			data: getuser,
		});
	} catch (error) {
		console.log('some issue can you check your code.');
	}
});

router.get('/usergetbyid/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const data = await userModel.findById({_id:id });
		if (!data) {
			return res.status(404).json({
				message: 'user not found',
			});
		}

		res.json({
			data,
			message: 'user Find Successfully ...',
		});
	} catch (error) {
		res.json({
			message: 'some error your code',
			code: 404,
		});
	}
});

router.put('/updateuser/:id', async (req, res) => {
	try {
		const { name, phone, email, password } = req.body;

		const { id } = req.params;

		const updateUser1 = await userModel.findByIdAndUpdate(
			id,
			{ name, phone, email, password },
			{ new: true },
		);

		if (!updateUser1) {
			return res.status(404).json({
				message: 'user not found',
			});
		}
		res.json({
			updateUser1,
			message: 'user updated successfully',
		});
	} catch (error) {
		res.json({
			message: 'user not update check your code...',
		});
	}
});

router.delete('/userdelete/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const deleteUser = await userModel.findByIdAndDelete({ _id: id });
		res.status(401).json({
			deleteUser,
			message: 'user deleted successfully..',
		});
	} catch (error) {
		res.json({
			message: 'user not deleted some error..',
		});
	}
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(403).json({ message: 'Please provide email.' });
        }

        if (!password) {
            return res.status(402).json({ message: 'Please provide password.' });
        }

        const user = await userModel.findOne({ email }).lean();

        if (!user) {
            return res.status(401).json({ message: 'Invalid email and password' });
        }
        
        const passwordMatch = bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({
                id: user._id,
                email: user.email
            }, 
            JWTSecret);

            console.log(token);

            // return res.json({ status: "OK", data: token });
			return res.json({
				            name: user.name,
				            email: user.email,
				            phone: user.phone,
							token,
				            message: 'Login successful.',
				       });
        } else {
            return res.status(401).json({ message: 'Invalid email and password' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Internal server error.',
        });
    }
});




export default router;
