import router from 'express';
import { getBuildingsGeoJSON } from '../controllers/BuildingController.ts';

const buildingRoute = router();

buildingRoute.get("/buildings", getBuildingsGeoJSON);

export default buildingRoute;