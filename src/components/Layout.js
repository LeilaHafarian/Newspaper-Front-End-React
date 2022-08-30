import { useState } from "react";
import { Link } from "react-router-dom";
import "./layout.css";
const Layout = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState("Artiklar");
  const menus = [
    { value: "Artiklar", link: "/" },
    { value: "Journalister", link: "/journalist" },
    { value: "Bilder", link: "/bilder" },
  ];
  return (
    <main className="main">
      <header className="app-bar">
        <h1>Blåatoppens dagblad - Admin</h1>

      </header>
      <div className="container">
        <div className="drawer">
          <ul>
            {menus.map((menu) => {
              return (
                <li
                  onClick={() => {
                    setSelectedMenu(menu.value);
                  }}
                  key={menu.value}
                  className={selectedMenu === menu.value ? "selected-menu" : ""}
                >
                  <Link to={menu.link}>{menu.value}</Link>
                </li>
              );
            })}
          </ul> 
        </div>
        <div className="content">{children}</div>
      </div>
    </main>
  );
};
export default Layout;
