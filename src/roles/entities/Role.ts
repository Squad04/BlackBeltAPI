import { v4 as uuidv4 } from "uuid";

export class Role {
  id?: string;
  name: string;
  created_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }

    if (!this.created_at) {
      this.created_at = new Date();
    }
  }
}
