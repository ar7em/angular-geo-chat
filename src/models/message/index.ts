export class Message {
  text: string;
  authorId: string;
  target: string;

  constructor(text: string, authorId: string, target?: string) {
    this.text = text;
    this.authorId = authorId;
    this.target = target;
  };

  public get data(): {text: string, authorId: string, target: string} {
    return {
      text: this.text,
      authorId: this.authorId,
      target: this.target
    };
  }
}
