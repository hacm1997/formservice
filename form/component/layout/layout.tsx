import React from "react";
import Head from "next/head";
import styles from "./styles.module.css";
import Form from "../content/form";

export default function Layout({children}: any) {
    return (
        <>
        <div className={styles.content}>
            <Head>
                <title>Form service</title>
            </Head>

            <Form/>

            {children}

        </div>
        </>
    )
}