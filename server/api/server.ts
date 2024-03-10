import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import mongoose, { Schema, Document } from 'mongoose';

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

mongoose.connect('mongodb+srv://omega1234az:0956798405st@crud1.bxraekm.mongodb.net/crud1', { useNewUrlParser: true, useUnifiedTopology: true });

interface User extends Document {
  user_Username: string;
  user_Password: string;
  user_Name: string;
  user_Lastname: string;
  user_Status: string;
}

const UserSchema: Schema = new Schema({
  user_Username: String,
  user_Password: String,
  user_Name: String,
  user_Lastname: String,
  user_Status: String
});

const UserModel = mongoose.model<User>('User', UserSchema);

app.post('/user/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ user_Username: username });
    if (!user) {
      return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    const isMatch = await bcrypt.compare(password, user.user_Password);
    if (!isMatch) {
      return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    const token = jwt.sign({ username }, 'omega', { expiresIn: '1h' });
    res.json({ success: true, token });
    console.log(username, 'เข้าสู่ระบบสำเร็จ');
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ: ', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' });
  }
});

app.post('/user/register', async (req: Request, res: Response) => {
  const { username, password, name, lastname } = req.body;

  try {
    const existingUser = await UserModel.findOne({ user_Username: username });
    if (existingUser) {
      return res.status(400).json({ error: 'มีชื่อผู้ใช้นี้ในระบบอยู่แล้ว' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ user_Username: username, user_Password: hashedPassword, user_Name: name, user_Lastname: lastname, user_Status: 'N' });
    await newUser.save();

    const token = jwt.sign({ username }, 'omega', { expiresIn: '1h' });
    res.json({ success: true, token });
    console.log(username, 'ลงทะเบียนสำเร็จ');
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการลงทะเบียนผู้ใช้: ', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลงทะเบียนผู้ใช้' });
  }
});

app.put('/user/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { user_Name, user_Lastname, user_Username, user_Status } = req.body;

  try {
    await UserModel.updateOne({ _id: userId }, { user_Name, user_Lastname, user_Username, user_Status });
    res.status(200).json({ message: 'แก้ไขข้อมูลผู้ใช้เรียบร้อยแล้ว' });
    console.log(user_Name, 'แก้ไขข้อมูลสำเร็จ');
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการแก้ไขข้อมูล: ', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล' });
  }
});

app.get('/user/data', async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({}, { user_Password: 0 });
    res.status(200).json(users);
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเรียกข้อมูล: ', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเรียกข้อมูล' });
  }
});

app.delete('/user/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    await UserModel.deleteOne({ _id: userId });
    res.status(200).json({ message: 'ลบผู้ใช้เรียบร้อยแล้ว' });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการลบผู้ใช้: ', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบผู้ใช้' });
  }
});

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;
app.listen(PORT, () => {
  console.log(`เซิร์ฟเวอร์เริ่มทำงานที่พอร์ต ${PORT}`);
});
