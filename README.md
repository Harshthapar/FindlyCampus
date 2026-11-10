# Findly Campus — Lost Something? Find It Here.
## Smart Campus Lost & Found Platform

**Findly Campus** is a modern, responsive web application engineered to centralize campus lost-and-found operations. It leverages a transparent, multi-attribute rule-based Smart Matching Engine to connect students who lost belongings with items found and turned in across campus facilities.

---

## 🌟 Key Features

1. **Rule-Based Smart Matching Engine**:
   - Transparent, explainable weighted compatibility calculation (0 to 100%).
   - Weights:
     - **Item Category (30%)**: Strict or compatible category mapping.
     - **Title & Keyword Similarity (25%)**: Jaccard tokenized similarity on titles and descriptions.
     - **Color Matching (15%)**: Direct matching and textual mentions.
     - **Brand Alignment (10%)**: Brand attributes and cross-referencing.
     - **Campus Proximity (10%)**: Distance matrix between key campus buildings (Library, SAC, Cafeteria, Science Complex, Engineering, etc.).
     - **Chronological Proximity (10%)**: Decay based on the time interval between reports.
   - Shows matching attributes, differences, and explanations of why records may pair up.

2. **Full Responsive Application Flow**:
   - **Landing Page**: Hero presentation with live metrics, step-by-step workflow, recent found items carousel, and navigation.
   - **Student Dashboard**: Real-time stats (Total lost, total found, active reports, recoveries), quick report shortcuts, and top smart match recommendations.
   - **Lost Items Directory**: Search bar, category filters, location filters, sort by date/name.
   - **Found Items Directory**: Search, filter, and view details.
   - **Reporting Center (Lost & Found)**: Distinct reporting tabs with photo uploads, presets, location selectors, and student privacy warnings for ID cards & wallets.
   - **Smart Matches Hub**: Categorized by High-Confidence (75%+), Medium-Confidence (50-74%), and Low-Confidence (<50%) with breakdown bars.
   - **Item Details**: Spec sheet, location notes, private identification hints, matching candidates, status toggling, and an in-app simulated claim/contact dialog.
   - **My Reports Management**: Track personal reports, edit inline, delete, or mark as Recovered / Returned.
   - **Settings & Demo Reset**: Configure display name, simulated notification preferences, theme options, and one-click demo data reset.

3. **Built with**:
   - React 18 & Vite
   - Tailwind CSS
   - React Router DOM v6
   - Lucide React Icons
   - Robust `localStorage` state management with automatic demo seed data

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Development
```bash
# Clone the repository
git clone <repo-url>
cd "Project 9"

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🔒 Privacy & Safety Notes
- Simulated in-app messaging modal: no external emails/SMS are actually transmitted during this prototype.
- Sensitive attributes (ID numbers, card details) are masked to ensure student privacy.

