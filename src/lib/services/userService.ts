import { getApiUrl } from '@/lib/constants/api';
// import { AccountEntity } from '../models/entities/AccountEntity/AccountEntity';
class UserService {
    public static async updateUser(userData: any): Promise<void> {
      try {
        const response = await fetch(getApiUrl('UpdateUser'), {
          method: 'PUT', // or 'PATCH' depending on your server implementation
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to update user: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    }
  }
  
  export default UserService;