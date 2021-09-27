import React from "react"
import "../Default.css"
import "antd/dist/antd.css"
import { Input, Space, Button } from "antd"
import { LoginOutlined } from "@ant-design/icons"

const { Search } = Input

function Header() {
  const onSearch = value => console.log(value)
  return (
    <div className="theme-color py-1">
      <div className="container-fluid ">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="">
            <img
              src="https://mastrade.masvn.com/injectable/logo.svg"
              alt=""
              sizes=""
              srcset=""
            />
            <Button className="bg-warning text-white">Bảng giá</Button>
          </div>
          <div className="d-flex  align-items-center">
            <Search
              placeholder="Mã CK"
              onSearch={onSearch}
              enterButton
              style={{ maxWidth: 170 }}
              className="m-1"
            />
            <img
              src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fdongphucsongphu.com%2Fla-co-viet-nam-vector-1.png&imgrefurl=https%3A%2F%2Fdongphucsongphu.com%2Fao-co-viet-nam%2Fla-co-viet-nam-png.html&tbnid=wl_QwZFg-Fd6qM&vet=12ahUKEwjJn7XJ_-7yAhULAaYKHWWUAWIQMygAegUIARCvAQ..i&docid=m4F1hBnenu1oNM&w=640&h=426&q=c%E1%BB%9D%20vi%E1%BB%87t%20nam%20logo&hl=vi&ved=2ahUKEwjJn7XJ_-7yAhULAaYKHWWUAWIQMygAegUIARCvAQ"
              alt=""
              sizes=""
              srcset=""
            />
            <Button
              className="text-white bg-dark"
              shape="round"
              icon={<LoginOutlined />}
            >
              Đăng nhập
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
