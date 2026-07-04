import { Link } from "react-router-dom";
import "../styles/Home.css";


function Home() {
  return (
    <div className="home-page">
      <header className="hero">
        <h1>Home Manager</h1>
        <p>Track groceries, pharmacy items, shopping needs, and spending.</p>
      </header>

      <main className="option-grid">
        <Link to="/groceries" className="option-card"><span className="icon">🛒</span> <h2>Groceries</h2>
          <p>Track quantity, expiry dates, and low stock.</p></Link>
        <Link to="/pharmacy" className="option-card"><span className="icon">💊</span>
          <h2>Pharmacy</h2>
          <p>Manage medicines, supplements, and refill dates.</p></Link>
        <Link to="/to-buy" className="option-card"><span className="icon">📝</span>
          <h2>To-Buy List</h2>
          <p>Keep a list of items you need to buy.</p></Link>
        <Link to="/spendings" className="option-card"> <span className="icon">💰</span>
          <h2>Spendings</h2>
          <p>Track how much you spend on household items.</p></Link>
      </main>
    </div>
  );


}

export default Home;