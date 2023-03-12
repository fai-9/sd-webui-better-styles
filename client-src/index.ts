import { _, getElement, hidden, withBooleanOption } from "./utils";
import { getCurrentTabName } from "./webui";
import { imagesDir, styleGroups } from "./variables";
import { createBetterStylesComponents, updateBetterStyleComponents } from "./betterStyles";

let fetchLocalization: Promise<void> | null = null;
let fetchStylesPromise: Promise<void> | null = null;
let fetchImagesDirPromise: Promise<void> | null = null;

onUiLoaded(() => {
  const timestamp = new Date().getTime();

  fetchLocalization = fetch(`/better-style-api/v1/get-localization?ts=${timestamp}`)
    .then((response) => response.json())
    .then((json) => {
      Object.assign(localization, json);
      return Promise.resolve();
    });

  fetchImagesDirPromise = fetch(`/better-style-api/v1/images-dir?ts=${timestamp}`)
    .then((response) => response.json())
    .then((json) => {
      imagesDir.set(json.imagesDir);
      return Promise.resolve();
    });

  fetchStylesPromise = fetch(`/better-style-api/v1/all-style?ts=${timestamp}`)
    .then((response) => response.json())
    .then((json) => {
      styleGroups.set(json);
      return Promise.resolve();
    });
});

onUiTabChange(() => {
  const activeTab = getCurrentTabName();
  if (activeTab !== "other") {
    initializeBetterStyles(activeTab);
  }
});

/**
 * Initialize Better Styles, including adding components and event listeners.
 * @param tabName Name of the tab on which Better Styles will be initialized.
 */
function initializeBetterStyles(tabName: StylesAvailableTab) {
  hiddenOrigianlStylesComponents(tabName);

  Promise.all([fetchLocalization]).then(() => {
    createBetterStylesComponents(tabName);
  });

  Promise.all([fetchImagesDirPromise, fetchStylesPromise]).then(() => {
    updateBetterStyleComponents(tabName);
  });
}

/**
 * Hides original style components in the specified tab.
 * @param tabName - The name of the tab to hide original style components from.
 */
function hiddenOrigianlStylesComponents(tabName: StylesAvailableTab) {
  withBooleanOption("better_styles_hide_original_styles", (value) => {
    if (value) {
      hidden(getElement(`#${tabName}_style_apply`), true);
      hidden(getElement(`#${tabName}_style_create`), true);
      hidden(getElement(`#${tabName}_styles_row`), true);
    }
  });
}

export {};
