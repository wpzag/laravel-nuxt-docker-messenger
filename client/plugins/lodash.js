import lodash from "lodash";

export default async function ({ app, params }, inject) {
  inject("_", lodash);
}
