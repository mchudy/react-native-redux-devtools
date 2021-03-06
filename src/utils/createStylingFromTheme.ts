import { createStyling, invertTheme } from 'react-base16-styling';
import rgba from 'hex-rgba';
import * as reduxThemes from 'redux-devtools-themes';
import { StyleSheet, Platform } from 'react-native';

const MONOSPACE_FONT = Platform.OS === 'android' ? 'monospace' : 'Menlo';

const colorMap = (theme: any) => ({
  TEXT_COLOR: theme.base06,
  TEXT_PLACEHOLDER_COLOR: rgba(theme.base06, 60),
  BACKGROUND_COLOR: theme.base00,
  SELECTED_BACKGROUND_COLOR: rgba(theme.base03, 20),
  SKIPPED_BACKGROUND_COLOR: rgba(theme.base03, 10),
  HEADER_BACKGROUND_COLOR: rgba(theme.base03, 30),
  HEADER_BORDER_COLOR: rgba(theme.base03, 20),
  BORDER_COLOR: rgba(theme.base03, 50),
  LIST_BORDER_COLOR: rgba(theme.base03, 50),
  ACTION_TIME_BACK_COLOR: rgba(theme.base03, 20),
  ACTION_TIME_COLOR: theme.base04,
  PIN_COLOR: theme.base04,
  ITEM_HINT_COLOR: rgba(theme.base0F, 90),
  TAB_BACK_SELECTED_COLOR: rgba(theme.base03, 20),
  TAB_BACK_COLOR: rgba(theme.base00, 70),
  TAB_BACK_HOVER_COLOR: rgba(theme.base03, 40),
  TAB_BORDER_COLOR: rgba(theme.base03, 50),
  DIFF_ADD_COLOR: rgba(theme.base0B, 40),
  DIFF_REMOVE_COLOR: rgba(theme.base08, 40),
  DIFF_ARROW_COLOR: theme.base0E,
  LINK_COLOR: rgba(theme.base0E, 90),
  LINK_HOVER_COLOR: theme.base0E,
  ERROR_COLOR: theme.base08
});

const getSheetFromColorMap = (map: ReturnType<typeof colorMap>) => ({
  inspector: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: map.BORDER_COLOR,
    backgroundColor: map.BACKGROUND_COLOR
  },

  actionListItemSeparator: {
    backgroundColor: map.LIST_BORDER_COLOR,
    height: StyleSheet.hairlineWidth
  },

  actionListHeader: {
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 2,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: map.LIST_BORDER_COLOR
  },

  actionListHeaderButtonContainer: {
    flexDirection: 'row'
  },

  actionListHeaderSelector: {
    marginRight: 10
  },

  actionListHeaderPlaceholder: {
    color: map.TEXT_PLACEHOLDER_COLOR
  },

  actionListItem: {
    paddingHorizontal: 5,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },

  actionListItemSelected: {
    backgroundColor: map.SELECTED_BACKGROUND_COLOR
  },

  actionListItemSkipped: {
    backgroundColor: map.SKIPPED_BACKGROUND_COLOR
  },

  actionListFromFuture: {
    opacity: 0.6
  },

  actionListItemSelector: {
    flexDirection: 'row'
  },

  actionListItemName: {
    color: map.TEXT_COLOR,
    flex: 1,
    fontFamily: MONOSPACE_FONT,
    fontSize: 11
  },

  actionListItemTimeContainer: {
    borderRadius: 3,
    backgroundColor: map.ACTION_TIME_BACK_COLOR,
    padding: 3
  },

  actionListItemTimeText: {
    color: map.ACTION_TIME_COLOR,
    fontSize: 10,
    fontFamily: MONOSPACE_FONT
  },

  actionPreviewContainer: {
    flex: 1
  },

  actionListItemNameSkipped: {
    textDecorationLine: 'line-through',
    opacity: 0.5
  },

  actionListHeaderSearch: {
    padding: 2,
    fontSize: 12,
    fontFamily: MONOSPACE_FONT,
    backgroundColor: map.BACKGROUND_COLOR,
    color: map.TEXT_COLOR
  },

  stateDiffEmpty: {
    padding: 10,
    color: map.TEXT_PLACEHOLDER_COLOR
  },

  stateError: {
    padding: 10,
    fontFamily: MONOSPACE_FONT,
    fontWeight: 'bold',
    marginLeft: 14,
    color: map.ERROR_COLOR
  },

  treeItemKey: {
    fontFamily: MONOSPACE_FONT,
    fontSize: 12
  },

  previewHeader: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: map.HEADER_BACKGROUND_COLOR,
    borderBottomColor: map.HEADER_BORDER_COLOR,
    flexDirection: 'row'
  },

  selectorButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderLeftWidth: 0,
    backgroundColor: map.TAB_BACK_COLOR,
    borderColor: map.TAB_BORDER_COLOR
  },

  selectorButtonFirst: {
    borderLeftWidth: 1,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3
  },

  selectorButtonLast: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3
  },

  selectorButtonText: {
    fontFamily: MONOSPACE_FONT,
    color: map.TEXT_COLOR,
    fontSize: 12
  },

  selectorButtonTextSmall: {
    fontFamily: MONOSPACE_FONT,
    color: map.TEXT_COLOR,
    fontSize: 10
  },

  selectorButtonSelected: {
    backgroundColor: map.TAB_BACK_SELECTED_COLOR
  },

  selectorButtonSmall: {
    paddingHorizontal: 5,
    paddingVertical: 2
  },

  diffWrap: {
    zIndex: 1
  },

  diffAdd: {
    fontFamily: MONOSPACE_FONT,
    color: map.TEXT_COLOR,
    backgroundColor: map.DIFF_ADD_COLOR
  },

  diffRemove: {
    color: map.TEXT_COLOR,
    fontFamily: MONOSPACE_FONT,
    textDecorationLine: 'line-through',
    backgroundColor: map.DIFF_REMOVE_COLOR
  },

  diffUpdateFrom: {
    color: map.TEXT_COLOR,
    fontFamily: MONOSPACE_FONT,
    textDecorationLine: 'line-through',
    backgroundColor: map.DIFF_REMOVE_COLOR
  },

  diffUpdateTo: {
    color: map.TEXT_COLOR,
    fontFamily: MONOSPACE_FONT,
    backgroundColor: map.DIFF_ADD_COLOR
  },

  diffUpdateArrow: {
    fontFamily: MONOSPACE_FONT,
    color: map.DIFF_ARROW_COLOR
  }
});

const getDefaultThemeStyling = (theme: string) => {
  const themeSheet = getSheetFromColorMap(colorMap(theme));
  return StyleSheet.create(themeSheet as any);
};

export const base16Themes = reduxThemes;

export const createStylingFromTheme = createStyling(getDefaultThemeStyling, {
  defaultBase16: (reduxThemes as any).nicinabox,
  reduxThemes
});
