import React from "react";
import { GridItem, Box } from "@chakra-ui/react";
import BoxText from "./BoxText";

interface CustomGridItemProps {
  borderText: string;
  children: React.ReactNode;
}

const CustomGridItem: React.FC<CustomGridItemProps> = ({
  borderText,
  children
}) => (
  <GridItem>
    <Box border="solid 1px" borderColor="gray.800" position="relative" p="4">
      <BoxText {...{ borderText }} />
      {children}
    </Box>
  </GridItem>
);

export default CustomGridItem;
