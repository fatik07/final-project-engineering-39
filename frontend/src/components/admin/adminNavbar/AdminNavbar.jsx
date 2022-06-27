import React from "react";


function AdminNavbar(){
    return(
        <>
            <nav className="navbar fixed-top bg-light">
                <div className="container-fluid">
                    <div className="container-word">
                        <span className="text-ladang fs-3">Ladang </span>
                        <span className="text-materi fs-3">Materi</span>
                    </div>

                    <h3>Admin Page</h3>

                    <div className="container-nav">
                        <a class="navbar-brand" href="#">Data Table</a>
                        <a class="navbar-brand" href="#">Input Data</a>
                        <a class="navbar-brand" href="#">Log Out</a>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default AdminNavbar;