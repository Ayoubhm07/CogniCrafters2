export interface Session {
    ip: string;
    start: string;
    lastAccess: string;
    location?: string;  // Champ optionnel pour stocker la localisation
    showMap?: boolean; 
 }
