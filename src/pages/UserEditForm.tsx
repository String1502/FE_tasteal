import { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Grid,
} from "@mui/material";
import UserService from "../lib/services/userService"; // Adjust the import path based on your project structure

const UserEditForm = ({
  name: initialName,
  image: initialImage,
  description: initialDescription,
  philosophy: initialPhilosophy,
  website: initialWebsite,
  slogan: initialSlogan,
  onSave,
  onCancel,
  uid, // Make sure you have uid available from the props
}) => {
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [description, setDescription] = useState(initialDescription);
  const [philosophy, setPhilosophy] = useState(initialPhilosophy);
  const [website, setWebsite] = useState(initialWebsite);
  const [slogan, setSlogan] = useState(initialSlogan);

  const handleSave = async () => {
    try {
      // Call the updateUser function with the correct structure
      await UserService.updateUser({
        uid,
        name,
        avatar: image,
        introduction: description,
        link: website,
        slogan,
        quote: philosophy,
      });
  
      // Call the onSave function if the updateUser request is successful
      onSave({
        name,
        image,
        description,
        philosophy,
        website,
        slogan,
      });
    } catch (error) {
      // Log any errors that occur during the updateUser request
      console.error('Error updating user:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={true} onClose={onCancel} sx={{ borderRadius: "12px" }}>
      <Box sx={{ padding: 2 }}>
        <DialogTitle>CHỈNH SỬA THÔNG TIN NGƯỜI DÙNG</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5} sx={{mt:"15px"}}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e)}
                style={{ display: "none" }}
                id="upload-image-input"
              />
              <label htmlFor="upload-image-input">
                {image ? (
                  <img
                    src={image}
                    alt="Hình ảnh hiện tại"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      border: "2px dashed #ccc",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span>Thay đổi ảnh đại diện</span>
                  </div>
                )}
              </label>
              <Button
                variant="outlined"
                component="label"
                htmlFor="upload-image-input"
                sx={{ marginTop: "10px", width: "100%" }}
              >
                Thay đổi ảnh đại diện
              </Button>
            </Grid>
            <Grid item xs={12} md={7}>
              <TextField
                label="Tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Triết lý"
                value={philosophy}
                onChange={(e) => setPhilosophy(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Slogan"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} variant="contained" color="primary">
            Lưu lại
          </Button>
          <Button
            onClick={onCancel}
            variant="outlined"
            sx={{ backgroundColor: "white", color: "black" }}
          >
            Hủy bỏ
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default UserEditForm;