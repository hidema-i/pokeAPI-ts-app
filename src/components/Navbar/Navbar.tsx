import React, { useState } from "react";
import "./Navbar.css";
import { pokeApiURL, pokeHistoryURL } from "../../utils/pokemon";

const Navbar = () => {
  // showMenuの状態を保持するためのuseStateフック
  const [showMenu, setShowMenu] = useState(false);

  // showMenuの状態を反転するためのtoggleMenu関数
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    // ナビゲーションバーの外側の要素
    <nav className="nav">
      <div className="logo">
        <h1>Pokemon</h1>
      </div>

      {/* ナビゲーションバーのリンク一覧を含む要素 */}
      <div className={`links ${showMenu ? "show" : ""}`}>
        <a href={pokeApiURL} target="_blank" rel="noopener noreferrer">
          API
        </a>
        <a href={pokeHistoryURL} target="_blank" rel="noopener noreferrer">
          あゆみ
        </a>
      </div>

      {/* ナビゲーションバーのメニューアイコン */}
      <div className="menu" onClick={toggleMenu}>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </div>
    </nav>
  );
};

export default Navbar;
