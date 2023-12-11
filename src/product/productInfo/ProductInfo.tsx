import {
  Box,
  Chip,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectProductInfo } from "../productSlice";
import styled from "@emotion/styled";
import { Fragment } from "react";
import { grey } from "@mui/material/colors";

const ImageContainer = styled(Box)`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
`;

const SquareImage = styled("img")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; // This ensures the image covers the entire container while maintaining its aspect ratio
`;

const loadingTags = new Array(5).fill(null);

export default function ProductInfo() {
  const productInfo = useSelector(selectProductInfo);
  const { image, subtitle, tags = loadingTags, title } = productInfo;
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0,
        height: "inherit",
      }}
    >
      {/* Image Section */}
      <Box display="flex" justifyContent="center" padding="15px">
        <ImageContainer>
          {image ? (
            <SquareImage src={image} alt={title} />
          ) : (
            <Skeleton
              height="100%"
              style={{ position: "absolute", top: 0, left: 0 }}
              variant="rectangular"
              width="100%"
            />
          )}
        </ImageContainer>
      </Box>

      {/* Title and Subtitle */}
      <Stack spacing={1} sx={{ padding: "30px" }}>
        {title ? (
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {title}
          </Typography>
        ) : (
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="40%" />
        )}
        {subtitle ? (
          <Typography sx={{ textAlign: "center", color: grey[600] }}>
            {subtitle}
          </Typography>
        ) : (
          <Fragment>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="60%" />
          </Fragment>
        )}
      </Stack>

      <Divider />

      {/* Tags */}
      <Box padding="15px 15px 0 15px" display="flex" flexWrap="wrap">
        {tags.map((tag, index) =>
          tag ? (
            <Chip
              key={tag}
              label={tag}
              variant="outlined"
              sx={{
                borderRadius: "4px",
                color: grey[600],
                margin: "0 15px 15px 0",
              }}
            />
          ) : (
            <Skeleton
              key={index}
              sx={{
                height: "37px",
                transform: "unset",
                margin: "0 15px 15px 0",
                width: `${Math.floor(Math.random() * (90 - 50 + 1)) + 50}px`,
              }}
              variant="text"
            />
          )
        )}
      </Box>
      <Divider />
    </Paper>
  );
}
