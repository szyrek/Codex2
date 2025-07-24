# Docs view layout

## Issue
The documentation dropdown overlapped with interface buttons and the list of files consumed too much vertical space, forcing users to scroll for content.

## Root cause
`DocsView` stacked the version select, file list and preview in a single column starting near the page top. Absolute positioning of other UI elements put them on top of the dropdown.

## Fix
`DocsView` now uses a flex layout with a left sidebar. The version selector sits at the top of this sidebar followed by the file list. The main content area occupies the remaining space without interference.

## References
- Implementation commit
- [practices/BUGFIX.md](../../practices/BUGFIX.md)
