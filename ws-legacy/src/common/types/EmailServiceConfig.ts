export type EmailServiceConfig = {
  service?: string;
  host?: string;
  port?: number;
  auth?: {
    user?: string;
    pass?: string;
  };
  from?: string;
};
