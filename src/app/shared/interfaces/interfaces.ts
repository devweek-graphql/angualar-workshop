import { CharacterTypeEnum, CharacterUniverseEnum } from "../enums/enums";


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

export interface FilterCharacter {
  name: string;
  universe?: CharacterUniverseEnum;
}

export interface PageConfig {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: number;
  order?: number;
}
