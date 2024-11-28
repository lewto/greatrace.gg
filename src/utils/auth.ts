import CryptoJS from 'crypto-js';

export class IRacingAuth {
  static encodePassword(password: string, email: string): string {
    // Convert email to lowercase as per iRacing requirements
    const normalizedEmail = email.toLowerCase();
    
    // Concatenate password with lowercase email
    const concatenated = password + normalizedEmail;
    
    // Create SHA256 hash
    const hash = CryptoJS.SHA256(concatenated);
    
    // Convert to Base64
    return CryptoJS.enc.Base64.stringify(hash);
  }

  static parseRateLimits(headers: any) {
    return {
      limit: parseInt(headers['x-ratelimit-limit'] || '0', 10),
      remaining: parseInt(headers['x-ratelimit-remaining'] || '0', 10),
      reset: parseInt(headers['x-ratelimit-reset'] || '0', 10)
    };
  }

  static getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

  static clearCookies(): void {
    document.cookie.split(';').forEach(cookie => {
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
  }
}