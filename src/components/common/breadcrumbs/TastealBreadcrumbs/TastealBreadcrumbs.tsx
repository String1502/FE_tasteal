import { Breadcrumbs, Link } from '@mui/material';
import { FC } from 'react';

export type BreadcrumbsProps = {
    links: {
        label: string;
        href: string;
    }[];
};

export const TastealBreadCrumbs: FC<BreadcrumbsProps> = ({ links }) => {
    return (
        <Breadcrumbs>
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.href}
                >
                    {link.label}
                </Link>
            ))}
        </Breadcrumbs>
    );
};
