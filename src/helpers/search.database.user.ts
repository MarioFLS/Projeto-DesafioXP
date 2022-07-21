import User from '../models/User';

class HelpUserClass {
  private _name?:string;
  private _email:string;

  constructor(email:string, name?:string) {
    this._name = name;
    this._email = email;
  }

  async user() {
    const user = await User.findOne({ where: { email: this._email } });
    return user;
  }
}

export default HelpUserClass;
