export class Logger {
  constructor (private readonly namespace: string) {}

  public log (...messages: any[]) {
    console.log(...[`[${this.namespace}][log]`, ...messages])
  }

  public warn (...messages: any[]) {
    console.warn(...[`[${this.namespace}][warn]`, ...messages])
  }

  public error (...messages: any[]) {
    console.error(...[`[${this.namespace}][error]`, ...messages])
  }
}
