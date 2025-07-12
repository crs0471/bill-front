"use client";
import Nav from "@/app/components/nav/nav"
import Link from "next/link"
import { useForm } from 'react-hook-form';
import { ApiCaller } from '@/app/utils/apis';
import { redirect } from 'next/navigation'

export default function CompanyAddPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const resetForm = () => {
        document.getElementById("add_company_from").reset();
    };

    const submitAddCompany = async (data) => {
        const res = await ApiCaller.post('/company', data)
        if(res){
            redirect('/company');
        }
        
    }

    return (
        <>
            <Nav />
            <main className="container mt-3">
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h1>Add Company </h1>
                        <div className="d-flex justify-content-end">
                            <Link className="btn btn-sm btn-secondary" href="/company">Back</Link>
                        </div>
                    </div>
                    <div className="card-body">
                        <form className="add-company-form" id="add_company_from" onSubmit={handleSubmit((data) => submitAddCompany(data))}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Company Name</label>
                                <input type="text" className="form-control form-control-lg" id="name" placeholder="Company Name"
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
                                    {...register("gst_number",
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