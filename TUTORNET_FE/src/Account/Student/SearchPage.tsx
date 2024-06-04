import TopTeachers from './Componets/TopSir/TopTeacher'
import SNavi_Bar from './Componets/Nav_bar/Navi_Bar'

const SearchPage = () => {
  return (
    <div>
        <SNavi_Bar/>

        <div className="container mt-5">
        <TopTeachers/>

        </div>
    </div>
  )
}

export default SearchPage
