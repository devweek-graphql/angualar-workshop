import { CharacterTypeEnum, CharacterUniverseEnum, OrderEnum } from "../enums/enums";


export interface Character {
  name: string;
  characterAvatar: string;
  universe: CharacterUniverseEnum;
  type: CharacterTypeEnum;
  allies?: Character[];
  partOf?: Team[];
  firstAppearance?: FirstAppearance;
  abilities?: Ability[]
  characterDescription?: string;
}

export interface Ability {
  name: string;
  description: String;
}

export interface FirstAppearance {
  comicName: string;
  year: String;
}

export interface KeyValue {
  key: number;
  value: string;
}

export interface Team {
  name: string;
  description: String;
}
export interface GetCharactersFilters {
  universe?: CharacterUniverseEnum;
  order?: OrderEnum;
  sortBy?: string;
  limit?: number;
  offset?: number;
  start?: number;
}

export interface UpdateCharacterPayload {
  universe?: CharacterUniverseEnum
  type?: CharacterTypeEnum
  alliesIdsToAdd?: string[]
  partOfIdsToAdd?: string[]
  fistAppearanceId?: string
  abilitiesIdsToAdd?: string[]
}


export interface AddCharacterPayload {
  name: string;
  type: CharacterTypeEnum;
  universe: CharacterUniverseEnum;
  alliesIds: string[];
  partOfIds: string[]
  firstAppearanceId: string
  abilitiesIds: string[];
}
