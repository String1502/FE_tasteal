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
        variant="subtitle1"
        fontWeight={"bold"}
        href={href}
        underline="none"
        sx={{
          opacity: 0.9,
          "&:hover": {
            opacity: 1,
          },
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