interface HeaderProps {
  title?: string;
}

function Header({ title = "Dashboard" }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <h1>{title}</h1>
      </div>

      <div className="header-right">
        <button
          type="button"
          className="header-icon-button"
          aria-label="Notifications"
        >
          🔔
        </button>

        <div className="header-user">
          <div className="header-avatar">SA</div>

          <div className="header-user-info">
            <strong>Super Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;