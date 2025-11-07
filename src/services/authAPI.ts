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
    mutation RegisterUser($input: UserInput!){
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