import mysql from 'mysql2/promise'; 

export interface BuildingRecord {
    building_id: string; 
    name_en: string; 
    name_zh: string; 
    storeys: number; 
    height_meters: number | null; 
    bca_green_mark: string; 
    footprint_wkt: string; 
    centroid_wkt: string; } 
    
const pool = mysql.createPool({ 
    host: process.env.DB_HOST || 'localhost', 
    user: process.env.DB_USER || 'root', 
    password: process.env.DB_PASSWORD || '', 
    database: process.env.DB_NAME || 'sg\_cbd\_spatial\_twin', 
    waitForConnections: true, 
    connectionLimit: 10, 
}); 

export const fetchAllBuildings = async (): Promise<BuildingRecord[]> => {
    const query = `
        SELECT 
            building_id, name_en, name_zh, storeys, 
            height_meters, bca_green_mark, 
            ST_AsText(footprint_geom) AS footprint_wkt, 
            ST_AsText(centroid_geom) AS centroid_wkt 
        FROM buildings;
    `; 
    
    const [rows] = await pool.query(query); 
    return rows as BuildingRecord[];
}