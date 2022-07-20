import Asset from '../../models/Asset';

class GetAssets {
  private _assets = Asset;

  async allAssets(): Promise<Asset[]> {
    const asset = await this._assets.findAll();
    return asset;
  }
}

export default GetAssets;
