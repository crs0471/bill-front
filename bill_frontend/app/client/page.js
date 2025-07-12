"use client";
import Nav from "../components/nav/nav"
import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form';

import Link from "next/link";
import { ApiCaller } from "../utils/apis";

export default function Clients() {
    const [clients, setClient] = useState([])
    const [companies, setCompanies] = useState([])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchCompanies = async (data={}) => {
        let res = await ApiCaller.get('/company', data)
        setCompanies(res.data || [])
    }

    const fetchClients = async (data={}) => {
        let res = await ApiCaller.get('/client', data)
        setClient(res.data || [])
    }

    const deleteHandle = (id) => async () => {
        await ApiCaller.delete(`/client/${id}`)
        await fetchClients()
    }

    useEffect(() => {
        fetchCompanies().then((companies) => {
            fetchClients()
        })
    }, [])

    return (
        <>
            <Nav />
            <main className="container mt-3">
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h1>Clients</h1>
                        <div className="d-flex justify-content-end">
                            <input className="form-control search me-1" type="search" placeholder="Search" aria-label="Search" {...register("search")}/>
                            <button className="btn btn btn-sm btn-outline-success me-1" onClick={handleSubmit((data) => fetchCompanies(data))}><i className="ri-search-2-line"></i></button>
                            <Link className="btn btn-sm btn-outline-primary" href="/client/add">Add</Link>
                        </div>
                    </div>
                    <div className="card-body scroll-y">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Actons</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">GST</th>
                                    <th scope="col">Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((company, index) => (
                                    <tr key={company.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td className="d-flex">
                                            <Link href={'/company/edit/'+company.id} className="me-2 btn table-btn btn-sm btn-outline-primary"><i className="ri-edit-2-line"></i></Link>
                                            <button onClick={deleteHandle(company.id)} className="btn table-btn btn-sm btn-outline-danger"><i className="ri-delete-bin-5-line"></i></button>
                                        </td>
                                        <td className="text-nowrap">{company.name}</td>
                                        <td className="text-truncate">{company.email}</td>
                                        <td className="text-truncate">{company.phone}</td>
                                        <td>{company.gst_number}</td>
                                        <td className="text-truncate" data-toggle="tooltip" data-placement="top" title={company.address}>{company.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )
}