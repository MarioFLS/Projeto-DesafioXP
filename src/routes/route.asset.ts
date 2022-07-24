import express from 'express';
import Assets from '../controllers/Assets/controllers.get.assets';

const assetsRoute = express.Router();

assetsRoute.get('', Assets.getAssets);

assetsRoute.get('/:id', Assets.getAssets);

export default assetsRoute;
