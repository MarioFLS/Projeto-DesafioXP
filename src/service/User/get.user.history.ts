import UserLog from '../../models/UserLog';
import HelpAssets from '../../helpers/search.asset';

class UserHistory {
  static async history(userId:number) {
    const logs = await UserLog.findAll({ where: { userId } });

    const result = await logs.map(async (log) => {
      const {
        assetId, type, quantity, amount,
      } = log.toJSON();
      const asset = await new HelpAssets().findAsset(assetId);
      const { name } = asset.toJSON();
      return {
        tipo: type,
        nome: name,
        quantidade: quantity,
        valor: amount,
      };
    });
    return Promise.all(result);
  }
}

export default UserHistory;
