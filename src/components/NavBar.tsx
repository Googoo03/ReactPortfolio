interface Props {
  color: string;
  textColor: string;
  titles: [title: React.ReactNode, link: string][];
}

const NavBar = ({ color, textColor, titles }: Props) => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: color, borderBottom: "1px solid white" }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
          style={{ fontFamily: "Lexend, sans-serif", color: textColor }}
        >
          Nicholas Karalis Portfolio & Blogs
        </a>

        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            {titles.map(([title, link], index) => (
              <li className="nav-item active">
                <a
                  className="nav-link"
                  href={link}
                  key={index}
                  style={{ color: textColor }}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
