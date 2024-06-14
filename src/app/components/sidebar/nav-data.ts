import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: '/assets/img/fi-ss-home.png',
        label: 'Dashboard'
    },

    {
        routeLink: 'products',
        icon: '/assets/img/fi-ss-box-alt.png',
        label: 'Products',
        expanded: false,
        items: [
            {
                routeLink: 'products/product',
                label: 'Product',
            },
            {
                routeLink: 'products/sector',
                label: 'Sector',
            },
            {
                routeLink: 'products/sectorproduct',
                label: 'Sector Product',
            },
            {
                routeLink: 'products/sopraproduct',
                label: 'Sopra Product',
            },
            {
                routeLink: 'products/loanproduct',
                label: 'Loan Product',
            },
        ]
    },
    {
        routeLink: 'partners',
        icon: '/assets/img/fi-ss-building.png',
        label: 'Partners',
        expanded: false,
        items: [
            {
                routeLink: 'partners/partner',
                label: 'Partner',
            },
            {
                routeLink: 'partners/season',
                label: 'Season',
            },
            {
                routeLink: 'partners/cooperative',
                label: 'Map Cooperative',
            },
        ]
    },
    {
        routeLink: 'settings',
        icon: '/assets/img/fi-ss-star.png',
        label: 'Settings',
        expanded: false,
        items: [
            {
                routeLink: 'settings/units',
                label: 'Units',

            },
            {
                routeLink: 'settings/users',
                label: 'Users',
            },
            {
                routeLink: 'settings/roles',
                label: 'Roles',
            },
            {
                routeLink: 'settings/permissions',
                label: 'Permissions',
            }
        ]
    },


];