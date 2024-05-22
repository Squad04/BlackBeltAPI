import { v4 as uuidv4 } from "uuid";

export class Token {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
