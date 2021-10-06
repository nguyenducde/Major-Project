import React, { useState } from "react"
import { ClockCircleOutlined } from "@ant-design/icons"
import "../Default.css"

function FooterSection() {
  const [today, setDate] = useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 100)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="d-flex justify-content-start text_color-default align-items-center theme-color mt-1 container-fluid">
      <div className="d-flex align-items-center ">
        <ClockCircleOutlined />
        <span className="ms-1">
          {today.getHours()}:{today.getMinutes()}:{today.getSeconds()} |{" "}
          {today.getDate()}/{today.getMonth() + 1}/{today.getFullYear()}
        </span>
      </div>
      <div className="d-flex align-items-center ms-1 ">
        <div className="d-flex align-items-center footer_content pe-2">
          <span className=" ms-2 ">HOSE: </span>
          <span className="text-success">LO</span>
        </div>
        <div className="d-flex align-items-center footer_content pe-2 ms-2">
          <span className=" ms-2 ">HNX: </span>
          <span className="text-success">LO</span>
        </div>
        <div className="d-flex align-items-center footer_content pe-2 ms-2">
          <span className=" ms-2 ">UPCOM: </span>
          <span className="text-success">LO</span>
        </div>
        <div className="d-flex align-items-center footer_content pe-2 ms-2">
          <span className=" ms-2 ">DR: </span>
          <span className="text-success">LO</span>
        </div>
        <div className="d-flex align-items-center footer_content pe-2 ms-2">
          <span className=" ms-2 ">Hệ Thống: </span>
          <span className="text-success">Đã Kết nối</span>
        </div>
      </div>
    </div>
  )
}

export default FooterSection
