import logo from '../../../public/imgs/bill.png'
import Image from 'next/image'
import Link from 'next/link'
import { clearLocalStorage } from '@/app/utils/helper'

export default function Nav() {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <Image src={logo} alt="Bootstrap" width="30" height="30" />
                <h5>Biller</h5>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Biller</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/company">Companies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/client">Clients</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => clearLocalStorage()}>Logout</button>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                            </a>
                            <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        </ul>
                        <form className="d-flex mt-3" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                    </div>
            </div>
        </nav>
    )
}