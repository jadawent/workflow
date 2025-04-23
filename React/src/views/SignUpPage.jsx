import { Link, useNavigate } from "react-router-dom"
import styles from "../SignUpPage.module.css"
import SignUpComponent from "../components/SignUpComponent.jsx";

function SignUpPage(){


    return (
        <>
        <div className={styles.container}>
            <header className={styles.header}>
                <Link to="/" className={styles.title}>WorkFlow</Link>
            </header>
            <main className={styles.main}>
                <div className={styles.signUpDiv}>
                    <SignUpComponent initial={true}/>
               </div>
            </main>
        </div>
        </>
    );
}






export default SignUpPage;