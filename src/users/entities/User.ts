import { v4 as uuidv4 } from "uuid";

export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  roleId: string;
  createdAt?: Date;
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }

    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
