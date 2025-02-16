import { Link } from "react-router-dom"
import styles from "./HomePage.module.css"

function HomePage(){
    return (
        <>
        <header>
            <nav className={styles.navBar}>
                <Link to="/signup" className={`${styles.btn} ${styles.signUp}`}>Sign Up</Link>
                <Link to="/" className={`${styles.btn} ${styles.login}`}>Login</Link>
            </nav>
        </header>
        <main className={styles.main}>
            <h1>WORKFLOW</h1>
            <div className={styles.titleCard}>
                <div className={styles.description}>
                    <p>Does your team need help getting stuff done?<br />WorkFlow has you covered.</p>
                </div>
            </div>
        </main>
        </>
    );
}

export default HomePage;
  