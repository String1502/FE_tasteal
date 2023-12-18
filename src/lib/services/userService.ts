import { getApiUrl } from '@/lib/constants/api';
import { AccountEntity } from '../models/entities/AccountEntity/AccountEntity';

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

    public static async getCurrentUser(userData: string): Promise<AccountEntity> {
      try {
        const response = await fetch(`${getApiUrl('GetCurrentUser')}?AccountId=${userData}`, {
          method: 'GET', 
          headers: { 
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          const responseBody = await response.text();
          console.error(`Failed to update user: ${response.statusText}. Server response: ${responseBody}`);
          throw new Error(`Failed to update user: ${response.statusText}`);
        }
    
        // Assuming UserData is the type of your user data
        const result = await response.json();
        return result;
      } catch (error) {
        console.error('Error getting current user:', error);
        throw error;
      }
    }
    
  }
  
  export default UserService;