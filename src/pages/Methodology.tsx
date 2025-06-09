const Methodology = () => {
    return (
        <main className="max-w-4xl mx-auto px-6 py-12 text-white space-y-10">
            <section>
                <h1 className="text-4xl font-bold text-[var(--color-theme-400)] mb-4">
                    Methodology
                </h1>
                <p className="text-lg text-gray-300">
                    This project was developed as part of the{" "}
                    <strong>Application Development for Decision Making</strong>{" "}
                    course in the Software Engineering program. It applies the{" "}
                    <strong>PFS-CIMAS-ARTASI</strong> multi-criteria
                    decision-making model to rank Computer Science elective
                    courses, inspired by{" "}
                    <em>
                        "A Picture Fuzzy CIMAS-ARTASI Model for Website
                        Performance Analysis in Human Resource Management"
                    </em>{" "}
                    (Applied Soft Computing Journal, 2024).
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-[var(--color-theme-300)] mb-2">
                    Project Objective
                </h2>
                <p className="text-gray-300">
                    Our goal is to provide an informed ranking of elective
                    courses to assist Computer Science students in selecting the
                    most suitable courses based on multiple expert-assessed
                    criteria.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-[var(--color-theme-300)] mb-2">
                    Criteria
                </h2>
                <p className="text-gray-300 mb-2">
                    We evaluated the alternatives based on the following 10
                    criteria:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                    <li>Career Relevance</li>
                    <li>Prerequisite Compatibility</li>
                    <li>Instructor Expertise</li>
                    <li>Course Difficulty</li>
                    <li>Project-Based Learning</li>
                    <li>Student Satisfaction</li>
                    <li>Workload Balance</li>
                    <li>Use of Modern Tools/Technologies</li>
                    <li>Interdisciplinary Usefulness</li>
                    <li>Opportunity for Research or Innovation</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-[var(--color-theme-300)] mb-2">
                    Alternatives
                </h2>
                <p className="text-gray-300 mb-2">
                    The 10 elective courses considered as alternatives:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                    <li>Web Development</li>
                    <li>Parallel Computing</li>
                    <li>English Literature</li>
                    <li>Differential Equations</li>
                    <li>Supply Chain Management</li>
                    <li>Introduction to Artificial Intelligence</li>
                    <li>Machine Learning Applications</li>
                    <li>Principles of Cryptocurrency</li>
                    <li>Mobile Application Development</li>
                    <li>Nanoscience and Engineering</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-[var(--color-theme-300)] mb-2">
                    Data Collection
                </h2>
                <p className="text-gray-300">
                    Data was collected through an online survey using Google
                    Forms. We gathered data from experts of varying levels of
                    importance such as university professors, school IT
                    teachers, IT specialists, and Software Engineering students.
                    Experts rated each criterion and alternative using
                    linguistic scales mapped to Picture Fuzzy Sets (PFS).
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-[var(--color-theme-300)] mb-2">
                    Methodological Approach
                </h2>
                <p className="text-gray-300 mb-4">
                    The hybrid <strong>PFS-CIMAS-ARTASI</strong> model follows
                    these steps:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    <li>
                        Expert weights are calculated using their assigned
                        importance levels.
                    </li>
                    <li>
                        Criteria weights are determined via the PFS-based CIMAS
                        method.
                    </li>
                    <li>
                        Alternatives are evaluated using the PFS-based ARTASI
                        ranking method.
                    </li>
                    <li>
                        A final utility ranking of the alternatives is computed.
                    </li>
                </ol>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-[var(--color-theme-300)] mb-2">
                    Application Development
                </h2>
                <p className="text-gray-300">
                    The application is a web-based system built using:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                    <li>
                        <strong>Frontend:</strong> React.js + TypeScript +
                        Tailwind CSS
                    </li>
                    <li>
                        <strong>Algorithm Engine:</strong> Custom implementation
                        of PFS-CIMAS-ARTASI in TypeScript
                    </li>
                </ul>
                <p className="text-gray-300 mt-2">
                    The system allows users to upload expert evaluation data,
                    process the decision-making model, and present the ranked
                    list of courses in an interactive interface.
                </p>
            </section>
        </main>
    );
};

export default Methodology;
