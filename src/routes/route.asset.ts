import express from 'express';
import Assets from '../controllers/Assets/controllers.get.all.assets';

const assetsRoute = express.Router();

assetsRoute.get('', Assets.getAssets);

export default assetsRoute;
