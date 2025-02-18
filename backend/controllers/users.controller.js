import userModel from '../models/user.model.js';
import appError from '../utils/appError.js';
import * as httpStatusText from '../utils/httpStatusText.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import bcrypt from 'bcryptjs';
import generateJWT from '../utils/generateJWT.js';
import userRules from '../utils/user.Rules.js';
const getAllusers = asyncWrapper(async (req, res) => {
  const { limit = 5, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const users = await userModel
    .find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);

  res.json({ status: httpStatusText.SUCCESS, data: { users } });
});

const register = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const oldUser = await userModel.findOne({ email: email });

  if (oldUser) {
    const error = appError.create(
      'user already exists',
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  // password hashing
  const hashedpassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    ...req.body,
    password: hashedpassword,
    role: userRules.USER,
  });

  // generate jwt token

  const token = await generateJWT({
    email: newUser.email,
    id: newUser._id,
    role: userRules.USER,
  });

  newUser.token = token;

  await newUser.save();

  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { user: newUser } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = appError.create(
      'email and password are required',
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const user = await userModel.findOne({ email: email });

  if (!user) {
    const error = appError.create('user not found!', 400, httpStatusText.FAIL);
    return next(error);
  }

  const matchedPassword = await bcrypt.compare(password, user.password);

  if (user && matchedPassword) {
    return res.json({
      status: httpStatusText.SUCCESS,
      data: {
        token: await generateJWT({ email, id: user._id, role: user.role }),
      },
    });
  }

  const error = appError.create('something wrong', 400, httpStatusText.ERROR);
  return next(error);
});

const updateUserInfo = asyncWrapper(async (req, res) => {
  const currentUser = req.currentUser;
  const id = currentUser.id;
  const newData = req.body;

  const hashedpassword = await bcrypt.hash(newData.password, 10);

  const token = await generateJWT({
    email: newData.email,
    id: currentUser._id,
    role: currentUser.role,
  });

  const updateduser = await userModel.updateOne(
    { _id: currentUser.id },
    {
      $set: {
        ...newData,
        _id: id,
        password: hashedpassword,
        token: token,
        role: currentUser.role,
      },
    }
  );
  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { course: updateduser },
  });
});

const upgradeUser = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  const hashedpassword = await bcrypt.hash(newData.password, 10);

  const token = await generateJWT({
    email: newData.email,
    id: id,
    role: newData.role,
  });

  const updateduser = await userModel.updateOne(
    { _id: id },
    {
      $set: {
        ...newData,
        _id: id,
        password: hashedpassword,
        token: token,
        role: newData.role,
      },
    }
  );
  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { course: updateduser },
  });
});

const deleteUser = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  await userModel.deleteOne({ _id: id });

  return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

export {
  getAllusers,
  register,
  login,
  updateUserInfo,
  deleteUser,
  upgradeUser,
};
