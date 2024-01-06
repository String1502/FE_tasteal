import { occasions as occasionsSampleData } from '@/lib/constants/sampleData';
import { convertLunarToSolarDate } from '@/utils/format';
import { getApiUrl } from '../constants/api';
import { ApiPath } from '../constants/common';
import { OccasionReq } from '../models/dtos/Request/OccasionReq/OccasionReq';
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
        result = data
          .map((item: any) => {
            const start_at = new Date(item.start_at);
            const end_at = new Date(item.end_at);
            return {
              ...item,
              start_at,
              end_at,
            };
          })
          .sort((a, b) => {
            let startA = a.start_at;
            startA.setFullYear(new Date().getFullYear());
            let startB = b.start_at;
            startB.setFullYear(new Date().getFullYear());

            startA = a.is_lunar_date
              ? convertLunarToSolarDate(a.start_at)
              : a.start_at;
            startB = b.is_lunar_date
              ? convertLunarToSolarDate(b.start_at)
              : b.start_at;

            return startA.getTime() - startB.getTime();
          });
      })
      .catch((error) => {
        console.log(error);
        result = occasionsSampleData;
      });

    return result;
  }
  public static async GetById(id: number): Promise<OccasionEntity> {
    return fetch(getApiUrl('GetOccasionById', id.toString())).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Failed to get occasions');
    });
  }

  public static async getCircleOccasion(): Promise<OccasionEntity[]> {
    const TetId = 10;
    let result: OccasionEntity[] = await this.GetAll().then((data) =>
      data
        .map((item: OccasionEntity) => {
          let start_at = new Date(item.start_at);
          let end_at = new Date(item.end_at);
          if (item.id != TetId) {
            start_at.setFullYear(new Date().getFullYear());
            end_at.setFullYear(new Date().getFullYear());
          }
          if (item.is_lunar_date && item.id != TetId) {
            start_at = convertLunarToSolarDate(start_at);
            end_at = convertLunarToSolarDate(end_at);
          }
          return {
            ...item,
            start_at,
            end_at,
          };
        })
        .sort((a, b) => a.start_at.getTime() - b.start_at.getTime())
    );

    const tet: OccasionEntity = result.find((item) => item.id == TetId);

    const start_at_1 = new Date(tet.start_at);
    start_at_1.setFullYear(new Date().getFullYear() - 1);
    const end_at_1 = new Date(tet.end_at);
    end_at_1.setFullYear(new Date().getFullYear());

    const start_at_2 = new Date(tet.start_at);
    start_at_2.setFullYear(new Date().getFullYear());
    const end_at_2 = new Date(tet.end_at);
    end_at_2.setFullYear(new Date().getFullYear() + 1);

    result = [
      {
        ...tet,
        start_at: convertLunarToSolarDate(start_at_1),
        end_at: convertLunarToSolarDate(end_at_1),
      },
      ...result.filter((item) => item.id != TetId),
      {
        ...tet,
        start_at: convertLunarToSolarDate(start_at_2),
        end_at: convertLunarToSolarDate(end_at_2),
      },
    ];

    return result;
  }

  public static async GetCurrentOccassions(): Promise<OccasionEntity> {
    let occasions = await this.getCircleOccasion();
    console.log(occasions);

    let index: number = 0;
    const getTime = new Date().getTime();
    for (let i = 0; i < occasions.length; i++) {
      const d = occasions[i];
      if (getTime >= d.start_at.getTime()) {
        index = i;
      } else {
        if (i - 1 >= 0 && getTime > occasions[i - 1].end_at.getTime()) {
          index = i;
        }
        break;
      }
    }
    console.log(index);

    return occasions[index];
  }

  public static async CreateOccasion(body: OccasionReq) {
    return fetch(getApiUrl('CreateOccasion'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
}

export default OccasionService;
