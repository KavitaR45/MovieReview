import axios from "axios"
const printErrorText = (err) => {
  console.log("------------------------------------------");
  console.log("                                          ");
  console.log(" ███████ ██████  ██████   ██████  ██████  ");
  console.log(" ██      ██   ██ ██   ██ ██    ██ ██   ██ ");
  console.log(" █████   ██████  ██████  ██    ██ ██████  ");
  console.log(" ██      ██   ██ ██   ██ ██    ██ ██   ██ ");
  console.log(" ███████ ██   ██ ██   ██  ██████  ██   ██ ");
  console.log("                                          ");
  console.log("------------------------------------------");
  console.log(err);
  console.log("------------------------------------------");
}

var C_URL="https://dev-fashion-ecomstore.pantheonsite.io"

const graphqlClient = axios.create({
  baseURL: C_URL + "/graphql",

});

export const Graphql = graphql;
export const GraphqlClient = graphqlClient;
