"use client";
import Nav from "@/app/components/nav/nav"
import Link from "next/link"
import { useForm, Controller } from 'react-hook-form';
import { ApiCaller } from '@/app/utils/apis';
import { redirect } from 'next/navigation';
import Select from 'react-select'
import { useEffect, useState } from "react";

export default function ClientAddPage() {
    const [companyOptions, setCompanyOptions] = useState([])

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const fetchCompanies = async (data={}) => {
        let res = await ApiCaller.get('/company', data)
        const allCompany = res?.data || []
        const options = allCompany.map((company) => ({
            value: company.id,
            label: company.name,
        }))
        setCompanyOptions(options) 
    }

    useEffect(() => {
        fetchCompanies()
    }, [])


    const resetForm = () => {
        document.getElementById("add_client_from").reset();
    };

    const submitAddClient = async (data) => {
        const res = await ApiCaller.post('/client', data)
        if(res){
            redirect('/client');
        }
        
    }

    return (
        <>
            <Nav />
            <main className="container mt-3">
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h1>Add Client </h1>
                        <div className="d-flex justify-content-end">
                            <Link className="btn btn-sm btn-secondary" href="/client">Back</Link>
                        </div>
                    </div>
                    <div className="card-body">
                        <form className="add-company-form" id="add_client_from" onSubmit={handleSubmit((data) => submitAddClient(data))}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Company</label>
                                <Controller
                                    name="company_id"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={companyOptions}
                                            placeholder="Select Company"
                                            isClearable
                                            onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : null)}
                                        />
                                    )}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Client Name</label>
                                <input type="text" className="form-control form-control-lg" id="name" placeholder="Client Name"
                                    {...register("name",
                                        { required: true, }
                                    )} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="text" className="form-control form-control-lg" id="email" placeholder="name@example.com"
                                    {...register("email",
                                    )} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <input type="text" className="form-control form-control-lg" id="phone" placeholder="Phone Number"
                                    {...register("phone",
                                        { required: true, }
                                    )} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gst_number" className="form-label">GSTIN</label>
                                <input type="text" className="form-control form-control-lg" id="gst_number" placeholder="GSTIN"
                                    {...register("gstin",
                                        { required: true, }
                                    )} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <textarea type="text" className="form-control form-control-lg" id="address" placeholder="Address"
                                    {...register("address",
                                        { required: true, }
                                    )} />
                            </div>
                            <div className="mb-3 d-flex justify-content-end">
                                <button type="button" className="btn btn-danger btn-lg mb-2 me-2" onClick={() => resetForm()}>Reset</button>
                                <button type="submit" className="btn btn-primary btn-lg mb-2">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}