

export const environment = {
    production: false,
    base_url: 'http://localhost:8080/',


    endpoint: {
        users: {
            signUp: 'auth/signup',
            login: 'auth/login',
            profile: 'users/profile',
            byrole: 'users/by-role',
            list: 'users/list',
            editUser: 'auth/editUser',
            deleteUser: 'auth/deleteUser',
            editPassword: 'auth/edit-password',
            forgotPassword: 'auth/forgot-password',
        },
        volunteer: {
            get: 'api/v1/volunteer/get',
            list: 'api/v1/volunteer/list',
            create: 'api/v1/volunteer/create',
            update: 'api/v1/volunteer/update',
            getByUserId: 'api/v1/volunteer/getByUserId',
        },
        roles: {
            get: 'api/v1/role/get',
            list: 'api/v1/role/list',
            create: 'api/v1/role/create',
            update: 'api/v1/role/update',
            delete: 'api/v1/role/delete',
        },
        permissions: {
            listAllAuthorized: 'organisations/listAllAuthorized',
        },
        opportunities: {
            getByStatus: 'api/v1/opportunity/status',
            getById: 'api/v1/opportunity/get',
            list: 'api/v1/opportunity/list',
            create: 'api/v1/opportunity/create',
            update: 'api/v1/opportunity/update',
            transition: 'api/v1/opportunity/transition',
        },
        opportunityUser: {
            get: 'api/v1/opportunityUser/getOpportunityUser',
            list: 'api/v1/opportunityUser/listOpportunityUser',
            volunteerNow: 'api/v1/opportunityUser/volunteerNow',
            update: 'api/v1/opportunityUser/update',
            transition: 'api/v1/opportunityUser/volunteerTransition',
            delete: 'api/v1/opportunityUser/delete',
        },
        testimonials: {
            get: 'api/v1/testimonial/get',
            list: 'api/v1/testimonial/list',
            create: 'api/v1/testimonial/create',
            update: 'api/v1/testimonial/update',
            transition: 'api/v1/testimonial/transition',
            delete: 'api/v1/testimonial/delete',
        },
        contactus: {
            get: 'api/v1/contactus/get',
            list: 'api/v1/contactus/list',
            create: 'api/v1/contactus/create',
            update: 'api/v1/contactus/update',
            delete: 'api/v1/contactus/delete',
        },
        timesheet: {
            get: 'api/v1/timesheet/get',
            getByUserId: 'api/v1/timesheet/getByUserId',
            list: 'api/v1/timesheet/list',
            create: 'api/v1/timesheet/create',
            update: 'api/v1/timesheet/update',
            transition: 'api/v1/timesheet/transition',
            delete: 'api/v1/timesheet/delete',
        },
        disasters: {
            get: 'api/v1/disaster/get',
            list: 'api/v1/disaster/list',
            create: 'api/v1/disaster/create',
            update: 'api/v1/disaster/update',
            transition: 'api/v1/disaster/transition',
        },
        donations: {
            get: 'api/v1/donation/get',
            list: 'api/v1/donation/list',
            create: 'api/v1/donation/create',
            update: 'api/v1/donation/update',
            transition: 'api/v1/donation/transition',
        },
        donationDistribution: {
            get: 'api/v1/donation-distribution/get',
            list: 'api/v1/donation-distribution/list',
            create: 'api/v1/donation-distribution/create',
            update: 'api/v1/donation-distribution/update',
            delete: 'api/v1/donation-distribution/delete',
        },
    }


}