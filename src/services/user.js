import { protectedApi, publicApi } from '@/lib/axios'

export const UserService = {
  /**
   * cria um novo usuário
   * @param {Object} input - Os dados do usuário para cadastro
   * @param {string} input.firstName - O primeiro nome do usuário
   * @param {string} input.lastName - O sobrenome do usuário
   * @param {string} input.email - O email do usuário
   * @param {string} input.password - A senha do usuário
   * @returns {Object} Usuario criado
   * @returns {string} response.tokens - Tokens de autenticação
   */
  signup: async (input) => {
    const response = await publicApi.post('/users', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    })
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    }
  },

  /**
   * Cria um novo usuário.
   * @param {Object} input - Usuário a ser criado.
   * @param {string} input.email - Email do usuário.
   * @param {string} input.password - Senha do usuário.
   * @returns {Object} Usuário autenteicado.
   * @returns {string} response.tokens - Tokens de autenticação.
   */
  login: async (input) => {
    const response = await publicApi.post('/users/login', {
      email: input.email,
      password: input.password,
    })
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    }
  },

  /**
   * Retorna o usuário autenticado.
   * @returns {Object} Usuário autenticado.
   */
  me: async () => {
    const response = await protectedApi.get('/users/me')
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
    }
  },

  /**
   * Retorna o balanço do usuário autenticado.
   * @param {Object} input - Usuário a ser criado.
   * @param {string} input.from - Data inicial (YYYY-MM-DD).
   * @param {string} input.to - Data final (YYYY-MM-DD).
   */
  getBalance: async (input) => {
    const queryParams = new URLSearchParams()
    queryParams.set('from', input.from)
    queryParams.set('to', input.to)
    const response = await protectedApi.get(
      `/users/me/balance?${queryParams.toString()}`
    )
    return response.data
  },
}
