class UserRepository {
  constructor() {
    this.users = [];
  }

  findById(id) {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  findByCpf(cpf) {
    // No model User, o CPF/CNPJ é armazenado no campo 'document'
    return this.users.find((user) => user.document === cpf);
  }

  save(user) {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index !== -1) {
      this.users[index] = user;
    } else {
      this.users.push(user);
    }
    return user;
  }
}

export default new UserRepository();