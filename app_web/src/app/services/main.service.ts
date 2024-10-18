
export class MainService {


  private machine = 3;
  protected endpointApi = "https://admin.mefisistema.com.br/api";
  protected domain = "https://admin.mefisistema.com.br/api";
  public masterDomain = "https://admin.mefisistema.com.br/api";
  public masterDomainStorage = "https://admin.mefisistema.com.br";

  constructor() {
    if (this.machine == 2) {
      this.endpointApi = "http://192.168.0.10/mefiservice/public/api";
      this.domain = "http://192.168.0.10/mefiservice/public/api";
      this.masterDomain = "http://192.168.0.10/mefiservice/api";
      this.masterDomainStorage = "http://192.168.0.10/mefiservice";
    }
    if (this.machine == 3) {
      this.endpointApi = "http://localhost:7000/api";
      this.domain = "http://localhost:7000/api";
      this.masterDomain = "http://localhost:7000/api";
      this.masterDomainStorage = "http://localhost:7000";
    }
    (<any>window)["api_locations"] = this;
  }

  parseJson(object: any) {
    return JSON.parse(JSON.stringify(object))
  }



}
