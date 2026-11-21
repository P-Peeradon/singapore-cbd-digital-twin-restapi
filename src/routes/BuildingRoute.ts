import router from 'express';
import { fetchAllBuildings } from '../models/BuildingModel';

const route = router();

route.get("/buildings", fetchAllBuildings);

export default route;