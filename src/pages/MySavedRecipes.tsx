import Layout from "@/layout/Layout";
import {
  Box,
  Button,
  CheckboxProps,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  PaperProps,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { AccountEntity } from "@/lib/models/entities/AccountEntity/AccountEntity";
import AccountService from "@/lib/services/accountService";
import { CookBookEntity } from "@/lib/models/entities/CookBookEntity/CookBookEntity";
import { CookBook_RecipeEntity } from "@/lib/models/entities/CookBook_RecipeEntity/CookBook_RecipeEntity";
import CookbookService from "@/lib/services/cookbookService";
import CookbookRecipeService from "@/lib/services/cookbookRecipeService";
import { PrimaryCard } from "@/components/common/card/PrimaryCard";
import {
  AddCircleOutlineRounded,
  BookmarkBorderRounded,
  DeleteRounded,
  DriveFileRenameOutlineRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useFirebaseImage from "@/lib/hooks/useFirebaseImage";

type CookbookChoosingType = {
  Cookbook: CookBookEntity;
  CookbookRecipes: CookBook_RecipeEntity[];
};

const DialogPaperProps: PaperProps = {
  sx: {
    borderRadius: 4,
    p: 2,
    pt: 1,
  },
};

function MySavedRecipes() {
  const [accountData, setAccountData] = React.useState<
    AccountEntity | undefined
  >(undefined);

  const navigate = useNavigate();

  const [cookbookData, setCookbookData] = useState<CookBookEntity[]>([]);

  const [choosing, setChoosing] = useState<CookbookChoosingType | undefined>(
    undefined
  );

  async function handleChoosing(cookbook: CookBookEntity) {
    const recipes = await CookbookRecipeService.GetCookbookRecipesByCookbookId(
      cookbook.id
    );
    setChoosing({
      Cookbook: cookbook,
      CookbookRecipes: recipes,
    });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const account = await AccountService.GetByUid("1");

        setAccountData(account);

        const cookbooks = await CookbookService.GetCookbooksByAccountId(
          account.uid
        );
        setCookbookData(cookbooks);
        if (cookbooks.length > 0) {
          handleChoosing(cookbooks[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout withFooter={false}>
      <Container>
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={3}
          sx={{
            width: "100%",
            py: 3,
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ width: "100%" }}
            gap={2}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "900",
                textTransform: "uppercase",
                flexGrow: 1,
              }}
            >
              Bộ sưu tập
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddCircleOutlineRounded />}
              color="primary"
              sx={{ pr: 4, pl: 3, boxShadow: "none" }}
              onClick={() => {
                navigate("/recipe/create");
              }}
            >
              <Typography variant="caption" fontWeight={"bold"} color={"white"}>
                Tạo công thức
              </Typography>
            </Button>
          </Stack>

          <Box sx={{ width: "100%" }}>
            <Grid
              container
              spacing={2}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              {cookbookData.map((item, i) => (
                <Grid item xs={3.6} md={2.4} lg={1.2} key={i}>
                  <CookBook
                    cookbook={item}
                    choosing={choosing}
                    handleChoosing={handleChoosing}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box
            sx={{
              width: "100%",
            }}
          >
            <Grid
              container
              spacing={2}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
            >
              {choosing?.CookbookRecipes.length > 0 &&
                choosing?.CookbookRecipes.map((item, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <CustomCard cookbookRecipe={item} />
                  </Grid>
                ))}
            </Grid>
          </Box>

          {choosing?.CookbookRecipes.length == 0 && (
            <Stack
              direction={"column"}
              gap={3}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                width: "40%",
              }}
            >
              <Box
                component={"img"}
                src="https://www.sidechef.com/static/images/3feb6c9a2065479a6792.png"
                sx={{
                  width: "100%",

                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
              <Typography
                variant="body1"
                fontWeight={"bold"}
                sx={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Lưu ngay công thức đầu tiên!
              </Typography>

              <Typography
                variant="body1"
                fontWeight={"light"}
                sx={{
                  width: "100%",
                  color: "grey.600",
                  textAlign: "center",
                }}
              >
                Nhấn vào icon
                <IconButton
                  size="small"
                  sx={{
                    border: 1,
                    mx: 1,
                    pointerEvents: "none",
                    color: "black",
                  }}
                >
                  <BookmarkBorderRounded fontSize="small" />
                </IconButton>
                trên mỗi thẻ công thức để lưu!
              </Typography>

              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "80%",
                }}
                onClick={() => {
                  navigate("/search");
                }}
              >
                Tìm công thức
              </Button>
            </Stack>
          )}
        </Stack>
      </Container>
    </Layout>
  );
}

export default MySavedRecipes;

function CookBook({
  cookbook,
  choosing,
  handleChoosing,
}: {
  cookbook: CookBookEntity;
  choosing: CookbookChoosingType | undefined;
  handleChoosing: (cookbook: CookBookEntity) => void;
}) {
  const color = useMemo(() => {
    if (cookbook.id == choosing?.Cookbook.id) {
      return "primary.main";
    } else {
      return "grey.400";
    }
  }, [choosing]);

  const image = useFirebaseImage(
    choosing?.CookbookRecipes[0]?.RecipeEntity?.image
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenuContext = Boolean(anchorEl);
  const handleRightClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleCloseRightClick = () => {
    setAnchorEl(null);
  };

  const [openRenameDialog, setOpenRenameDialog] = React.useState(false);
  const handleOpenRenameDialog = () => setOpenRenameDialog(true);
  const handleCloseRenameDialog = () => setOpenRenameDialog(false);
  const [renameValue, setRenameValue] = React.useState(cookbook.name);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  return (
    <Box
      component={"div"}
      id={cookbook.id.toString()}
      sx={{
        cursor: "pointer",
      }}
      onContextMenu={handleRightClick}
    >
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1/1",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: 3,
          borderColor: color,
        }}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          if (event.type == "click") {
            handleChoosing(cookbook);
          }
        }}
      >
        <Box
          component={"img"}
          src={image}
          sx={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            aspectRatio: "1/1",
            borderRadius: "50%",
            border: 3,
            borderColor: "white",
          }}
        />
      </Box>

      <Typography
        variant="body2"
        fontWeight={"bold"}
        sx={{
          width: "100%",
          textAlign: "center",
          py: 0.5,
          color: color,
        }}
        whiteSpace={"nowrap"}
        textOverflow={"ellipsis"}
        overflow={"hidden"}
      >
        {cookbook.name}
      </Typography>

      <Menu
        anchorEl={anchorEl}
        open={openMenuContext}
        onClose={handleCloseRightClick}
        slotProps={{
          paper: {
            sx: {
              background: "white",
              borderRadius: 4,
              width: "200px",
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleOpenRenameDialog();
            handleCloseRightClick();
          }}
        >
          <ListItemIcon>
            <DriveFileRenameOutlineRounded color="primary" fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" color="primary" fontWeight={"bold"}>
            Đổi tên
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenDelete();
            handleCloseRightClick();
          }}
        >
          <ListItemIcon>
            <DeleteRounded color="error" fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" color="error" fontWeight={"bold"}>
            Xóa
          </Typography>
        </MenuItem>
      </Menu>

      <Dialog
        open={openRenameDialog}
        onClose={handleCloseRenameDialog}
        PaperProps={{
          ...DialogPaperProps,
        }}
      >
        <DialogTitle>Đổi tên</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              sx={{ width: "100%" }}
              placeholder="Tên bộ sưu tập"
              variant="outlined"
              value={renameValue}
              onChange={(event) => {
                setRenameValue(event.target.value);
              }}
              InputProps={{
                sx: {
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              width: "150px",
            }}
            size="small"
            variant="outlined"
            onClick={handleCloseRenameDialog}
          >
            Hủy
          </Button>
          <Button
            sx={{
              width: "150px",
            }}
            size="small"
            variant="contained"
            onClick={handleCloseRenameDialog}
            autoFocus
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        PaperProps={{
          ...DialogPaperProps,
        }}
      >
        <DialogTitle>Bạn chắc chắn muốn xóa?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Các công thức đã lưu trong bộ sưu tập sẽ bị xóa!
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              width: "150px",
            }}
            size="small"
            variant="outlined"
            onClick={handleCloseDelete}
          >
            Hủy
          </Button>
          <Button
            sx={{
              width: "150px",
            }}
            size="small"
            variant="contained"
            color="error"
            onClick={handleCloseDelete}
            autoFocus
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function CustomCard({
  cookbookRecipe,
}: {
  cookbookRecipe: CookBook_RecipeEntity;
}) {
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const checkboxProps: CheckboxProps = {
    checked: true,
    onClick: () => {
      handleOpenDelete();
    },
  };

  return (
    <>
      <PrimaryCard
        recipe={cookbookRecipe.RecipeEntity}
        saveCheckBoxProps={checkboxProps}
      />

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        PaperProps={{
          ...DialogPaperProps,
        }}
      >
        <DialogTitle>
          <Typography variant="body1" fontWeight={"bold"} textAlign={"center"}>
            Bạn muốn xóa công thức?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Công thức sẽ bị xóa khỏi bộ sưu tập {cookbookRecipe.cook_book.name}!
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              width: "150px",
            }}
            size="small"
            variant="outlined"
            onClick={handleCloseDelete}
          >
            Hủy
          </Button>
          <Button
            sx={{
              width: "150px",
            }}
            size="small"
            variant="contained"
            color="error"
            onClick={handleCloseDelete}
            autoFocus
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
