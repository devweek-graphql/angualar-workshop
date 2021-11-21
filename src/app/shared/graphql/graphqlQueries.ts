import { gql } from 'apollo-angular'

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

