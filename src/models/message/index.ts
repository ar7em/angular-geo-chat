export class Message {
  text: string;
  authorId: string;

  constructor(text: string, authorId: string) {
    this.text = text;
    this.authorId = authorId;
  };

  public get data(): {text: string, authorId: string} {
    return {
      text: this.text,
      authorId: this.authorId
    };
  }
}
