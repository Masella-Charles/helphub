export const environment = {
    production: true,
    base_url: 'http://kcbug-mtn-momo-portal-backend-kcbug-mtn-momo-transactions.apps.keprocpp01.kcbgroup.com/api/',

    product: {
        channel: 'MTN',
        productType: '001',
        customerDetails: '1',
        loanDetails: '1',
        loanProduct: 'IND',
        limitDetails: '1',
        accountDetails: '1'
    },
    statement: {
        nbEntries: 10000,
    },

    endpoint: {
        users: {
            login: 'users/login',
            listAll: 'users/listAll',
            listAllUnauthorized: 'users/listAllUnauthorized',
            listAllAuthorized: 'users/listAllAuthorized',
            listAllRejected: 'users/listAllRejected',
            get: 'users/get',
            logOut: 'users/logOut',
            create: 'users/create',
            createExternal: 'users/createExt',
            edit: 'users/edit',
            approve: 'users/approve',
            reject: 'users/reject',
            search: 'users/search',
            delete: 'users/delete',
            activate: 'users/activate',
            deactivate: 'users/deactivate',
            forgotPassword: 'users/forgotPassword',
            changePassword: 'users/editPassword',
            validateOtp: 'users/validateOtp',
            validatePassword: 'users/validatePassword',
        },
        roles: {
            listAll: 'roles/listAll',
        },
        organisations: {
            listAllAuthorized: 'organisations/listAllAuthorized',
            listKCB: 'organisations/listKCB',
            listPartner: 'organisations/listPartner',
            createOrg: 'organisations/create',
            edit: 'organisations/edit',
            reject: 'organisations/reject',
        },
        query: {
            statementQuery: 'v1/statementQuery' ,
            productQuery: 'v1/productQuery',
            crbQuery: 'v1/customer-crb-crm',
        }
    }



};