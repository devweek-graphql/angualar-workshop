import { gql } from 'apollo-angular'


//Characters
export const QUERY_CHARACTERS = gql`
  query($filters: GetCharactersFilters) {
    getCharacters (filters: $filters) {
      name
      characterAvatar
      universe
      type
    }
  }
`;

export const QUERY_ALL_CHARACTERS_IDS = gql`
  query {
    getCharacters {
      name
    }
  }
`;

export const QUERY_CHARACTER_BY_ID = gql`
  query($id: ID!) {
    getCharacterById (id: $id) {
      name
      characterAvatar
      universe
      type
      firstAppearance {
        comicName
        year
      }
      allies {
        name
      }
      partOf {
        name
        description
      }
      abilities {
        name
        description
      }
    }
  }
`;

export const MUTATION_DELETE_CHARACTER = gql`
  mutation($id: ID!) {
    deleteCharacter(id: $id)
  }
`;

export const MUTATION_UPDATE_CHARACTER = gql`
  mutation($id: ID!, $payload: UpdateCharacterPayload) {
    updateCharacter(id: $id, payload: $payload) {
      name
      characterAvatar
      universe
      type
      allies {
        name
      }
      partOf {
        name
        description
      }
      firstAppearance {
        comicName
        year
      }
      abilities {
        name
        description
      }
    }
  }
`;

export const MUTATION_CREATE_CHARACTER = gql`
  mutation($payload: AddCharacterPayload) {
    addNewCharacter(payload: $payload) {
      name
      characterAvatar
      universe
      type
      allies {
        name
      }
      partOf {
        name
        description
      }
      firstAppearance {
        comicName
        year
      }
      abilities {
        name
        description
      }
    }
  }
`;


//Abilities
export const QUERY_ABILITIES = gql`
  query {
    getAllAbilities {
      name
      description
    }
  }
`;

//Teams
export const QUERY_TEAMS = gql`
  query {
    getAllTeams {
      name
      description
    }
  }
`;

//FirstAppereances
export const QUERY_APPEREANCES = gql`
  query {
    getAllFirstAppearances {
      comicName
      year
    }
  }
`;
