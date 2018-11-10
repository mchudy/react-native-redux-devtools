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
  ERROR_COLOR: theme.base08,
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

  // actionList: {
  //   'flex-basis': '40%',
  //   'flex-shrink': 0,
  //   'overflow-x': 'hidden',
  //   'overflow-y': 'auto',
  //   'border-bottom-width': '3px',
  //   'border-bottom-style': 'double',
  //   display: 'flex',
  //   'flex-direction': 'column',

  //   'background-color': map.BACKGROUND_COLOR,
  //   'border-color': map.LIST_BORDER_COLOR
  // },

  // actionListHeader: {
  //   display: 'flex',
  //   flex: '0 0 auto',
  //   'align-items': 'center',
  //   'border-bottom-width': '1px',
  //   'border-bottom-style': 'solid',

  //   'border-color': map.LIST_BORDER_COLOR
  // },

  // actionListRows: {
  //   overflow: 'auto'
  // },

  // actionListHeaderSelector: {
  //   display: 'inline-flex',
  //   'margin-right': '10px'
  // },

  actionListItem: {
    paddingHorizontal: 5,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },

  // actionListItemSelected: {
  //   'background-color': map.SELECTED_BACKGROUND_COLOR
  // },

  // actionListItemSkipped: {
  //   'background-color': map.SKIPPED_BACKGROUND_COLOR
  // },

  // actionListFromFuture: {
  //   opacity: '0.6'
  // },

  // actionListItemButtons: {
  //   position: 'relative',
  //   height: '20px',
  //   display: 'flex'
  // },

  // actionListItemTime: {
  //   display: 'inline',
  //   padding: '4px 6px',
  //   'border-radius': '3px',
  //   'font-size': '0.8em',
  //   'line-height': '1em',
  //   'flex-shrink': 0,

  //   'background-color': map.ACTION_TIME_BACK_COLOR,
  //   color: map.ACTION_TIME_COLOR
  // },

  // actionListItemSelector: {
  //   display: 'inline-flex'
  // },

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
    minHeight: 150
  },

  // actionListItemNameSkipped: {
  //   'text-decoration': 'line-through',
  //   opacity: 0.3
  // },

  // actionListHeaderSearch: {
  //   outline: 'none',
  //   border: 'none',
  //   width: '100%',
  //   padding: '5px 10px',
  //   'font-size': '1em',
  //   'font-family': 'monaco, Consolas, "Lucida Console", monospace',

  //   'background-color': map.BACKGROUND_COLOR,
  //   color: map.TEXT_COLOR,

  //   '&::-webkit-input-placeholder': {
  //     color: map.TEXT_PLACEHOLDER_COLOR
  //   },

  //   '&::-moz-placeholder': {
  //     color: map.TEXT_PLACEHOLDER_COLOR
  //   }
  // },

  // actionListHeaderWrapper: {
  //   position: 'relative',
  //   height: '20px'
  // },

  // actionPreview: {
  //   flex: 1,
  //   display: 'flex',
  //   'flex-direction': 'column',
  //   'flex-grow': 1,
  //   'overflow-y': 'hidden',

  //   '& pre': {
  //     border: 'inherit',
  //     'border-radius': '3px',
  //     'line-height': 'inherit',
  //     color: 'inherit'
  //   },

  //   'background-color': map.BACKGROUND_COLOR,
  // },

  // actionPreviewContent: {
  //   flex: 1,
  //   'overflow-y': 'auto'
  // },

  // stateDiff: {
  //   padding: '5px 0'
  // },

  // stateDiffEmpty: {
  //   padding: '10px',

  //   color: map.TEXT_PLACEHOLDER_COLOR
  // },

  // stateError: {
  //   padding: '10px',
  //   'margin-left': '14px',
  //   'font-weight': 'bold',

  //   color: map.ERROR_COLOR
  // },

  // inspectedPath: {
  //   padding: '6px 0'
  // },

  // inspectedPathKey: {
  //   '&:not(:last-child):after': {
  //     content: '" > "'
  //   }
  // },

  // inspectedPathKeyLink: {
  //   cursor: 'pointer',
  //   '&:hover': {
  //     'text-decoration': 'underline'
  //   },

  //   color: map.LINK_COLOR,
  //   // '&:hover': {
  //   //   color: map.LINK_HOVER_COLOR
  //   // }
  // },

  // treeItemPin: {
  //   'font-size': '0.7em',
  //   'padding-left': '5px',
  //   cursor: 'pointer',
  //   '&:hover': {
  //     'text-decoration': 'underline'
  //   },

  //   color: map.PIN_COLOR
  // },

  // treeItemHint: {
  //   color: map.ITEM_HINT_COLOR
  // },

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
  selectorButtonSelected: {
    backgroundColor: map.TAB_BACK_SELECTED_COLOR
  },

  // diff: {
  //   padding: '2px 3px',
  //   'border-radius': '3px',
  //   position: 'relative',

  //   color: map.TEXT_COLOR
  // },

  // diffWrap: {
  //   position: 'relative',
  //   'z-index': 1
  // },

  // diffAdd: {
  //   'background-color': map.DIFF_ADD_COLOR
  // },

  // diffRemove: {
  //   'text-decoration': 'line-through',
  //   'background-color': map.DIFF_REMOVE_COLOR
  // },

  // diffUpdateFrom: {
  //   'text-decoration': 'line-through',
  //   'background-color': map.DIFF_REMOVE_COLOR
  // },

  // diffUpdateTo: {
  //   'background-color': map.DIFF_ADD_COLOR
  // },

  // diffUpdateArrow: {
  //   color: map.DIFF_ARROW_COLOR
  // },

  // rightSlider: {
  //   'font-smoothing': 'subpixel-antialiased', // http://stackoverflow.com/a/21136111/4218591
  //   position: 'absolute',
  //   right: 0,
  //   transform: 'translateX(150%)',
  //   transition: 'transform 0.2s ease-in-out'
  // },

  // rightSliderRotate: {
  //   transform: 'rotateX(90deg)',
  //   transition: 'transform 0.2s ease-in-out 0.08s'
  // },

  // rightSliderShown: {
  //   position: 'static',
  //   transform: 'translateX(0)',
  // },

  // rightSliderRotateShown: {
  //   transform: 'rotateX(0)',
  //   transition: 'transform 0.2s ease-in-out 0.18s'
  // }
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
