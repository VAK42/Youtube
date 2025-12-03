# Youtube Clone

<img src="/img/Home.png"/>

A Full-Stack Youtube Clone Built With Modern Web Technologies, Featuring Video Playback, User Authentication, Content Management, & A Rich Set Of Interactive Features.

## Table Of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running The Application](#running-the-application)
- [Project Structure](#project-structure)
- [Core Features](#core-features)
- [User Interface](#user-interface)
- [Backend Architecture](#backend-architecture)
- [Authentication System](#authentication-system)
- [Video Management](#video-management)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Development Workflow](#development-workflow)
- [Building For Production](#building-for-production)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Performance Optimization](#performance-optimization)
- [Security Considerations](#security-considerations)
- [Contributing](#contributing)
- [License](#license)

## Overview

This Project Is A Comprehensive Youtube Clone That Replicates The Core Functionality Of The Popular Video Sharing Platform. Built With React Router V7, It Demonstrates Modern Web Development Practices Including Server-Side Rendering, Type-Safe Routing, & Efficient Database Management.

The Application Provides A Complete Video Sharing Experience With Features Like Video Upload, Playback, Comments, Likes, Subscriptions, Playlists, & A Creator Studio For Content Management. The Interface Is Fully Responsive & Optimized For Both Desktop & Mobile Devices.

## Key Features

### Video Discovery & Playback
- **Home Feed:** Personalized Video Recommendations Based On User Preferences
- **Trending Page:** Discover Popular Videos Across The Platform
- **Search Functionality:** Advanced Search With Filters & Autocomplete
- **Custom Video Player:** Feature-Rich Player With Playback Controls, Quality Selection, & Keyboard Shortcuts
- **Theater Mode:** Immersive Viewing Experience With Expanded Player
- **Shorts:** Vertical Video Format Similar To Youtube Shorts

### User Engagement
- **Like & Dislike:** Express Opinions On Videos
- **Comments System:** Threaded Comments With Reply Functionality
- **Subscribe To Channels:** Follow Your Favorite Content Creators
- **Share Videos:** Share Content Via Link Copying
- **Save To Playlists:** Organize Videos Into Custom Collections
- **Watch History:** Track & Manage Viewing History

### Content Creation
- **Video Upload:** Drag-And-Drop Interface For Easy Video Uploads
- **Video Editing:** Modify Video Details, Thumbnails, & Metadata
- **Studio Dashboard:** Comprehensive Analytics & Content Management
- **Channel Customization:** Personalize Channel Appearance & Information
- **Community Posts:** Engage With Subscribers Through Text & Poll Posts

### User Management
- **Authentication:** Secure Signup & Login System
- **User Profiles:** Customizable Profile Pages With Avatar & Cover Images
- **Channel Pages:** Dedicated Pages For Each Creator With Tabs For Videos, Shorts, & Community
- **Settings:** Manage Account Preferences & Privacy Options

### Organization Features
- **Playlists:** Create, Edit, & Manage Video Playlists
- **Watch Later:** Save Videos For Future Viewing
- **Liked Videos:** Access All Videos You've Liked
- **Library:** Centralized Hub For All Your Saved Content
- **History Management:** Clear Or Pause Watch History

## Technology Stack

### Frontend
- **React:** Latest Version Of React For Building User Interfaces
- **React Router:** File-Based Routing With Type-Safe Route Definitions
- **TypeScript:** Static Type Checking For Enhanced Developer Experience
- **Tailwind CSS:** Utility-First CSS Framework For Rapid UI Development
- **Lucide React:** Beautiful & Consistent Icon Library

### Backend
- **React Router Server:** Server-Side Rendering & API Routes
- **SQLite:** Lightweight, File-Based Database For Data Persistence
- **Better-SQLite3:** Synchronous SQLite Bindings For Node.js
- **Bcryptjs:** Password Hashing For Secure Authentication

### Development Tools
- **Vite:** Fast Build Tool & Development Server
- **TypeScript Compiler:** Type Checking & Code Generation
- **TSConfig Paths:** Path Mapping For Clean Imports

### Additional Libraries
- **UUID:** Generate Unique Identifiers
- **Date-FNS:** Modern Date Utility Library
- **FS-Extra:** Enhanced File System Operations
- **Clsx:** Utility For Constructing ClassName Strings
- **Tailwind-Merge:** Merge Tailwind CSS Classes Without Conflicts

## Prerequisites

Before You Begin, Ensure You Have The Following Installed On Your System:

- **Node.js**
- **npm**
- **Git:** For Version Control & Cloning The Repository

## Installation

Follow These Steps To Set Up The Project On Your Local Machine:

### Step 1: Clone The Repository

```bash
git clone https://github.com/yourusername/youtube-clone.git
cd youtube-clone
```

### Step 2: Install Dependencies

```bash
npm install
```

This Command Will Install All Required Dependencies Listed In `package.json`, Including Both Production & Development Dependencies.

## Database Setup

The Application Uses SQLite As Its Database. You Need To Initialize The Database Schema & Populate It With Sample Data Before Running The Application.

### Initialize & Seed The Database

Run The Following Command To Set Up The Database:

```bash
npm run seed
```

This Command Performs Two Operations:

1. **Schema Initialization:** Creates The Database File At `app/db/youtube.db` & Applies The Schema Defined In `app/db/schema.sql`. This Creates All Necessary Tables Including Users, Videos, Comments, Likes, Subscriptions, Playlists, & More.

2. **Data Seeding:** Populates The Database With Sample Data Including Demo Users, Videos, Comments, & Other Content. This Allows You To Explore The Application's Features Immediately.

### Manual Database Operations

If You Need To Run These Operations Separately:

```bash
npx tsx app/db/init.ts
npx tsx app/db/seed.ts
```

### Resetting The Database

To Start Fresh With A Clean Database:

```bash
rm app/db/youtube.db
npm run seed
```

## Running The Application

### Development Mode

Start The Development Server With Hot Module Replacement:

```bash
npm run dev
```

The Application Will Be Available At `http://localhost:5173`. The Server Will Automatically Reload When You Make Changes To The Source Code.

### Production Mode

Build The Application For Production:

```bash
npm run build
```

Start The Production Server:

```bash
npm run start
```

The Production Build Is Optimized For Performance & Includes Minification, Tree-Shaking, & Other Optimizations.

## Project Structure

```
youtube-clone/
├── app/
│   ├── components/          # Reusable UI Components
│   │   ├── ui/             # Base UI Components (Button, Input, Toast)
│   │   ├── MainLayout.tsx  # Main Application Layout
│   │   ├── Navbar.tsx      # Navigation Bar Component
│   │   ├── Sidebar.tsx     # Sidebar Navigation
│   │   ├── VideoCard.tsx   # Video Thumbnail Card
│   │   └── ...
│   ├── db/                 # Database Configuration & Scripts
│   │   ├── client.server.ts    # Database Client Setup
│   │   ├── schema.sql          # Database Schema Definition
│   │   ├── init.ts             # Schema Initialization Script
│   │   └── seed.ts             # Data Seeding Script
│   ├── models/             # Database Access Layer
│   │   ├── user.server.ts      # User Data Operations
│   │   ├── video.server.ts     # Video Data Operations
│   │   ├── comment.server.ts   # Comment Data Operations
│   │   ├── playlist.server.ts  # Playlist Data Operations
│   │   └── ...
│   ├── routes/             # Application Routes
│   │   ├── home.tsx            # Home Page
│   │   ├── watch.$videoId.tsx  # Video Watch Page
│   │   ├── upload.tsx          # Video Upload Page
│   │   ├── studio.tsx          # Creator Studio
│   │   └── ...
│   ├── types/              # TypeScript Type Definitions
│   ├── utils/              # Utility Functions
│   ├── sessions.server.ts  # Session Management
│   ├── root.tsx           # Root Layout Component
│   ├── routes.ts          # Route Configuration
│   └── app.css            # Global Styles
├── public/                # Static Assets
│   └── favicon.svg        # Application Icon
├── package.json           # Project Dependencies & Scripts
├── tsconfig.json         # TypeScript Configuration
├── vite.config.ts        # Vite Configuration
└── README.md             # Project Documentation
```

## Core Features

### Video Discovery

The Application Provides Multiple Ways To Discover Content:

**Home Feed:** The Main Landing Page Displays A Grid Of Recommended Videos. The Layout Is Responsive & Adapts To Different Screen Sizes, Showing More Columns On Larger Displays.

**Trending Page:** Showcases Popular Videos Based On View Count & Engagement Metrics. Videos Are Sorted By Popularity & Updated Regularly.

**Search Results:** Users Can Search For Videos By Title, Description, Or Tags. The Search Interface Includes Filters For Sorting & Refining Results.

**Subscriptions Feed:** Shows Latest Videos From Channels You're Subscribed To, Organized By Upload Date.

### Video Playback

The Custom Video Player Includes:

- **Playback Controls:** Play, Pause, Seek, Volume Control
- **Quality Selection:** Choose Video Quality Based On Available Options
- **Playback Speed:** Adjust Playback Speed From 0.25x To 2x
- **Theater Mode:** Expand Player For Immersive Viewing
- **Keyboard Shortcuts:** Space To Play/Pause, Arrow Keys To Seek, M To Mute
- **Progress Tracking:** Resume Videos From Where You Left Off

### Content Management

The Creator Studio Provides Comprehensive Tools For Content Creators:

**Video Management:** View All Uploaded Videos In A Table Format With Quick Actions For Editing & Deletion.

**Analytics Dashboard:** Track Video Performance With Metrics Including Views, Likes, Watch Time, & Subscriber Growth.

**Video Editor:** Modify Video Metadata Including Title, Description, Thumbnail, Visibility Settings, & Category.

**Upload Interface:** Drag-And-Drop Video Upload With Progress Tracking & Metadata Entry.

### Social Features

**Comments System:** Users Can Leave Comments On Videos, Reply To Other Comments, & Like/Dislike Comments. The System Supports Threaded Conversations.

**Likes & Dislikes:** Express Opinions On Videos & Comments. Like Counts Are Displayed Publicly.

**Subscriptions:** Follow Channels To Stay Updated With New Content. Subscription Status Is Reflected In The UI.

**Sharing:** Copy Video Links To Share On Other Platforms.

### Playlist Management

**Create Playlists:** Organize Videos Into Custom Collections With Names & Descriptions.

**Add To Playlist:** Save Videos To Existing Playlists Or Create New Ones.

**Playlist Editing:** Modify Playlist Details, Reorder Videos, & Remove Items.

**Privacy Settings:** Set Playlists As Public, Unlisted, Or Private.

## User Interface

### Responsive Design

The Application Is Fully Responsive & Provides Optimal Viewing Experiences Across All Device Sizes:

- **Desktop:** Multi-Column Grid Layouts, Sidebar Navigation, & Full Feature Set
- **Tablet:** Adaptive Layouts With Collapsible Sidebar
- **Mobile:** Single-Column Layouts, Bottom Navigation Bar, & Touch-Optimized Controls

### Theme & Styling

The Interface Uses A Dark Theme Inspired By Youtube's Design:

- **Color Scheme:** Dark Backgrounds With White Text For Reduced Eye Strain
- **Typography:** Inter Font Family For Clean, Modern Text Rendering
- **Spacing:** Consistent Spacing Using Tailwind's Spacing Scale
- **Animations:** Smooth Transitions & Hover Effects For Enhanced User Experience

### Navigation

**Navbar:** Fixed Top Navigation With Logo, Search Bar, & User Menu.

**Sidebar:** Collapsible Side Navigation With Links To Home, Trending, Subscriptions, Library, & More.

**Mobile Bottom Bar:** Touch-Friendly Navigation For Mobile Devices With Quick Access To Key Features.

## Backend Architecture

### Server-Side Rendering

The Application Uses React Router's Server-Side Rendering Capabilities:

- **Initial Page Load:** HTML Is Rendered On The Server For Faster First Contentful Paint
- **Hydration:** Client-Side JavaScript Takes Over After Initial Load
- **SEO Optimization:** Server-Rendered Content Is Crawlable By Search Engines

### API Routes

Route Loaders & Actions Handle Data Fetching & Mutations:

**Loaders:** Fetch Data Before Rendering Pages. Run On The Server For Initial Loads & On The Client For Subsequent Navigations.

**Actions:** Handle Form Submissions & Data Mutations. Process POST Requests & Return Responses.

### Database Layer

The Models Directory Contains Functions For Database Operations:

- **User Operations:** Create, Read, Update User Records
- **Video Operations:** Upload, Retrieve, Update, Delete Videos
- **Comment Operations:** Create, Fetch, Delete Comments
- **Playlist Operations:** CRUD Operations For Playlists
- **Interaction Operations:** Handle Likes, Subscriptions, & History

## Authentication System

### Session-Based Authentication

The Application Uses Secure Session-Based Authentication:

**Signup Process:**
1. User Submits Email, Username, & Password
2. Password Is Hashed Using Bcrypt
3. User Record Is Created In Database
4. Session Is Created & Cookie Is Set

**Login Process:**
1. User Submits Email & Password
2. Password Is Verified Against Stored Hash
3. Session Is Created On Successful Verification
4. User Is Redirected To Home Page

**Session Management:**
- Sessions Are Stored In Encrypted Cookies
- Session Secret Is Loaded From Environment Variables
- Sessions Expire After A Configured Duration
- Logout Destroys The Session & Clears Cookies

### Protected Routes

Certain Routes Require Authentication:

- **Upload:** Only Authenticated Users Can Upload Videos
- **Studio:** Access To Creator Dashboard Requires Login
- **Settings:** User Settings Are Protected
- **Playlists:** Creating & Managing Playlists Requires Authentication

## Video Management

### Upload Process

**File Handling:**
1. User Selects Video File Via Drag-And-Drop Or File Picker
2. File Is Validated For Type & Size
3. Multipart Form Data Is Processed On Server
4. File Is Saved To Uploads Directory
5. Video Record Is Created In Database

**Metadata Entry:**
- Title (Required)
- Description (Optional)
- Thumbnail Upload (Optional)
- Visibility Setting (Public, Unlisted, Private)
- Category Selection

### Video Processing

Videos Are Stored In The `uploads/` Directory With Unique Filenames Generated Using UUIDs. Thumbnails Are Also Stored & Associated With Video Records.

### Video Retrieval

Videos Are Fetched From The Database With Associated Metadata:
- User Information (Username, Avatar)
- View Count
- Upload Date
- Engagement Metrics (Likes, Comments)

## Database Schema

### Users Table

Stores User Account Information:
- `id`: Unique Identifier
- `username`: Unique Username
- `email`: Unique Email Address
- `passwordHash`: Bcrypt Hashed Password
- `avatarUrl`: Profile Picture URL
- `coverUrl`: Channel Cover Image URL
- `createdAt`: Account Creation Timestamp

### Videos Table

Stores Video Metadata:
- `id`: Unique Identifier
- `userId`: Foreign Key To Users
- `title`: Video Title
- `description`: Video Description
- `thumbnailUrl`: Thumbnail Image URL
- `videoUrl`: Video File URL
- `views`: View Count
- `duration`: Video Duration In Seconds
- `isShort`: Boolean Flag For Shorts
- `createdAt`: Upload Timestamp

### Comments Table

Stores Video Comments:
- `id`: Unique Identifier
- `videoId`: Foreign Key To Videos
- `userId`: Foreign Key To Users
- `content`: Comment Text
- `parentId`: Foreign Key For Nested Comments
- `createdAt`: Comment Timestamp

### Additional Tables

- **Likes:** User Likes/Dislikes On Videos
- **Subscriptions:** Channel Subscription Relationships
- **Playlists:** User-Created Playlists
- **PlaylistVideos:** Videos In Playlists
- **WatchHistory:** User Viewing History
- **Tags:** Video Tags
- **VideoTags:** Tag Associations
- **Posts:** Community Posts

## API Routes

### Video Routes

- `GET /`: Home Page With Video Feed
- `GET /watch/:videoId`: Video Watch Page
- `GET /upload`: Video Upload Form
- `POST /upload`: Handle Video Upload
- `GET /studio/edit/:videoId`: Video Edit Form
- `POST /studio/edit/:videoId`: Update Video

### User Routes

- `GET /login`: Login Page
- `POST /login`: Handle Login
- `GET /signup`: Signup Page
- `POST /signup`: Handle Signup
- `GET /channel/:username`: User Channel Page
- `GET /settings`: User Settings Page

### Playlist Routes

- `GET /playlists`: User Playlists Page
- `GET /playlist/:playlistId`: Playlist Detail Page
- `POST /playlists`: Create Playlist
- `DELETE /playlists/:playlistId`: Delete Playlist

## Development Workflow

### Type Checking

Run TypeScript Type Checking:

```bash
npm run typecheck
```

This Command Generates Route Types & Checks For Type Errors Throughout The Codebase.

### Code Organization

- **Components:** Keep Components Small & Focused On Single Responsibilities
- **Models:** Separate Database Logic From Route Handlers
- **Types:** Define Interfaces For Data Structures
- **Utils:** Extract Reusable Logic Into Utility Functions

### Best Practices

- Use TypeScript For Type Safety
- Implement Error Boundaries For Graceful Error Handling
- Optimize Images & Videos For Web Delivery
- Use Lazy Loading For Better Performance
- Implement Proper Loading States
- Handle Edge Cases & Validation

## Building For Production

### Build Process

Create An Optimized Production Build:

```bash
npm run build
```

This Command:
1. Compiles TypeScript To JavaScript
2. Bundles & Minifies Code
3. Optimizes Assets
4. Generates Server & Client Bundles
5. Creates A `build/` Directory With Production Files

### Build Output

The Build Process Creates:
- `build/server/`: Server-Side Code
- `build/client/`: Client-Side Assets
- Static Assets Are Fingerprinted For Cache Busting

## Deployment

### Deployment Options

**Node.js Server:**
Deploy The Built Application To Any Node.js Hosting Provider:
1. Build The Application
2. Upload Build Directory
3. Set Environment Variables
4. Start The Server With `npm run start`

**Platform Recommendations:**
- Vercel
- Netlify
- Railway
- Render
- Fly.io

### Environment Variables

Ensure These Variables Are Set In Production:
- `SESSION_SECRET`: Strong Random String
- `NODE_ENV`: Set To `production`

### Database Considerations

For Production, Consider:
- Using A More Robust Database (PostgreSQL, MySQL)
- Implementing Database Backups
- Setting Up Database Migrations
- Configuring Connection Pooling

## Troubleshooting

### Common Issues

**Database Errors:**
- Ensure Database Is Initialized: Run `npm run seed`
- Check File Permissions On `app/db/youtube.db`
- Verify Schema Is Up To Date

**Build Failures:**
- Clear `node_modules` & Reinstall: `rm -rf node_modules && npm install`
- Check Node.js Version Compatibility
- Review TypeScript Errors: `npm run typecheck`

**Runtime Errors:**
- Check Browser Console For Client-Side Errors
- Review Server Logs For Backend Issues
- Verify Environment Variables Are Set

### Getting Help

If You Encounter Issues:
1. Check The Troubleshooting Section
2. Search Existing Issues On GitHub
3. Create A New Issue With Detailed Information
4. Include Error Messages & Steps To Reproduce

## Performance Optimization

### Frontend Optimization

- **Code Splitting:** Routes Are Automatically Code-Split
- **Asset Optimization:** Images & Videos Should Be Compressed
- **Lazy Loading:** Implement Lazy Loading For Images
- **Caching:** Leverage Browser Caching For Static Assets

### Backend Optimization

- **Database Indexing:** Add Indexes On Frequently Queried Columns
- **Query Optimization:** Use Efficient SQL Queries
- **Caching Layer:** Consider Adding Redis For Caching
- **CDN:** Serve Static Assets Via CDN

## Security Considerations

### Authentication Security

- Passwords Are Hashed Using Bcrypt
- Sessions Are Encrypted
- HTTPS Should Be Used In Production
- CSRF Protection Is Implemented

### Input Validation

- All User Inputs Are Validated
- SQL Injection Prevention Via Parameterized Queries
- XSS Prevention Through Proper Escaping
- File Upload Restrictions

### Best Practices

- Keep Dependencies Updated
- Use Environment Variables For Secrets
- Implement Rate Limiting
- Regular Security Audits

## Contributing

Contributions Are Welcome! Please Follow These Guidelines:

1. Fork The Repository
2. Create A Feature Branch
3. Make Your Changes
4. Write Tests If Applicable
5. Submit A Pull Request

## License

This Project Is Licensed Under The MIT License. See The LICENSE File For Details.
