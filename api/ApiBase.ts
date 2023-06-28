export class ApiBase {
  protected _domainToUrl(domain: string) {
    return 'https://' + domain;
  }
}