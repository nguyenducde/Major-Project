import React, { useEffect, useState } from "react"
import { AgGridColumn, AgGridReact } from "ag-grid-react"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css"
import symbolApi from "../../../services/api/symbolApi"
import "../Default.css"
import { Modal } from "antd"

function BoardSection() {
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [data, setData] = useState([])

  //Fetch data
  useEffect(() => {
    ;(async () => {
      try {
        const results = await symbolApi.getAll()
        setData(results)
      } catch (error) {
        console.log("Failed to fetch price", error)
      }
    })()
  }, [data])

  const rowData = [...data]
  //Fake @@
  for (var i in rowData) {
    if (rowData[i].re != null)
      rowData[i].re = parseFloat(rowData[i].re / 1000).toFixed(2)
    if (rowData[i].ce != null)
      rowData[i].ce = parseFloat(rowData[i].ce / 1000).toFixed(2)
    if (rowData[i].fl != null)
      rowData[i].fl = parseFloat(rowData[i].fl / 1000).toFixed(2)
  }
  //end fetch data

  const showModal = e => {
    setVisible(true)
    console.log(e.value)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    console.log("Clicked cancel button")
    setVisible(false)
  }

  const onCellClicked = CellClickedEvent => {
    showModal(CellClickedEvent)
  }
  function ScollAuto() {}
  
  // Style cell table
  const staticCellStyleRE = {
    color: "fuchsia",
    "background-color": "rgb(45,45,45)",
    "font-size": "1rem"
  }
  const staticCellStyleCE = {
    color: "darkturquoise",
    "background-color": "rgb(45,45,45)",
    "font-size": "1rem"
  }
  const staticCellStyleFE = {
    color: "gold",
    "background-color": "rgb(45,45,45)",
    "font-size": "1rem"
  }
  const staticCellStylePointer = {
    cursor: "pointer",
    "background-color": "rgb(21,23,27)",
    "font-size": "1rem"
  }
//end style table
  return (
    <div className="ag-theme-alpine-dark board_selection">
      <AgGridReact rowData={rowData}>
        <AgGridColumn
          field="s"
          headerName="Mã CK"
          width="80"
          onCellClicked={onCellClicked}
          cellStyle={staticCellStylePointer}
        ></AgGridColumn>
        <AgGridColumn
          field="re"
          headerName="TC"
          width="80"
          sortable={true}
          cellStyle={staticCellStyleRE}
        ></AgGridColumn>
        <AgGridColumn
          field="ce"
          headerName="Trần"
          width="80"
          sortable={true}
          cellStyle={staticCellStyleCE}
        ></AgGridColumn>
        <AgGridColumn
          field="fl"
          headerName="Sàn"
          width="80"
          sortable={true}
          cellStyle={staticCellStyleFE}
        ></AgGridColumn>
      </AgGridReact>
      <Modal
        visible={visible}
        centered="true"
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1200}
      >
        <div className="d-flex">
          <div>á</div>
          <div>á</div>
          <div>á</div>
          <div>á</div>
        </div>
      </Modal>
    </div>
  )
}

export default BoardSection
