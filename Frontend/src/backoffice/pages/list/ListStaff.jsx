import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import StaffTable from "../../components/staff/tableStafff/StaffTable"
const ListStaff = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <StaffTable/>
        
      </div>
    </div>
  )
}

export default ListStaff