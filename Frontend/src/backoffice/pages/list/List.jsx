import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import CompanyTable from "../../components/company/companyTable/companyTable"
const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <CompanyTable/>
        
      </div>
    </div>
  )
}

export default List