import userAssets from '../models/UserAssets';

class HelpUserAssets {
  static async getUserAssets(userId:number, assetId:number):Promise<userAssets> {
    const result = await userAssets.findOne({ where: { userId, assetId } });
    return result as userAssets;
  }
}

export default HelpUserAssets;
