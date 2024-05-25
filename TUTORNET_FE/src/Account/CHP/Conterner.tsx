import  { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'aos/dist/aos.js'
export default function Conterner(prop: any) {
    useEffect(() => {
        AOS.init({
            duration: 2000,
        })

    })
    return (

        <div>

            <div className="container col-xxl-8 px-4  mt-5  " >
                <br /><br />
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5 ">
                    <div className="col-10 col-sm-8 col-lg-6" data-aos={prop.aos1}>
                        <img src={prop.img} className="d-block mx-lg-auto img-fluid" alt="Loading" width="700" height="500" loading="lazy" />
                    </div>
                    <div className="col-lg-6  "  data-aos={prop.aos2}>
                        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 " id="conTitle">{prop.title}</h1>
                        <p className="lead text-center ">{prop.description}</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-center "  data-aos={prop.aos3}>
                            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Login</button>
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
