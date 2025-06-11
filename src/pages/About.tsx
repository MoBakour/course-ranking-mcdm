import { FaGithub, FaGlobe, FaLinkedin, FaUser } from "react-icons/fa";

import Bakour from "../images/bakour.jpg";
import Hussam from "../images/hussam.png";

type LinkType = {
    url: string;
    icon: React.ReactNode;
};

interface TeamMember {
    name: string;
    number: string;
    major: string;
    image?: string;
    links?: LinkType[];
}

const teamMembers: TeamMember[] = [
    {
        name: "Mohamed Bakour",
        number: "220911218",
        major: "Software Engineering",
        image: Bakour,
        links: [
            {
                url: "https://www.linkedin.com/in/mobakour",
                icon: <FaLinkedin />,
            },
            {
                url: "https://bakour.dev",
                icon: <FaGlobe />,
            },
            {
                url: "https://github.com/MoBakour",
                icon: <FaGithub />,
            },
        ],
    },
    {
        name: "Hassan Hussam Sarmini",
        number: "220911229",
        major: "Software Engineering",
        image: Hussam,
    },
    {
        name: "Mohab Fituri",
        number: "220901088",
        major: "Computer Engineering",
    },
    {
        name: "Damla Yıldız",
        number: "210905041",
        major: "Industrial Engineering",
    },
];

const About = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">About the Project</h1>
                <p className="text-lg text-white/80 leading-relaxed">
                    This project is a collaborative effort from a
                    multidisciplinary engineering course, bringing together
                    students from Software Engineering, Industrial Engineering,
                    and Computer Engineering backgrounds. Our goal was to create
                    a comprehensive course ranking system that combines
                    expertise from different engineering domains to provide a
                    more holistic and accurate evaluation of academic courses.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                    The project leverages concepts from Multi-Criteria Decision
                    Making (MCDM) and combines them with modern web technologies
                    to create an intuitive and powerful tool for course
                    evaluation. This interdisciplinary approach allows us to
                    consider various aspects of course quality, from technical
                    content to practical applications and student experience.
                </p>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="relative w-48 h-48 overflow-hidden rounded-[6rem] transition-all hover:rounded-[3rem]">
                                {member.image ? (
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-500 flex items-center justify-center">
                                        <FaUser className="text-gray-300 w-1/2 h-1/2" />
                                    </div>
                                )}
                            </div>
                            <h3 className="text-xl font-semibold my-2">
                                {member.name}
                            </h3>
                            <p className="text-white/70">{member.major}</p>
                            <p className="text-white/70">{member.number}</p>
                            <div className="flex gap-3 mt-2">
                                {member.links?.map((link) => (
                                    <a
                                        href={link.url}
                                        key={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-theme-400 hover:text-theme-500 transition-colors"
                                    >
                                        {link.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
