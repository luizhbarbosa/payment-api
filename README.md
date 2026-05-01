# payment-api

API Node.js para transferência de valores entre usuários.

## Como Rodar e Testar

1. **Instalação**: `npm install`
2. **Banco de Dados**: Certifique-se de que as migrations foram aplicadas: `npx prisma migrate dev`
3. **Iniciar**: `npm start`
4. **Testar Rota**:
   ```bash
   curl -X POST http://localhost:3000/transfer \
        -H "Content-Type: application/json" \
        -d '{"value": 100, "payer": 1, "payee": 2}'
   ```
5. **Verificar Dados**: Use o Prisma Studio para validar os saldos:
   ```bash
   npx prisma studio
   ```

## Rotas ativas

### `POST /transfer`
Cria uma transferência entre duas contas.

#### Body esperado
```json
{
  "value": 100,
  "payer": 1,
  "payee": 2
}
```

#### Validações
- `value` deve ser um número maior que zero.
- `payer` deve ser um número válido.
- `payee` deve ser um número válido.

#### O que a rota faz
- Envia a requisição para o controller `makeTransfer`.
- O controller chama a regra de negócio em `transferMoney`.
- O serviço valida saldo, impede auto-transferência, bloqueia lojista como pagador e tenta autorizar a operação.
- Se a operação for aceita, a API retorna `200 OK` com os dados da transferência.

#### Respostas comuns
- `400 Bad Request`: dados inválidos no corpo da requisição.
- `404 Not Found`: usuário pagador ou recebedor não encontrado.
- `500 Internal Server Error`: falhas inesperadas no fluxo.

## Middleware global de erro

A aplicação usa um middleware central para padronizar respostas de erro em `src/controllers/errorMiddleware.js`.

## Observação

No estado atual do projeto, apenas a rota `POST /transfer` está exposta no app.
