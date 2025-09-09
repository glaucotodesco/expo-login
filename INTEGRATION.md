# Integração com Servidor de Autenticação

Este projeto foi integrado com o servidor Spring Boot de autenticação e autorização.

## Configuração

### 1. Iniciar o Servidor
Certifique-se de que o servidor Spring Boot está rodando:
```bash
mvnw.cmd spring-boot:run
```

### 2. Configurar URL da API
Se o servidor estiver rodando em uma porta diferente, edite o arquivo:
`src/config/api.ts`

### 3. Usuários Disponíveis
- **Admin**: username: `admin`, password: `admin123`
- **User**: username: `user`, password: `user123`

## Funcionalidades Implementadas

### Autenticação
- Login com JWT token
- Armazenamento seguro do token
- Redirecionamento baseado em role

### Autorização
- Proteção de rotas por role
- Teste de endpoints protegidos
- Logout com limpeza de token

### Páginas
- **Login**: Autenticação com servidor
- **User**: Acesso a endpoints de usuário
- **Admin**: Acesso a endpoints de admin e usuário

## Endpoints Testados
- `GET /api/test/user` - Requer role USER ou ADMIN
- `GET /api/test/admin` - Requer role ADMIN

## Como Testar
1. Faça login com um dos usuários
2. Use os botões "Testar Endpoint" nas páginas
3. Verifique as respostas do servidor