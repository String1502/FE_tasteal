import { Link } from "@mui/material";

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
        color={color ?? "primary"}
        variant="subtitle2"
        href={href}
        underline="none"
        textTransform={"uppercase"}
        sx={{
          opacity: 0.9,
          "&:hover": {
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
}: {
  href: string;
  label: string;
  color?: string;
  my?: number;
}) {
  return (
    <>
      <Link
        href={href}
        color={color ?? "primary"}
        underline="hover"
        sx={{
          display: "block",
          my: my ?? 1,
        }}
        variant="body2"
      >
        {label}
      </Link>
    </>
  );
}
