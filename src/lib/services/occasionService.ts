import { occasions as occasionsSampleData } from '@/lib/constants/sampleData';
import { ApiPath } from '../constants/common';
import { OccasionEntity } from '../models/entities/OccasionEntity/OccasionEntity';
import { convertLunarToSolarDate } from '@/utils/format';

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
        result = data
          .map((item: any) => {
            let start_at = new Date(item.start_at);
            start_at.setFullYear(new Date().getFullYear());
            let end_at = new Date(item.end_at);
            end_at.setFullYear(new Date().getFullYear());
            if (item.is_lunar_date) {
              start_at = convertLunarToSolarDate(start_at);
              end_at = convertLunarToSolarDate(end_at);
            }
            return {
              ...item,
              start_at,
              end_at,
            };
          })
          .sort((a, b) => a.start_at.getTime() - b.start_at.getTime());
      })
      .catch((error) => {
        console.log(error);
        result = occasionsSampleData;
      });

    return result;
  }

  public static async GetCurrentOccassions(): Promise<OccasionEntity> {
    let occasions = await this.GetAll();
    const firstOccasion = structuredClone(occasions[0]);
    firstOccasion.start_at.setFullYear(new Date().getFullYear() + 1);
    firstOccasion.end_at.setFullYear(new Date().getFullYear() + 1);

    occasions = [...occasions, firstOccasion];

    let index: number = 0;
    const getTime = new Date().getTime();
    for (let i = 0; i < occasions.length; i++) {
      const d = occasions[i];
      if (getTime >= d.start_at.getTime()) {
        index = i;
      } else {
        if (getTime > occasions[i - 1].end_at.getTime()) {
          index = i;
        }
        break;
      }
    }
    console.log(index);

    return occasions[index];
  }
}

export default OccasionService;
