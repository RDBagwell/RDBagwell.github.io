import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> & {
  href: string;
  children: ReactNode;
};

/** A link that leaves the site. Always opens in a new tab with noopener/noreferrer. */
export default function ExternalLink({ children, ...props }: Props) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
