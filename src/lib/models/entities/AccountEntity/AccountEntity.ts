export type AccountEntity = {
  uid: string;
  name?: string;
  avatar?: string;
  introduction?: string;
  link?: string;
  slogan?: string;
  quote?: string;
};

export function isAccountEntityFullInfor(item: AccountEntity) {
  for (const key in item) {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      const value = item[key];
      if (value == null || value == '' || typeof value == 'undefined') {
        // If the value is not null or undefined, return true
        return false;
      }
    }
  }
  return true;
}
