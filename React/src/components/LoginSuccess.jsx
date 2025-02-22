import React, {useState} from 'react';
import styles from "../LoginSuccess.module.css"
import {Link} from 'react-router-dom';
import LogoutButton from './LogoutButton'

export default function LoginSuccess() {
   return (
           <>
               <header className={styles.header}>
                   <Link to="/" className={styles.title}>WorkFlow</Link>
                   <LogoutButton/>
               </header>
               <main className={styles.main}>
                   <div className={styles.loginDiv}>
                       <p className={styles.caption}>You have logged in.</p>
                   </div>
               </main>
           </>
     );
}
