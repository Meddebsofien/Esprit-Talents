import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import StudentTable from "../../components/student/studentTable/studentTable"

const ListStudent = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <StudentTable/>
        
      </div>
    </div>
  )
}

export default ListStudent