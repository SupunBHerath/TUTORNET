import TemPost from '../Components/TemPost'
import ViewIntroduction from '../Components/ViewIntroduction'

const ViewPost = () => {
    return (
        <div className='bg-body-tertiary'>
           <br /><br />
            <div className="tabs-container">
                <div className="intro-container">
                    <ViewIntroduction />
                </div>
                <div className="post-container bg-body-tertiary">
                    <TemPost />
                </div>
            </div>
        </div>
    )
}

export default ViewPost
