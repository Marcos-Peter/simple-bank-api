export class RandomPassword {
  constructor(public length: number) {}

  generate() {
    let password = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()-+.,;?{[}]^><:";
    for (let i = 0; i < this.length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };
};
