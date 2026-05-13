export type RichTextNode = {
  type: string;
  content?: RichTextNode[];
  children?: any[];
  [key: string]: any;
};

export type RichTextDocument = {
  type?: string;
  content?: RichTextNode[];
};
