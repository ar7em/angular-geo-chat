export class Message {
  text: string;
  authorId: string;
  target: string;
  timestamp: any;

  constructor(text: string, authorId: string, target?: string, timestamp?: any) {
    this.text = text;
    this.authorId = authorId;
    this.target = target;
    this.timestamp = timestamp;
  };

  public get data(): {text: string, authorId: string, target: string, timestamp: any} {
    return {
      text: this.text,
      authorId: this.authorId,
      target: this.target,
      timestamp: this.timestamp
    };
  }
}
