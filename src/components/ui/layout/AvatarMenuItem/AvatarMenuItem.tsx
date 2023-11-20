import { ListItemIcon, ListItemText, MenuItem, Typography } from "@mui/material";
import { FC, useState } from "react";

export type AvatarMenuItemProps = { icon: React.ReactNode, label: string, onClick: () => void }

const AvatarMenuItem: FC<AvatarMenuItemProps> = ({ icon, label, onClick }) => {
  const [ isHovered, setIsHovered ] = useState(false);

  return (
    <MenuItem onClick={onClick} onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <ListItemIcon sx={{ transition: 'all .2s ease-in-out', transform: isHovered ? 'translate(-2px, 0)' : '' }}>
        {icon}
      </ListItemIcon>
      <ListItemText sx={{
        transition: 'all .2s ease-in-out'
      }}>
        < Typography color='black' fontWeight='bold' fontSize={12} > {label}</Typography>
      </ListItemText >
    </MenuItem >
  )
}

export default AvatarMenuItem;