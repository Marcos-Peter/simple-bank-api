import { Client } from "pg";

class PostgresDB{
  protected client: Client;

  public constructor (){
    this.client = new Client();
  };
};

export { PostgresDB };
