import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      name
      email
      role
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $role: String!) {
    createUser(name: $name, email: $email, role: $role) {
      id
      name
      email
      role
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $name: String, $email: String, $role: String) {
    updateUser(id: $id, name: $name, email: $email, role: $role) {
      id
      name
      email
      role
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;

@Injectable({ providedIn: 'root' })
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  getAllUsers(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_ALL_USERS,
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  createUser(user: {
    name: string;
    email: string;
    role: string;
  }): Observable<any> {
    return this.apollo.mutate({
      mutation: CREATE_USER,
      variables: { ...user },
      refetchQueries: [{ query: GET_ALL_USERS }],
    });
  }

  updateUser(user: {
    id: number;
    name?: string;
    email?: string;
    role?: string;
  }): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_USER,
      variables: { ...user },
      refetchQueries: [{ query: GET_ALL_USERS }],
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_USER,
      variables: { id },
      refetchQueries: [{ query: GET_ALL_USERS }],
    });
  }
}
