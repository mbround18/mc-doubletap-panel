import Vue from 'vue';
import {GraphQLClient} from 'graphql-request';
import {interval as rxjsInterval} from 'rxjs';

export class GraphQL {
  private readonly url: string;
  private readonly gqlClient: GraphQLClient;
  constructor(public feature: string) {
    this.url = `${process.env.ENDPOINT_URL}/${this.feature}/graphql`;
    this.gqlClient = this.setupClient();
  }

  public async request(query: string, variables?: Record<string, unknown>) {
    const emoji = String.fromCodePoint(0x1f680);
    const stub = `[GraphQL Request][${emoji}]:`;
    console.log(stub, [this.url, query, variables ?? ''].join('\n'));
    const data = await this.gqlClient.request(query, variables);
    console.log(data);
    return data;
  }

  public subscribe(options: {
    query: string;
    variables?: any;
    callback: (data: any) => void;
    interval?: number;
  }) {
    const {query, variables, interval, callback} = options;

    // Initial Request for data
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.request(query, variables).then(callback);

    // Provide subscription
    const subscription = rxjsInterval(interval ?? 3000).subscribe(async () => {
      const data = await this.request(query, variables);
      callback(data);
    });

    // Add catch to kill subscription on window close
    if (process.browser) {
      window.addEventListener('unload', (event) => {
        subscription.unsubscribe();
      });
    }

    // Return sub
    return subscription;
  }

  private setupClient() {
    let authorization: string | null = 'Bearer NONE';
    if (process.browser) {
      authorization = localStorage.getItem('auth._token.discord');
    }

    if (authorization) {
      return new GraphQLClient(this.url, {
        mode: 'no-cors',
        headers: {
          authorization
        }
      });
    }

    throw new Error('Authorization not found! Please log in!');
  }
}
