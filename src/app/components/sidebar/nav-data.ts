import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fa fa-home',
        label: 'Dashboard',
        access: 'SYSTEM ADMIN, VOLUNTEER,PARTNER ADMIN'
    },
    {
        routeLink: 'opportunities-tracking',
        icon: 'fa fa-area-chart',
        label: 'Track Opportunities',
        access: 'SYSTEM ADMIN, VOLUNTEER'
    },
    {
        routeLink: 'track-hours',
        icon: 'fa fa-line-chart',
        label: 'Track Hours',
        access: 'SYSTEM ADMIN, VOLUNTEER'
    },
    {
        routeLink: 'disasters-list',
        icon: 'fa fa-list',
        label: 'Disaster Management',
        access: 'SYSTEM ADMIN'
    },
    {
        routeLink: 'donor-management',
        icon: 'fa fa-list',
        label: 'Donor Management',
        access: 'SYSTEM ADMIN'
    },
    {
        routeLink: 'donations',
        icon: 'fa fa-list',
        label: 'Donations',
        access: 'SYSTEM ADMIN, PARTNER ADMIN'
    },
    {
        routeLink: 'donation-distribution',
        icon: 'fa fa-list',
        label: 'Donations Management',
        access: 'SYSTEM ADMIN, PARTNER ADMIN'
    },
    {
        routeLink: 'opportunities-posting',
        icon: 'fa fa-list-alt',
        label: 'Post Opportunities',
        access: 'SYSTEM ADMIN'
    },
    {
        routeLink: 'contact-list',
        icon: 'fa fa-comments',
        label: 'Contacts',
        access: 'SYSTEM ADMIN'
    },
    {
        routeLink: 'testimonial-list',
        icon: 'fa fa-commenting',
        label: 'Testimonials',
        access: 'SYSTEM ADMIN'
    },
    {
        routeLink: 'role',
        icon: 'fa fa-users',
        label: 'Role Management',
        access: 'SYSTEM ADMIN'
    },
    {
        routeLink: 'admin-management',
        icon: 'fa fa-user-plus',
        label: 'Admin Management',
        access: 'SYSTEM ADMIN'
    },

];