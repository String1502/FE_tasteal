export type AccountEntity = {
  uid: string;
  name?: string;
  avatar?: string;
  introduction?: string;
  link?: string;
  slogan?: string;
  quote?: string;
  isDeleted?: boolean;
};

export function isAccountEntityFullInfor(item: AccountEntity) {
  for (const key in item) {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      const value = item[key];
      if (value == null || value == '' || typeof value == 'undefined') {
        if (key != 'isDeleted') {
          return false;
        }
      }
    }
  }
  return true;
}

export function InitAccountEntity() {
  return {
    uid: '',
    name: '',
    avatar: '',
    introduction: '',
    link: '',
    slogan: '',
    quote: '',
  } as AccountEntity;
}
