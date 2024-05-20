import axios from 'axios';

export class RoboflowApiClient {
    private baseUrl: string;

    constructor(apiUrl: string) {
        this.baseUrl = apiUrl;
    }

    public async predictImage(imageData: string): Promise<any> {
        try {
            const response = await axios.post(this.baseUrl, { image: imageData }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error predicting image:", error);
            throw error;
        }
    }
}
