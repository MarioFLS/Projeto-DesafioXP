import expressLib from 'express';
import 'express-async-errors';

const express = expressLib();

express.use(expressLib.json());

export default express;
