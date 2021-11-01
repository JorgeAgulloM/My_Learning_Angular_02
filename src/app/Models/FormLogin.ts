export class FormLogin {

  private username: string
  private password: string
  private rememberMe: boolean

  constructor(
    username: string,
    password: string,
    rememberMe: boolean = false
    ) {
    this.username = username
    this.password = password
    this.rememberMe = rememberMe
  }

  get_user(): string {
    return this.username;
  }

  get_password(): string {
    return this.password;
  }

  get_rememberMe(): boolean {
    return this.rememberMe;
  }

  set_user(value: string): void {
    this.username = value
  }

  set_password(value: string): void {
    this.password = value
  }

  set_rememberMe(value: boolean = false): void {
    console.log('Y console log es.... ' + value)
    value = true ? value == true : false

    this.rememberMe = value
  }


}
