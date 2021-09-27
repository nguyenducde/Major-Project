import React from "react"
import "antd/dist/antd.css"
import { Input, Button } from "antd"
import { Select } from "antd"
import {
  CaretRightOutlined,
  MenuOutlined,
  ArrowDownOutlined
} from "@ant-design/icons"
import "../Default.css"

const { Option } = Select
const { Search } = Input

function BoardFilter() {
  function handleChange(value) {
    console.log(`selected ${value}`)
  }
  const onSearch = value => console.log(value)
  return (
    <div className="d-flex container-fluid justify-content-between py-2">
      <div className="d-flex align-items-center">
        <Search
          placeholder="Mã CK"
          onSearch={onSearch}
          enterButton
          style={{ maxWidth: 170 }}
          className="mx-1"
        />
        {/* SelectItem */}

        <Select
          defaultValue="Danh sách"
          style={{ maxWidth: 120 }}
          onChange={handleChange}
          className="mx-1"
        >
          <Option value="jack">Danh sách</Option>
          <Option value="lucy">Lucy</Option>
        </Select>
        {/* SelectItem */}
        <Select
          defaultValue="VN30"
          style={{ maxWidth: 120 }}
          onChange={handleChange}
          className="mx-1"
        >
          <Option value="jack">VN30</Option>
          <Option value="lucy">Lucy</Option>
        </Select>
        {/* SelectItem */}
        <Select
          defaultValue="HNX"
          style={{ maxWidth: 120 }}
          onChange={handleChange}
          className="mx-1"
        >
          <Option value="jack">HNX</Option>
          <Option value="lucy">Lucy</Option>
        </Select>
        {/* SelectItem */}
        <Button className="bg-primary text_color-default">UPCOM</Button>
        {/* SelectItem */}
        <Select
          defaultValue="Phát sinh"
          style={{ maxWidth: 120 }}
          onChange={handleChange}
          className="mx-1"
        >
          <Option value="jack">Phát sinh</Option>
          <Option value="lucy">Lucy</Option>
        </Select>
        {/* SelectItem */}
        <Button>Chứng quyền</Button>
        {/* SelectItem */}
        <Select
          defaultValue="Thỏa Thuận"
          style={{ maxWidth: 120 }}
          onChange={handleChange}
          className="mx-1"
        >
          <Option value="jack">Thỏa Thuận</Option>
          <Option value="lucy">Lucy</Option>
        </Select>
        {/* SelectItem */}
        <Select
          defaultValue="Lô Lẽ"
          style={{ maxWidth: 120 }}
          onChange={handleChange}
          className="mx-1"
        >
          <Option value="jack">Lô Lẽ</Option>
          <Option value="lucy">Lucy</Option>
        </Select>
      </div>

      <div className="d-flex align-items-center">
        <Button
          icon={<CaretRightOutlined />}
          className="mx-1 theme-color text_color-default "
        />
        <Button
          icon={<MenuOutlined />}
          className="mx-1 theme-color text_color-default"
        />
        <Button
          icon={<ArrowDownOutlined />}
          className="mx-1 theme-color text_color-default"
        />
      </div>
    </div>
  )
}

export default BoardFilter
