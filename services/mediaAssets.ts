export interface Asset {
  id: number | string;
  name: string; // File name with extension
  type: string; // 'image', 'document', 'diagram', etc.
  size: string; // Human-readable size (e.g., "2.4 MB")
  usage: string; // Where/how the asset is used
  uploadDate: string; // ISO date string or formatted date
  url: string; // ISO date string or formatted date
  fullPath: string; // ISO date string or formatted date
  category: string; // ISO date string or formatted date
  contentType: string; // ISO date string or formatted date
}

export interface GCSFileMetadata {
  name: string; // Full path: "projects/metro-bridge/hero-image.jpg"
  bucket: string; // "ptr-command-center-assets"
  generation: string; // Version identifier
  metageneration: string; // Metadata version
  contentType: string; // "image/jpeg", "application/pdf", etc.
  timeCreated: string; // ISO timestamp: "2026-01-15T10:30:00.000Z"
  updated: string; // ISO timestamp
  storageClass: string; // "STANDARD", "NEARLINE", etc.
  size: string; // Size in bytes: "2457600"
  md5Hash: string; // Hash for integrity
  mediaLink: string; // Download URL
  metadata?: {
    // Custom metadata you can add
    usage?: string; // "Metro Bridge Project"
    category?: string; // "projects", "website", etc.
    tags?: string; // "bridge,infrastructure,featured"
    usedIn?: string; // "homepage-hero,project-123"
  };
}

// SAMPLE PROCESSED ASSETS - Ready for UI Rendering
// RAW GCS METADATA - Before transformation
export const sampleRawGCSFiles: GCSFileMetadata[] = [
  // Website Assets
  {
    name: "website/homepage/hero-background.jpg",
    bucket: "ptr-command-center-assets",
    generation: "1738945800000",
    metageneration: "1",
    contentType: "image/jpeg",
    timeCreated: "2026-01-15T10:30:00.000Z",
    updated: "2026-01-15T10:30:00.000Z",
    storageClass: "STANDARD",
    size: "3355443", // 3.2 MB in bytes
    md5Hash: "a1b2c3d4e5f6...",
    mediaLink: "https://firebasestorage.googleapis.com/...",
    metadata: {
      usage: "Homepage Hero Section",
      category: "website",
      tags: "hero,homepage,background",
      usedIn: "homepage-hero",
    },
  },
  {
    name: "website/homepage/experience-team.jpg",
    bucket: "ptr-command-center-assets",
    generation: "1738945801000",
    metageneration: "1",
    contentType: "image/jpeg",
    timeCreated: "2026-01-16T14:20:00.000Z",
    updated: "2026-01-16T14:20:00.000Z",
    storageClass: "STANDARD",
    size: "2936012", // 2.8 MB in bytes
    md5Hash: "f6e5d4c3b2a1...",
    mediaLink: "https://firebasestorage.googleapis.com/...",
    metadata: {
      usage: "Homepage Experience Section",
      category: "website",
      tags: "team,experience,homepage",
      usedIn: "homepage-experience",
    },
  },
  {
    name: "website/about/overview-banner.jpg",
    bucket: "ptr-command-center-assets",
    generation: "1738945802000",
    metageneration: "1",
    contentType: "image/jpeg",
    timeCreated: "2026-01-17T09:15:00.000Z",
    updated: "2026-01-17T09:15:00.000Z",
    storageClass: "STANDARD",
    size: "2621440", // 2.5 MB in bytes
    md5Hash: "1a2b3c4d5e6f...",
    mediaLink: "https://firebasestorage.googleapis.com/...",
    metadata: {
      usage: "About Page Banner",
      category: "website",
      tags: "about,banner,overview",
      usedIn: "about-page-banner",
    },
  },

  // Project Assets
  {
    name: "projects/metro-bridge/hero-image.jpg",
    bucket: "ptr-command-center-assets",
    generation: "1738945803000",
    metageneration: "1",
    contentType: "image/jpeg",
    timeCreated: "2026-01-10T16:45:00.000Z",
    updated: "2026-01-10T16:45:00.000Z",
    storageClass: "STANDARD",
    size: "3670016", // 3.5 MB in bytes
    md5Hash: "6f5e4d3c2b1a...",
    mediaLink: "https://firebasestorage.googleapis.com/...",
    metadata: {
      usage: "Metro Bridge Project - Hero Image",
      category: "projects",
      tags: "bridge,metro,hero,featured",
      usedIn: "project-detail-metro-bridge",
    },
  },
  {
    name: "projects/metro-bridge/blueprint.pdf",
    bucket: "ptr-command-center-assets",
    generation: "1738945804000",
    metageneration: "1",
    contentType: "application/pdf",
    timeCreated: "2026-01-12T11:30:00.000Z",
    updated: "2026-01-12T11:30:00.000Z",
    storageClass: "STANDARD",
    size: "5347737", // 5.1 MB in bytes
    md5Hash: "a0b1c2d3e4f5...",
    mediaLink: "https://firebasestorage.googleapis.com/...",
    metadata: {
      usage: "Metro Bridge Project - Technical Blueprint",
      category: "projects",
      tags: "blueprint,technical,metro-bridge",
      usedIn: "project-documents-metro-bridge",
    },
  },
  {
    name: "projects/metro-bridge/progress-photos/phase-1.jpg",
    bucket: "ptr-command-center-assets",
    generation: "1738945805000",
    metageneration: "1",
    contentType: "image/jpeg",
    timeCreated: "2026-01-14T13:20:00.000Z",
    updated: "2026-01-14T13:20:00.000Z",
    storageClass: "STANDARD",
    size: "4404019", // 4.2 MB in bytes
    md5Hash: "5f4e3d2c1b0a...",
    mediaLink: "https://firebasestorage.googleapis.com/...",
    metadata: {
      usage: "Metro Bridge Project - Phase 1 Progress",
      category: "projects",
      tags: "progress,phase1,construction,metro-bridge",
      usedIn: "project-gallery-metro-bridge",
    },
  },
  {
    name: "projects/solar-farm/diagram.svg",
    bucket: "ptr-command-center-assets",
    generation: "1738945806000",
    metageneration: "1",
    contentType: "image/svg+xml",
    timeCreated: "2026-01-18T08:45:00.000Z",
    updated: "2026-01-18T08:45:00.000Z",
    storageClass: "STANDARD",
    size: "524288", // 512 KB in bytes
    md5Hash: "0a1b2c3d4e5f...",
    mediaLink: "https://firebasestorage.googleapis.com/...",
    metadata: {
      usage: "Solar Farm Project - System Diagram",
      category: "projects",
      tags: "diagram,solar,technical",
      usedIn: "project-detail-solar-farm",
    },
  },

  // Branding Assets
  {
    name: "branding/logo-primary.svg",
    bucket: "ptr-command-center-assets",
    generation: "1738945807000",
    metageneration: "1",
    contentType: "image/svg+xml",
    timeCreated: "2026-01-05T12:00:00.000Z",
    updated: "2026-01-05T12:00:00.000Z",
    storageClass: "STANDARD",
    size: "159744", // 156 KB in bytes
    md5Hash: "f0e1d2c3b4a5...",
    mediaLink: "https://firebasestorage.googleapis.com/...",
    metadata: {
      usage: "Primary Company Logo",
      category: "branding",
      tags: "logo,primary,brand",
      usedIn: "header,footer,documents",
    },
  },
  {
    name: "branding/logo-white.png",
    bucket: "ptr-command-center-assets",
    generation: "1738945808000",
    metageneration: "1",
    contentType: "image/png",
    timeCreated: "2026-01-05T12:15:00.000Z",
    updated: "2026-01-05T12:15:00.000Z",
    storageClass: "STANDARD",
    size: "91136", // 89 KB in bytes
    md5Hash: "6e5d4c3b2a19...",
    mediaLink: "https://firebasestorage.googleapis.com/...",
    metadata: {
      usage: "Logo for Dark Backgrounds",
      category: "branding",
      tags: "logo,white,dark-background",
      usedIn: "hero-section,footer-dark",
    },
  },
  {
    name: "branding/brand-guidelines.pdf",
    bucket: "ptr-command-center-assets",
    generation: "1738945809000",
    metageneration: "1",
    contentType: "application/pdf",
    timeCreated: "2026-01-06T10:30:00.000Z",
    updated: "2026-01-06T10:30:00.000Z",
    storageClass: "STANDARD",
    size: "2411724", // 2.3 MB in bytes
    md5Hash: "1f2e3d4c5b6a...",
    mediaLink: "https://firebasestorage.googleapis.com/...",
    metadata: {
      usage: "Brand Guidelines and Standards",
      category: "branding",
      tags: "guidelines,brand,standards",
      usedIn: "internal-reference",
    },
  },

  // Service Icons
  {
    name: "services/structural-engineering-icon.svg",
    bucket: "ptr-command-center-assets",
    generation: "1738945810000",
    metageneration: "1",
    contentType: "image/svg+xml",
    timeCreated: "2026-01-20T15:00:00.000Z",
    updated: "2026-01-20T15:00:00.000Z",
    storageClass: "STANDARD",
    size: "43008", // 42 KB in bytes
    md5Hash: "a9b8c7d6e5f4...",
    mediaLink: "https://firebasestorage.googleapis.com/...",
    metadata: {
      usage: "Service Icon - Structural Engineering",
      category: "services",
      tags: "icon,structural,engineering",
      usedIn: "services-section",
    },
  },
  {
    name: "services/electrical-systems-icon.svg",
    bucket: "ptr-command-center-assets",
    generation: "1738945811000",
    metageneration: "1",
    contentType: "image/svg+xml",
    timeCreated: "2026-01-20T15:05:00.000Z",
    updated: "2026-01-20T15:05:00.000Z",
    storageClass: "STANDARD",
    size: "38912", // 38 KB in bytes
    md5Hash: "4f3e2d1c0b9a...",
    mediaLink: "https://firebasestorage.googleapis.com/...",
    metadata: {
      usage: "Service Icon - Electrical Systems",
      category: "services",
      tags: "icon,electrical,systems",
      usedIn: "services-section",
    },
  },

  // Certificates
  {
    name: "certificates/iso-certification.pdf",
    bucket: "ptr-command-center-assets",
    generation: "1738945812000",
    metageneration: "1",
    contentType: "application/pdf",
    timeCreated: "2026-01-08T14:45:00.000Z",
    updated: "2026-01-08T14:45:00.000Z",
    storageClass: "STANDARD",
    size: "1887436", // 1.8 MB in bytes
    md5Hash: "8g7f6e5d4c3b...",
    mediaLink: "https://firebasestorage.googleapis.com/...",
    metadata: {
      usage: "ISO 9001 Certification",
      category: "certificates",
      tags: "iso,certification,quality",
      usedIn: "about-page,credentials",
    },
  },

  // Documentation
  {
    name: "documents/company-profile.pdf",
    bucket: "ptr-command-center-assets",
    generation: "1738945813000",
    metageneration: "1",
    contentType: "application/pdf",
    timeCreated: "2026-01-03T09:00:00.000Z",
    updated: "2026-01-03T09:00:00.000Z",
    storageClass: "STANDARD",
    size: "3565158", // 3.4 MB in bytes
    md5Hash: "2h1g0f9e8d7c...",
    mediaLink: "https://firebasestorage.googleapis.com/...",
    metadata: {
      usage: "Company Profile Document",
      category: "documents",
      tags: "profile,company,overview",
      usedIn: "downloads,proposals",
    },
  },
  {
    name: "documents/capabilities-statement.pdf",
    bucket: "ptr-command-center-assets",
    generation: "1738945814000",
    metageneration: "1",
    contentType: "application/pdf",
    timeCreated: "2026-01-03T09:30:00.000Z",
    updated: "2026-01-03T09:30:00.000Z",
    storageClass: "STANDARD",
    size: "3040870", // 2.9 MB in bytes
    md5Hash: "9i8h7g6f5e4d...",
    mediaLink: "https://firebasestorage.googleapis.com/...",
    metadata: {
      usage: "Capabilities Statement",
      category: "documents",
      tags: "capabilities,statement,services",
      usedIn: "proposals,bids",
    },
  },
];
