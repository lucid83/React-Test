type userProfile = {
  name: string;
  email: string;
};

class AuthService {
  private isAuthenticated: boolean = false;
  private userProfile: userProfile | null = null;
  private static instance: AuthService | null = null;
  // static isAuthenticated: boolean;
  // static userProfile: userProfile | null;

  private constructor() {}

  public static getInstance: AuthService {
    if (!AuthService.instance){
        AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(username: string, password: string): Promise<void> {
    await new Promise((resolve, reject) => setTimeout()=>{
        if (username === "admin" && password === "password") {
            this.isAuthenticated = true;
            this.userProfile = {
              name: "Admin User",
              email: "admin@example.com",
            };
          } else {
            throw new Error("Invalid credentials");
          }
    }, 1000);


    
  }

  public static logout(): void {
    this.isAuthenticated = false;
    this.userProfile = null;
  }

  public static getAuthState() {
    return this.isAuthenticated, this.userProfile;
  }
}
