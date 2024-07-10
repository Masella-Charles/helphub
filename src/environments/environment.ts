

export const environment = {
    production: false,
    base_url: 'http://localhost:8080/',


    endpoint: {
        users: {
            signUp: 'auth/signup',
            login: 'auth/login',
            profile: 'users/profile'
        },
        roles: {
            listAll: 'api/v1/roles/listAll',
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
            transition: 'api/v1/opportunityUser/transition',
        },
        testimonials: {
            get: 'api/v1/testimonial/get',
            list: 'api/v1/testimonial/list',
            create: 'api/v1/testimonial/create',
            update: 'api/v1/testimonial/update',
            transition: 'api/v1/testimonial/transition',
            delete: 'api/v1/testimonial/delete',
        },
    }


}