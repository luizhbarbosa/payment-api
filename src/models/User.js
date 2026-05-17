export class UserType {
  constructor(id, balance, type) {
    this.id = id;
    this.balance = balance;
    this.type = type; // 'COMMON' ou 'MERCHANT'
  }
}