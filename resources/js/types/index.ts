export type * from './auth';

export type Flash = {
    sukses?: string;
    error?: string;
};

export type SharedProps = {
    auth: import('./auth').Auth;
    flash: Flash;
    name: string;
};
