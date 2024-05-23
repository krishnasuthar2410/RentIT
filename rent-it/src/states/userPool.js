import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: process.env.POOLID,
    ClientId: process.env.APPCLIENTID
}

export default new CognitoUserPool(poolData);