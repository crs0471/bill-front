"use client";
import Nav from "@/app/components/nav/nav"
import Link from "next/link"
import { useForm } from 'react-hook-form';
import { ApiCaller } from '@/app/utils/apis';
import { redirect, usePathname } from 'next/navigation';
import { useState, useEffect } from "react";

import FormSkeleton from "@/app/components/skeletons/formSkeleton";

export default function EditCompanyPage() {

    const [loading, setLoading] = useState(true)

    const {
      register,
      setValue,
      getValues,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const pathname = usePathname()
    

    useEffect(() => {
        const companyId = pathname.split('/').pop()
        ApiCaller.get(`/company/${companyId}`).then((companyData) => {
          if (companyData?.status !== 'success') {
            redirect('/company');
          }
          else {
            setValue('name', companyData.data.name)
            setValue('email', companyData.data.email)
            setValue('phone', companyData.data.phone)
            setValue('gst_number', companyData.data.gst_number)
            setValue('address', companyData.data.address)
            setLoading(false)
          }
        })

      }, [])

    const resetForm = () => {
        document.getElementById("edit_company_from").reset();
    };

    const submitEditCompany = async (data) => {
        const companyId = pathname.split('/').pop()
        const res = await ApiCaller.patch(`/company/${companyId}`, data)
        if(res){
            redirect('/company');
        }
    }

    return (
      <>
            <Nav />
            <main className="container mt-3">
                {
                   loading ? 
                   <FormSkeleton /> : 
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h1>Edit Company </h1>
                        <div className="d-flex justify-content-end">
                            <Link className="btn btn-sm btn-secondary" href="/company">Back</Link>
                        </div>
                    </div>
                    <div className="card-body">
                        <form className="add-company-form" id="edit_company_from" onSubmit={handleSubmit((data) => submitEditCompany(data))}>
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
                }
            </main>
        </>
    )
}
