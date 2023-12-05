import { occasions as occasionsSampleData } from '@/lib/constants/sampleData';
import simulateDelay from '@/utils/promises/stimulateDelay';
import { ApiPath } from '../constants/common';
import { OccasionEntity } from '../models/entities/OccasionEntity/OccasionEntity';

/**
 * Represents a service for managing occasions.
 */
class OccasionService {
    /**
     * Retrieves all occasions.
     *
     * @return {Promise<OccasionEntity[]>}
     */
    public static async GetAll(): Promise<OccasionEntity[]> {
        let result: OccasionEntity[] = [];
        const requestOptions = {
            method: 'GET',
        };

        await fetch(`${ApiPath}/api/v2/Home/getoccasion`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                result = data;
            })
            .catch((error) => {
                console.log(error);
                result = occasionsSampleData;
            });

        return result;
    }

    public static async GetCurrentOccassions(): Promise<OccasionEntity> {
        // Simulate delay of 1 second
        simulateDelay(1);
        const occasions = await this.GetAll();
        let index = 0;
        const date = new Date();
        occasions.forEach((item) => {
            const startDate = new Date(item.start_at);
            if (date >= startDate) {
                index = occasions.indexOf(item);
            }
        });
        return occasions[index];
    }
}

export default OccasionService;
