import { useState, useEffect } from "react";
import { ReactComponent as TimescaleLogo } from "../assets/logo.svg";
import Selected from "./Selected";
import Available from "./Available";
import { Grid, GridItem } from "@chakra-ui/react";

import RECIPIENTS from "../assets/recipientsData.json";
import { InitialState, EmailsContext } from "../state/emails";

const App = () => {
  const [state, setState] = useState(InitialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setState(() =>
      RECIPIENTS.reduce(
        (acc, curr) => {
          if (curr.isSelected) acc.selected.push(curr.email);
          else acc.available.push(curr.email);

          return acc;
        },
        { available: [], selected: [] }
      )
    );
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <EmailsContext.Provider value={{ state, setState }}>
      <TimescaleLogo />
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap="6"
        maxW="1200px"
        mx="auto"
        my="6"
        px={{ base: "1.5rem", md: "0" }}
      >
        <GridItem>
          <Available
            {...{ borderText: "Available recipients", showSearchBar: true }}
          />
        </GridItem>
        <GridItem>
          <Selected {...{ borderText: "Selected recipients" }} />
        </GridItem>
      </Grid>
    </EmailsContext.Provider>
  );
};

export default App;
