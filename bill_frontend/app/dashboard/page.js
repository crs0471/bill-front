"use client";
import { clearLocalStorage } from "../utils/helper"
import { redirect } from "next/navigation"
import { useEffect } from 'react';
import Nav from "../components/nav/nav";

export default function Dashboard() {
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if(!accessToken){
            redirect('/login')
        }
    }, [])
    
    return (
        <div>
            <Nav />
            <h1>Dashboard</h1>
            <button onClick={() => clearLocalStorage()}
            >Logout</button>
        </div>
    )
}