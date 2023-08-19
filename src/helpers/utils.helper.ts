import _ from "lodash";
export function capitalizeText(text: string) {
  return _.startCase(_.toLower(text));
}
