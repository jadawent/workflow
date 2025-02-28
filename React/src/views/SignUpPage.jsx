import { Link, useNavigate } from "react-router-dom"
import styles from "../SignUpPage.module.css"
import SignUpComponent from "../components/SignUpComponent.jsx";

function SignUpPage(){


    return (
        <>
            <header className={styles.header}>
                <Link to="/" className={styles.title}>WorkFlow</Link>
            </header>
            <main className={styles.main}>
                <div className={styles.signUpDiv}>
                    <SignUpComponent role={"Manager"}/>
               </div>
            </main>
        </>
    );
}






export default SignUpPage;