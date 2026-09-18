import SearchIcon from "@mui/icons-material/Search";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SearchPage from "./SearchPage";
import TrackedPage from "./TrackedPage";

export const PAGES = {
  search: { label: "Search", icon: SearchIcon, Component: SearchPage },
  tracked: { label: "Tracked", icon: BookmarksIcon, Component: TrackedPage },
} as const;

export type PageKey = keyof typeof PAGES;
