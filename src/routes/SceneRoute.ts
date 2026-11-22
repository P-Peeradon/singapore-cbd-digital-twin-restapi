import router from 'express';
import { getSceneConfig } from '../controllers/SceneController.ts';

const sceneRoute = router();

sceneRoute.get("/scene-configs", getSceneConfig);

export default sceneRoute;