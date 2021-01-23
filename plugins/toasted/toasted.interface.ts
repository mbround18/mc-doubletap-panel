export type IToasted = Record<
  string,
  {
    target?: string;
    message?: string;
    type: 'success' | 'error';
  }
>;
