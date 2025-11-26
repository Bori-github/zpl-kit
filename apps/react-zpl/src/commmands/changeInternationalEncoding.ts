import { defineCommand } from "./base";

import { UTF8_ENCODING } from "../constants";

type ChangeInternationalEncodingParams = string[] | undefined;

export const changeInternationalEncoding =
  defineCommand<ChangeInternationalEncodingParams>(
    (characterSets = [UTF8_ENCODING]) => {
      const joinedCharacterSets = characterSets.join(",");

      return `^CI${joinedCharacterSets}`;
    },
  );
