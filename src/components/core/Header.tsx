import { Link, NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="p-5 pb-15 flex flex-col justify-center items-center gap-2 w-fit m-auto">
            <h1 className="text-4xl font-bold tracking-wider max-sm:text-3xl max-sm:tracking-widest max-xs:text-2xl! max-xs:tracking-wide! max-[350px]:text-xl!">
                <Link to="/">Course Ranking System</Link>
            </h1>

            <p className="text-gray-400 tracking-widest text-center max-sm:text-sm max-xs:text-xs! max-xs:tracking-normal!">
                Using{" "}
                <span className="font-bold text-theme-300">
                    PFS-CIMAS-ARTASI
                </span>{" "}
                Decision Making Method
            </p>

            <nav className="flex justify-between w-full max-xs:text-sm">
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "text-theme-400" : "text-gray-400"
                    }
                    to="/"
                >
                    Home
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "text-theme-400" : "text-gray-400"
                    }
                    to="/calculator"
                >
                    Calculator
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "text-theme-400" : "text-gray-400"
                    }
                    to="/methodology"
                >
                    Methodology
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "text-theme-400" : "text-gray-400"
                    }
                    to="/about"
                >
                    About
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;
