import User from '../models/User';

class HelpUserClass {
  private _name?:string;
  private _email:string;

  constructor(email:string, name?:string) {
    this._email = email;
    this._name = name;
  }

  async user() {
    const user = await User.findOne({ where: { email: this._email } });
    return user;
  }

  async checkUser() {
    const user = await User.findOne({ where: { email: this._email, name: this._name } });
    return user;
  }
}

export default HelpUserClass;
