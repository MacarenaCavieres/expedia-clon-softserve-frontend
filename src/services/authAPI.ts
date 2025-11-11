import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            accessToken
            refreshToken
            user {
                id
                name
                lastname
                email
            }
        }
    }
`;

export const REGISTER_USER = gql`
    mutation RegisterUser($input: UserInput!) {
        registerUser(input: $input) {
            id
            email
            name
            lastname
        }
    }
`;

export const FORGOT_PASSWORD = gql`
    mutation ForgotPassword($email: String!) {
        forgotPassword(email: $email)
    }
`;

export const RESET_PASSWORD = gql`
    mutation ResetPassword($input: PasswordResetInput!) {
        resetPassword(input: $input) {
            id
            email
        }
    }
`;

export const GET_USER_INFO = gql`
    query GetUserInfo {
        getUserInfo {
            id
            email
            phone
            name
            lastname
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_USER_INFO = gql`
    mutation UpdateUserInfo($input: UserUpdateInput!) {
        updateUserInfo(input: $input) {
            id
            email
            phone
            name
            lastname
            createdAt
            updatedAt
        }
    }
`;

export const REFRESH_TOKEN = gql`
    mutation RefreshToken($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
            accessToken
            refreshToken
            user {
                id
                email
                phone
                name
                lastname
            }
        }
    }
`;
