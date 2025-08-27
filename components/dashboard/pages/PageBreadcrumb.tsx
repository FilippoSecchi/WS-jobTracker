import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';

interface BreadcrumbLinkItem {
  label: string;
  href: string;
}

interface PageBreadcrumbProps {
  links?: BreadcrumbLinkItem[];
}

export function PageBreadcrumb({ links }: PageBreadcrumbProps) {
  return (
    <>
      <div className='py-2'>
        {links && links.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList>
              {links.map((link, idx) => (
                <React.Fragment key={idx}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={link.href}>
                      {link.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {idx < links.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>
      <Separator className='mt-8 mb-6' />
    </>
  );
}

export default PageBreadcrumb;
