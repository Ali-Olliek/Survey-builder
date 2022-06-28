import react from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const navTabs = [
        { link: "/admin/surveys", name: "Admin" },
        { link: "/user/surveys ", name : "User" },
    ]

return (
    <nav className='Top-Bar'>
        <ul className='Tab'>
            {navTabs.map((navTab, index) => {
                return (
                    <NavLink key = {index} to = {navTab.link}>
                        <li>{navTab.name}</li>
                    </NavLink>
                );
            })}
            {location.pathname.includes("admin") && (
                <NavLink to = "/admin/CreateSurvey">
                    <li>Create Survey</li>
                </NavLink>
            )}
        </ul>
    </nav>
)
}

export default Navbar;