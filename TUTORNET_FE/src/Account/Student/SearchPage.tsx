import TopTeachers from './Componets/TopSir/TopTeacher'
import Navi_Bar from './Componets/Nav_bar/Navi_Bar'

const SearchPage = () => {
  return (
    <div>
        <Navi_Bar/>

        <div className="container mt-5">
        <TopTeachers/>

        </div>
    </div>
  )
}

export default SearchPage
