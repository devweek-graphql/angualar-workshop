import { CharacterTypeEnum, CharacterUniverseEnum, OrderEnum } from "../enums/enums";


export interface CharacterResponse {
  getCharacterById: Character
}

export interface CharactersResponse {
  getCharacters: Character[]
}
export interface AbilitiesResponse {
  getAbilities: Ability[]
}
export interface TeamsResponse {
  getTeams: Team[]
}
export interface FirstAppereancesResponse {
  getFirstAppereances: FirstAppereance[]
}

export interface DeleteCharacterResponse {
  deleteCharacter: string
}

export interface Character {
  name: string;
  characterAvatar: string;
  universe: CharacterUniverseEnum;
  type: CharacterTypeEnum;
  allies?: Character[];
  partOf?: Team[];
  firstAppearance?: FirstAppereance;
  abilities?: Ability[]
  characterDescription?: string;
}

export interface Ability {
  name: string;
  description: string;
}

export interface FirstAppereance {
  comicName: string;
  year: string;
}

export interface KeyValue {
  key: string;
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
