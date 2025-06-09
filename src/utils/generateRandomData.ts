export function generateRandomSurveyCSV(numExperts: number): string {
    // Define the header
    const header = [
        "Timestamp",
        "What is your name?",
        "How would you rate your level of expertise and importance in contributing to this course recommendation decision?",
        "How important is the criterion 'Career Relevance' when recommending a course?",
        "How important is the criterion 'Prerequisite Compatibility' when recommending a course?",
        "How important is the criterion 'Instructor Expertise' when recommending a course?",
        "How important is the criterion 'Course Difficulty' when recommending a course?",
        "How important is the criterion 'Project-Based Learning' when recommending a course?",
        "How important is the criterion 'Student Satisfaction' when recommending a course?",
        "How important is the criterion 'Workload Balance' when recommending a course?",
        "How important is the criterion 'Use of Modern Tools/Technologies' when recommending a course?",
        "How important is the criterion 'Interdisciplinary Usefulness' when recommending a course?",
        "How important is the criterion 'Opportunity for Research or Innovation' when recommending a course?",
    ];

    // Add alternative ratings (10 alternatives × 10 criteria)
    const alternatives = [
        "Advanced Web Development",
        "Parallel Computing",
        "English Literature",
        "Data Analysis with R",
        "Robotics",
        "Introduction to Large Language Models",
        "Machine Learning Applications with Matlab",
        "Principles of Cryptocurrency",
        "Mobile Application Development",
        "Nanoscience and Engineering",
    ];

    const criteria = [
        "Career Relevance",
        "Prerequisite Compatibility",
        "Instructor Expertise",
        "Course Difficulty",
        "Project-Based Learning",
        "Student Satisfaction",
        "Workload Balance",
        "Use of Modern Tools/Technologies",
        "Interdisciplinary Usefulness",
        "Opportunity for Research or Innovation",
    ];

    for (const alt of alternatives) {
        for (const crit of criteria) {
            header.push(
                `${alt} - How would you rate this course in terms of '${crit}'?`
            );
        }
    }

    // Define possible answers
    const linguisticAnswers = [
        "Extremely Good (EG)",
        "Very Very Good (VVG)",
        "Very Good (VG)",
        "Good (G)",
        "Medium Good (MG)",
        "Medium (M)",
        "Medium Bad (MB)",
        "Bad (B)",
        "Very Bad (VB)",
        "Very Very Bad (VVB)",
    ];

    const expertImportanceAnswers = [
        "Very Important (VI)",
        "Important (I)",
        "Medium (M)",
        "Unimportant (UI)",
        "Very Unimportant (VUI)",
    ];

    // Generate rows
    const rows: string[][] = [];

    for (let i = 0; i < numExperts; i++) {
        const row: string[] = [];

        // Timestamp → you can randomize time if you want
        row.push(new Date().toISOString());

        // Name
        row.push(`Expert ${i + 1}`);

        // Expert importance
        row.push(randomChoice(expertImportanceAnswers));

        // Criteria importance ratings (10)
        for (let j = 0; j < 10; j++) {
            row.push(randomChoice(linguisticAnswers));
        }

        // Alternative ratings (10 alternatives × 10 criteria = 100 ratings)
        for (let j = 0; j < 100; j++) {
            row.push(randomChoice(linguisticAnswers));
        }

        rows.push(row);
    }

    // Build CSV string
    const csvString = [
        header.join(","),
        ...rows.map((row) => row.join(",")),
    ].join("\n");

    return csvString;
}

// ------- Helper functions ---------------
export function randomChoice<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
