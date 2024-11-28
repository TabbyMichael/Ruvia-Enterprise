import { Auth, RecaptchaVerifier as AuthRecaptchaVerifier } from 'firebase/auth';

declare global {
  interface Window {
    recaptchaVerifier: AuthRecaptchaVerifier;
  }
}
