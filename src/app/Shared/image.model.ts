export class Image {
  public url: string;
  public result: string;
  public selected?: boolean;

  constructor(url: string, result: string) {
    this.url = url;
    this.result = result;
  }
}
