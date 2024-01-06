import { Link, Skeleton } from '@mui/material';

export function CustomHeaderLink({
  href,
  label,
  color,
}: {
  href: string;
  label: string;
  color?: string;
}) {
  return (
    <>
      <Link
        color={color ?? 'primary'}
        variant="subtitle2"
        href={href}
        underline="none"
        textTransform={'uppercase'}
        sx={{
          opacity: 0.9,
          '&:hover': {
            opacity: 1,
          },
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        {label}
      </Link>
    </>
  );
}

export function CustomLink({
  href,
  label,
  color,
  my,
  fontStyle,
}: {
  href: string;
  label: string;
  color?: string;
  my?: number;
  fontStyle?: string;
}) {
  return (
    <>
      <Link
        href={href}
        color={color ?? 'primary'}
        underline="hover"
        sx={{
          display: 'block',
          my: my ?? 1,
          fontStyle: fontStyle ?? 'normal',
        }}
        variant="body2"
      >
        {label}
      </Link>
    </>
  );
}

export function CustomLinkSkeleton() {
  return (
    <Skeleton
      sx={{
        fontSize: 'h6.fontSize',
      }}
      width="100%"
    />
  );
}
