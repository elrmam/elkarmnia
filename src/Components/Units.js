import { Link } from "react-router-dom";

function Unit() {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <h1 className="darkgray fw-bold rounded sectionehead my-5 p-3">
                        CARMENIA REAL ESTATE
                    </h1>
                </div>
            </div>
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                    <img className="herologo rounded float-center float-image mt-5 mb-5" src="/logoshadow.png" alt="discribsion" />
                </div>
            </div>
            <div className="row justify-content-center">
                <Link to="/Apartments" className="col-lg-2 col-md-4 col-sm-12 rounded-4 units p-2 mx-2 mb-4 d-flex justify-content-center align-items-center text-decoration-none" >
                    <h3 className="yellow m-0 my-5">شقق</h3>
                </Link>
                <Link to="/Houses" className="col-lg-2 col-md-4 col-sm-12 rounded-4 units p-2 mx-2 mb-4 d-flex justify-content-center align-items-center text-decoration-none" >
                    <h3 className="yellow m-0 mx-5 my-5">بيوت</h3>
                </Link>
                <Link to="/Chalets" className="col-lg-2 col-md-4 col-sm-12 rounded-4 units p-2 mx-2 mb-4 d-flex justify-content-center align-items-center text-decoration-none" >
                    <h3 className="yellow m-0 my-5">شاليهات</h3>
                </Link>
            </div>
            <div className="row justify-content-center">
                <Link to="/Shops" className="col-lg-2 col-md-4 col-sm-12 rounded-4 units p-2 mx-2 mb-4 d-flex justify-content-center align-items-center text-decoration-none" >
                    <h3 className="yellow m-0 my-5">محلات</h3>
                </Link>
                <Link to="/Offices" className="col-lg-2 col-md-4 col-sm-12 rounded-4 units p-2 mx-2 mb-4 d-flex justify-content-center align-items-center text-decoration-none" >
                    <h3 className="yellow m-0 mx-5 my-5">إدارى</h3>
                </Link>
                <Link to="/Lands" className="col-lg-2 col-md-4 col-sm-12 rounded-4 units p-2 mx-2 mb-4 d-flex justify-content-center align-items-center text-decoration-none" >
                    <h3 className="yellow m-0 my-5">أراضى</h3>
                </Link>
            </div>
            <div className="row justify-content-center">
                <Link to="/Buildings" className="col-lg-2 col-md-4 col-sm-12 rounded-4 units p-2 mx-2 mb-4 d-flex justify-content-center align-items-center text-decoration-none" >
                    <h3 className="yellow m-0 my-5">بنايات</h3>
                </Link>
            </div>
        </div>
    );
}

export default Unit;
