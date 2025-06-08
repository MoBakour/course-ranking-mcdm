# Course Ranking MCDM

A web application for Multi-Criteria Decision Making (MCDM) using the Picture-Fuzzy-Sets CIMAS-ARTASI Decision Model.

## Overview

This tool helps users (e.g., students, faculty, or administrators) evaluate and rank courses based on multiple criteria and expert opinions. It leverages advanced fuzzy logic (Picture Fuzzy Sets) and the CIMAS-ARTASI methodology to aggregate subjective judgments and produce robust, explainable course rankings.

## Features

-   Upload expert ratings via CSV
-   Support for linguistic variables and abbreviations (e.g., "Very Good (VG)")
-   Automatic mapping of linguistic terms to fuzzy numbers
-   Transparent, step-by-step calculation and ranking
-   Modern, responsive UI (React + Tailwind CSS)

## Methodology

-   **PFS (Picture Fuzzy Sets):** Allows experts to express degrees of membership, neutrality, and non-membership for each criterion/alternative.
-   **CIMAS:** Aggregates expert opinions and computes criteria weights.
-   **ARTASI:** Ranks alternatives (courses) based on aggregated scores and criteria weights.

## Folder Structure

```
├── src/
│   ├── components/         # React UI components
│   ├── pages/              # Main app pages (Calculator, Home, etc.)
│   ├── utils/              # Core logic, data extraction, and calculation
│   ├── types/              # TypeScript type definitions
│   └── ...
├── public/                 # Static assets
├── data.csv                # Example input data (CSV)
├── README.md
└── ...
```

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/MoBakour/course-ranking-mcdm.git
    cd course-ranking-mcdm
    ```
2. **Install dependencies:**
    ```sh
    npm install
    ```

## Usage

### 1. Prepare Your Data

-   Use the provided `data.csv` format as a template.
-   Each row represents an expert's ratings for criteria and alternatives, using supported linguistic labels (e.g., "Very Good (VG)", "Important (I)").

### 2. Run the App (Development)

```sh
npm run dev
```

-   Open your browser to the local address shown in the terminal (usually `http://localhost:5173` or similar).

### 3. Upload Data and Get Results

-   Go to the Calculator page.
-   Upload your `.csv` file.
-   The app will process the data and display the ranked courses.

### 4. Build for Production

```sh
npm run build
```

-   The production-ready files will be in the `dist/` folder.

## Customization

-   **Linguistic Scales:**
    -   Edit `src/utils/calculator.ts` to adjust or extend the supported linguistic terms and their fuzzy values.
-   **Criteria/Alternatives:**
    -   The app dynamically adapts to the number of criteria and alternatives in your CSV.

## Technology Stack

-   React.js
-   TypeScript
-   Tailwind CSS
-   PapaParse (CSV parsing)
-   Recharts (Chart Data Visualization)
-   Picture Fuzzy Sets, CIMAS, ARTASI (decision logic)

## Notes

-   All calculations are performed in the browser; no data is sent to a server.
-   The app is designed for educational and research use. For production or sensitive data, review and adapt as needed.

## License

MIT

---

For questions, suggestions, or contributions, please open an issue or pull request!

## Contact

Let's [connect](https://linkedin.com/in/mobakour)

---

Built with ❤️ by [MoBakour](https://bakour.dev)
