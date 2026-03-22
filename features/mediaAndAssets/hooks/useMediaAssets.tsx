"use client";

import useAssetCreation from "./useAssetCreation";
import useAssetEditing from "./useAssetEditing";
import useAssetUpload from "./useAssetUpload";
import useAssetClipboard from "./useAssetClipboard";
import useMediaAssetsState from "./useMediaAssetsState";
import useError from "./useError";
import useAssetPaths from "./useAssetPaths";
import useAssetsSearchToolBar from "./useAssetsSearchToolBar";

export default function useMediaAssets() {
  const state = useMediaAssetsState();

  const creation = useAssetCreation();
  const editing = useAssetEditing();
  const upload = useAssetUpload();
  const clipboard = useAssetClipboard();
  const errors = useError();
  const paths = useAssetPaths();
  const searchToolBar = useAssetsSearchToolBar();

  return {
    state,
    actions: {
      ...creation,
      ...editing,
      ...upload,
      ...clipboard,
      ...errors,
      ...paths,
      ...searchToolBar,
    },
  };
}
