import { useState } from "react";

import "@/App.css";
import AppLayout from "@/app/AppLayout";
import { PAGES, type PageKey } from "@/pages/registry";
import Box from "@mui/material/Box";

function App() {
  const [activePage, setActivePage] = useState<PageKey>("search");

  return (
    <AppLayout activePage={activePage} onPageChange={setActivePage}>
      {(Object.keys(PAGES) as PageKey[]).map((key) => {
        const { Component } = PAGES[key];
        return (
          <Box
            key={key}
            sx={{ display: key === activePage ? "block" : "none" }}
          >
            <Component />
          </Box>
        );
      })}
    </AppLayout>
  );
}

export default App;
