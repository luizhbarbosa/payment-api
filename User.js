/**
 * Tipos de usuários aceitos pelo sistema
 */
export const UserType = {
  COMMON: 'COMMON',
  MERCHANT: 'MERCHANT',
};

/**
 * Representação da entidade User
 */
export class User {
  constructor({ id, fullName, document, email, password, balance = 0, userType }) {
    this.id = id;
    this.fullName = fullName;
    this.document = document; // CPF ou CNPJ
    this.email = email;
    this.password = password;
    this.balance = balance;
    this.userType = userType;
  }
}

export default User;