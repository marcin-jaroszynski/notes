import UserSchema from '../db/models/user';
import CategorySchema from '../db/models/category';


async function login(req, res) {
  let response = {};
  response.success = false;
  response.token = '';
  response.message = '';
  if (req.query.login && req.query.password) {
    if (await UserSchema.validateCreditentials(req.query.login, req.query.password)) {
      response.token = await UserSchema.getToken(req.query.login);
      response.categories = await CategorySchema.categories();
      response.success = true;
    } else {
      res.status(401);
      response.message = 'Login or password are not valid!';
    }
  }
  // console.log('LoginRequest.response: ' + JSON.stringify(response));
  return res.json(response);
}

export { login };