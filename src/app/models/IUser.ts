export interface Avatar {
  public_id: string;
  url: string;
}

export interface User {
  _id: string;
  avatar: Avatar;
  email: string;
  name: string;
  role: string;
}
