// mock/user.js
export default [
  {
    url: '/api/user',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        data: {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
        }
      };
    }
  }
];