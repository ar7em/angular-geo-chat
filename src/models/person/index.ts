export class Person {
  uid: string;
  online: boolean;
  displayName: string;
  photoUrl: string;

  constructor(data?: {uid: string, online?: boolean, displayName?: string, photoUrl?: string}) {
    this.uid = data.uid;
    this.online = data.online;
    this.displayName = data.displayName;
    this.photoUrl = data.photoUrl;
  }
}
