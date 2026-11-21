import { type Request, type Response } from 'express'; 
import { fetchAllBuildings } from '../models/BuildingModel.ts'; 

export const getBuildingsGeoJSON = async (req: Request, res: Response): Promise<void> => {
    try { 
        const records = await fetchAllBuildings(); 
        const features = records.map((rec) => { 
        
            // Parse WKT: "POLYGON((103.8541 1.2801, 103.8547 1.2801, ...))" 
            const coordStr = rec.footprint_wkt
                        .replace(/POLYGON\(\(/i, '')
                        .replace(/\)\)/g, '')
                        .trim(); 
            const ringCoordinates = coordStr.split(',').map((pair) => { 
                const [lon, lat] = pair.trim().split(/\s+/).map(Number); 
                return [lon, lat]; 
            });

            return { 
                type: 'Feature', 
                properties: { 
                    buildingId: rec.building_id, 
                    nameEn: rec.name_en, 
                    nameZh: rec.name_zh, 
                    storeys: rec.storeys, 
                    heightMeters: rec.height_meters, 
                    bcaGreenMark: rec.bca_green_mark, 
                }, 
                geometry: { 
                    type: 'Polygon', 
                    coordinates: [ringCoordinates], 
                }, 
            };
        });

        res.status(200)
            .json({ 
                type: 'FeatureCollection', 
                features, 
            });
    } catch (error) { 
        console.error('[BuildingController] Error querying buildings:', error); 
        res.status(500).json({ 
            error: 'Internal Server Error querying spatial footprints' 
        }); 
    }
}