import { gql } from 'apollo-angular'

export const QUERY_CHARACTERS = gql`
  query($filters: GetCharactersFilters) {
    getCharacters (filters: $filters) {
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

export const QUERY_CHARACTER_BY_ID = gql`
  query($id: string) {
    getCharacterById (id: $id) {
      name
      characterAvatar
      universe
      type
    }
  }
`;

export const MUTATION_DELETE_CHARACTER = gql `
  mutation($id: string!) {
    deleteCharacter(id: $id)
  }
`;

export const MUTATION_UPDATE_CHARACTER = gql `
  mutation($id: string!, $payload: UpdateCharacterPayload) {
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

export const MUTATION_CREATE_CHARACTER = gql `
  mutation($id: string!, $payload: AddCharacterPayload) {
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

