export interface ISendCode {
  uid: string;
  phone_number: string;
}

export interface ISendCodeResponse {
  flags: number;
  type: {
    length: number;
    className:string;
  };
  phoneCodeHash: string;
  nextType: any;
  timeout: any;
  className: string;
}

export interface ISignIn {
  uid: string;
  phone_code: string;
  phone_code_hash: string;
  phone_number: string;
}
