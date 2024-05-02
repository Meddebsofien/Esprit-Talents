import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import CompanyTable from "../../components/company/companyTable/companyTable"
import StatisticsPage from "../../components/stats/statistiqueUser"
const Stat = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <StatisticsPage/>
        
      </div>
    </div>
  )
}

export default Stat