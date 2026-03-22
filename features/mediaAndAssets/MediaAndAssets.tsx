"use client";

import { MediaAssetsView } from "./components/MediaAssetsView";
import MediaAssetsErrorsProvider from "./context/MediaAssetsErrorsProvider";
import MediaAssetsProcessingProvider from "./context/MediaAssetsProcessingProvider";
import MediaAssetsProvider from "./context/MediaAssetsProvider";
import MediaAssetsSearchProvider from "./context/MediaAssetsSearchProvider";

export default function MediaAndAssets() {
  return (
    <MediaAssetsProvider>
      <MediaAssetsSearchProvider>
        <MediaAssetsProcessingProvider>
          <MediaAssetsErrorsProvider>
            <MediaAssetsView />
          </MediaAssetsErrorsProvider>
        </MediaAssetsProcessingProvider>
      </MediaAssetsSearchProvider>
    </MediaAssetsProvider>
  );
}
