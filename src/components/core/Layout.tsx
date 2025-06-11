import Header from "./Header";
import Blob from "./Blob";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="bg-theme-100 text-white min-h-dvh relative overflow-hidden z-0">
            <Blob
                className="fixed w-220 h-220 -top-60 -right-60 text-theme-300 opacity-10 blur-sm -z-10"
                speed={3}
            />
            <Blob
                className="fixed w-220 h-220 -bottom-60 -left-60 text-theme-300 opacity-10 blur-sm -z-10"
                speed={3}
            />

            <Header />
            <main className="w-[80%] max-xs:w-[90%] max-w-screen-lg m-auto relative pb-10">
                {children}
            </main>
        </div>
    );
};

export default Layout;
