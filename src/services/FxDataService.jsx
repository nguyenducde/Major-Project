import sampleSize from "lodash/sampleSize"
import cloneDeep from "lodash/cloneDeep"

import StoreService from "./StoreService"
import { fxDataUpdated, fxTopMoversUpdated } from "../actions/fxDataActions"

import HorizontalBarComponent from "../components/renderers/HorizontalBarComponent.jsx"

function FxDataService() {
  function kickOffPeriodicUpdates() {
    setInterval(() => {
      this.applyDeltasToFxData()

      this.store.dispatch(fxDataUpdated(this.fxData))
    }, 1500)

    setInterval(() => {
      this.calculateTopMovers()

      this.store.dispatch(fxTopMoversUpdated(this.fxTopMovers))
    }, 2500)
  }

  /*
   * the rest of this class exists primarily to create mock data - it can safely be ignored
   * as it is secondary to the main ideas being demonstrated by the rest of the application
   */
  function calculateTopMovers() {
    let fxData = cloneDeep(this.fxData)
    fxData.sort((a, b) => {
      return Math.abs(b.pct_net_change) - Math.abs(a.pct_net_change)
    })

    this.fxTopMovers = fxData.slice(0, 20)
  }

  function applyDeltasToFxData() {
    let fxSymbolsToUpdate = sampleSize(
      FX_CURRENCY_SYMBOLS,
      FX_CURRENCY_SYMBOLS.length / 5
    )
    let rowsToUpdate = sampleSize(this.fxData, this.fxData.length / 5)
    for (let i = 0; i < rowsToUpdate.length; i++) {
      let row = rowsToUpdate[i]

      let maxSwing = row.last * 0.05 // max 5% swing
      let swing = Math.floor(this.random(-maxSwing, maxSwing))
      row.last = row.last + swing
      row.net = swing

      let multiplier = Math.random() * 10 > 5 ? -1 : 1
      row["pct_net_change"] =
        multiplier * (this.random(30, 100) / 100).toFixed(2)

      for (let symbolToUpdate of fxSymbolsToUpdate) {
        if (row[symbolToUpdate] === null) {
          continue
        }

        let multiplier = Math.random() * 10 > 8 ? -1 : 1
        row[symbolToUpdate] = (multiplier * Math.random()).toFixed(2)
      }
    }
  }

  function random(min, max) {
    return parseFloat(Math.random() * (max - min + 1) + min)
  }

  function getFxMatrixHeaderNames() {
    return FX_DELTA_HEADERS
  }

  function createFxMatrixSnapshot() {
    let columns = FX_CURRENCY_MATRIX[0]
    let data = FX_CURRENCY_MATRIX.slice(1)

    let rowData = []
    for (let i = 0; i < data.length; i++) {
      let currentRow = data[i]

      let row = {}
      for (let j = 0; j < columns.length; j++) {
        row[columns[j]] = currentRow[j]
      }

      // last, net and % change are different
      row["last"] = Math.floor(this.random(7000, 170000))
      row["net"] = Math.floor(this.random(-500, 500))

      let multiplier = Math.random() * 10 > 5 ? -1 : 1
      row["pct_net_change"] =
        multiplier * (this.random(30, 100) / 100).toFixed(2)

      rowData.push(row)
    }

    this.fxData = rowData
  }

  return <div></div>
}
const FX_CURRENCY_SYMBOLS = [
  "USDGBP",
  "USDEUR",
  "USDAED",
  "USDJPY",
  "USDCAD",
  "USDCHF",
  "GBPUSD",
  "GBPEUR",
  "GBPAED",
  "GBPJPY",
  "GBPCAD",
  "GBPCHF",
  "EURUSD",
  "EURGBP",
  "EURAED",
  "EURJPY",
  "EURCAD",
  "EURCHF",
  "AEDUSD",
  "AEDGBP",
  "AEDEUR",
  "AEDJPY",
  "AEDCAD",
  "AEDCHF",
  "JPYUSD",
  "JPYGBP",
  "JPYEUR",
  "JPYAED",
  "JPYCAD",
  "JPYCHF",
  "CADUSD",
  "CADGBP",
  "CADEUR",
  "CADAED",
  "CADJPY",
  "CADCHF",
  "CHFUSD",
  "CHFGBP",
  "CHFEUR",
  "CHFAED",
  "CHFJPY",
  "CHFCAD"
]
const FX_DELTA_HEADERS = [
  {
    field: "symbol",
    headerName: "Symbol",
    width: 80
  },
  {
    field: "last",
    headerName: "Last",
    headerClass: "align-right",
    cellRenderer: "agAnimateShowChangeCellRenderer",
    cellClass: "align-right",
    width: 100
  },
  {
    field: "net",
    headerName: "Net",
    headerClass: "align-right",
    cellRenderer: "agAnimateShowChangeCellRenderer",
    cellClass: "align-right",
    width: 90
  },
  {
    field: "pct_net_change",
    headerName: "% NC",
    cellRendererFramework: HorizontalBarComponent,
    width: 85
  }
].concat(
  FX_CURRENCY_SYMBOLS.map(symbol => {
    return {
      field: symbol,
      headerName: symbol,
      width: 67,
      cellClass: "align-right",
      cellRenderer: "agAnimateShowChangeCellRenderer",
      cellClassRules: {
        "fx-positive": "x > 0.8",
        "fx-null": "x === null",
        "fx-negative": "x < -0.8"
      }
    }
  })
)

const FX_CURRENCY_MATRIX = [
  ["symbol", ...FX_CURRENCY_SYMBOLS],
  [
    "USDGBP",
    null,
    "0.89",
    "-0.01",
    "0.29",
    "0.28",
    "-0.04",
    "0.47",
    "0.17",
    "0.20",
    "0.11",
    "0.97",
    "0.07",
    "-0.20",
    "0.57",
    "0.54",
    "0.26",
    "0.33",
    "0.86",
    "0.95",
    "0.39",
    "0.21",
    "-0.49",
    "0.63",
    "-0.13",
    "-0.86",
    "0.18",
    "-0.84",
    "-0.89",
    "0.05",
    "-0.29",
    "0.34",
    "0.93",
    "0.41",
    "0.13",
    "-0.17",
    "0.70",
    "-0.17",
    "0.60",
    "0.00",
    "0.09",
    "-0.15",
    "0.10"
  ],
  [
    "USDEUR",
    "0.89",
    null,
    "0.25",
    "0.29",
    "0.86",
    "-0.93",
    "0.09",
    "0.63",
    "0.76",
    "0.10",
    "0.51",
    "-0.31",
    "-0.51",
    "0.20",
    "0.48",
    "-0.42",
    "0.73",
    "0.57",
    "0.65",
    "0.40",
    "0.12",
    "0.24",
    "0.42",
    "0.75",
    "0.13",
    "0.75",
    "0.42",
    "-0.80",
    "-0.26",
    "0.68",
    "0.68",
    "0.98",
    "0.87",
    "0.48",
    "0.52",
    "0.23",
    "0.61",
    "0.71",
    "-0.61",
    "0.40",
    "-0.80",
    "-0.89"
  ],
  [
    "USDAED",
    "0.90",
    "0.95",
    null,
    "0.71",
    "0.49",
    "0.50",
    "0.51",
    "0.07",
    "0.80",
    "-0.74",
    "0.54",
    "0.46",
    "-0.90",
    "-0.33",
    "0.75",
    "0.91",
    "0.84",
    "0.86",
    "0.89",
    "0.68",
    "0.71",
    "0.74",
    "0.58",
    "-0.24",
    "0.31",
    "0.85",
    "0.28",
    "0.44",
    "0.51",
    "-0.19",
    "0.71",
    "0.81",
    "0.85",
    "0.23",
    "0.09",
    "0.65",
    "-0.48",
    "0.43",
    "0.97",
    "0.11",
    "-0.81",
    "-0.69"
  ],
  [
    "USDJPY",
    "0.84",
    "0.92",
    "0.36",
    null,
    "0.79",
    "0.90",
    "0.86",
    "0.42",
    "0.14",
    "0.98",
    "0.47",
    "0.76",
    "0.60",
    "0.15",
    "0.04",
    "0.58",
    "0.13",
    "-0.16",
    "0.63",
    "0.86",
    "-0.63",
    "-0.95",
    "0.42",
    "0.08",
    "0.90",
    "-0.39",
    "-0.16",
    "0.66",
    "0.95",
    "0.31",
    "0.66",
    "-0.84",
    "0.06",
    "-0.60",
    "0.08",
    "0.57",
    "0.93",
    "0.78",
    "0.15",
    "0.36",
    "0.78",
    "0.34"
  ],
  [
    "USDCAD",
    "0.79",
    "-0.87",
    "0.93",
    "0.83",
    null,
    "0.10",
    "0.60",
    "0.34",
    "0.98",
    "0.70",
    "0.09",
    "0.46",
    "0.80",
    "0.10",
    "0.26",
    "-0.90",
    "0.69",
    "-0.22",
    "0.51",
    "-0.75",
    "-0.08",
    "0.07",
    "0.24",
    "0.68",
    "0.60",
    "0.37",
    "0.92",
    "0.02",
    "0.66",
    "0.16",
    "0.24",
    "-0.79",
    "0.19",
    "0.19",
    "0.08",
    "-0.97",
    "-0.93",
    "0.04",
    "-0.92",
    "0.86",
    "-0.36",
    "0.04"
  ],
  [
    "USDCHF",
    "0.94",
    "-0.02",
    "0.70",
    "0.82",
    "0.41",
    null,
    "0.76",
    "0.06",
    "0.46",
    "0.99",
    "0.07",
    "0.72",
    "0.14",
    "0.90",
    "0.23",
    "-0.54",
    "0.64",
    "0.80",
    "0.16",
    "0.23",
    "0.66",
    "-0.89",
    "-0.54",
    "-0.95",
    "0.27",
    "0.56",
    "0.42",
    "0.41",
    "0.88",
    "0.81",
    "0.37",
    "0.75",
    "0.06",
    "-0.75",
    "0.98",
    "0.21",
    "0.01",
    "0.03",
    "0.35",
    "-0.42",
    "0.55",
    "0.19"
  ],
  [
    "GBPUSD",
    "0.05",
    "-0.64",
    "0.47",
    "0.56",
    "0.51",
    "-0.47",
    null,
    "-0.15",
    "0.13",
    "0.55",
    "0.58",
    "0.57",
    "-0.49",
    "0.28",
    "0.86",
    "0.49",
    "0.12",
    "-0.91",
    "0.06",
    "0.12",
    "0.18",
    "-0.02",
    "-0.55",
    "0.18",
    "0.29",
    "0.76",
    "0.11",
    "0.04",
    "0.55",
    "0.16",
    "0.84",
    "0.83",
    "-0.94",
    "0.32",
    "0.07",
    "-0.33",
    "-0.29",
    "0.01",
    "-0.19",
    "0.01",
    "-0.60",
    "0.66"
  ],
  [
    "GBPEUR",
    "-0.32",
    "0.17",
    "0.60",
    "-0.52",
    "-0.52",
    "0.39",
    "-0.42",
    null,
    "0.07",
    "0.69",
    "0.67",
    "0.01",
    "0.72",
    "0.35",
    "0.66",
    "-0.66",
    "0.21",
    "0.12",
    "0.42",
    "-0.57",
    "-0.04",
    "0.48",
    "0.91",
    "0.72",
    "-0.16",
    "0.79",
    "0.03",
    "0.44",
    "0.17",
    "0.87",
    "-0.82",
    "0.20",
    "0.88",
    "0.48",
    "0.59",
    "-0.70",
    "0.12",
    "0.56",
    "-0.69",
    "0.10",
    "0.90",
    "1.00"
  ],
  [
    "GBPAED",
    "0.76",
    "0.05",
    "0.72",
    "-0.40",
    "0.93",
    "0.64",
    "0.90",
    "0.21",
    null,
    "0.91",
    "0.33",
    "-0.36",
    "0.28",
    "0.87",
    "0.25",
    "0.33",
    "0.44",
    "0.89",
    "0.17",
    "0.96",
    "0.86",
    "0.88",
    "0.03",
    "-0.25",
    "0.21",
    "0.98",
    "-0.60",
    "0.07",
    "0.90",
    "0.23",
    "0.41",
    "0.77",
    "0.83",
    "0.94",
    "0.12",
    "0.37",
    "0.58",
    "0.35",
    "-0.53",
    "0.49",
    "0.96",
    "-0.06"
  ],
  [
    "GBPJPY",
    "0.63",
    "0.72",
    "0.59",
    "0.89",
    "-0.54",
    "0.97",
    "0.61",
    "0.64",
    "0.85",
    null,
    "0.35",
    "0.57",
    "0.25",
    "0.85",
    "0.27",
    "-0.70",
    "-0.30",
    "-0.36",
    "0.29",
    "0.82",
    "0.26",
    "0.69",
    "0.46",
    "0.01",
    "0.09",
    "0.78",
    "0.95",
    "0.16",
    "0.07",
    "0.41",
    "0.99",
    "0.67",
    "0.34",
    "-0.89",
    "0.83",
    "0.32",
    "0.21",
    "-0.48",
    "-0.64",
    "0.65",
    "0.58",
    "0.69"
  ],
  [
    "GBPCAD",
    "0.78",
    "0.09",
    "0.33",
    "0.11",
    "0.95",
    "0.01",
    "0.96",
    "0.72",
    "0.13",
    "0.02",
    null,
    "0.44",
    "0.63",
    "-0.52",
    "0.08",
    "-0.85",
    "0.74",
    "0.41",
    "0.52",
    "0.15",
    "-0.97",
    "0.61",
    "0.58",
    "0.47",
    "0.56",
    "0.37",
    "0.54",
    "-0.65",
    "0.98",
    "0.44",
    "0.28",
    "0.70",
    "0.44",
    "0.34",
    "0.95",
    "0.82",
    "-0.09",
    "0.62",
    "0.87",
    "0.25",
    "-1.00",
    "0.99"
  ],
  [
    "GBPCHF",
    "-0.87",
    "0.68",
    "0.84",
    "0.83",
    "0.50",
    "0.74",
    "0.02",
    "0.11",
    "-0.12",
    "0.36",
    "0.71",
    null,
    "0.45",
    "0.02",
    "0.51",
    "0.50",
    "-0.03",
    "-0.94",
    "0.23",
    "0.38",
    "0.09",
    "0.26",
    "0.14",
    "0.39",
    "0.36",
    "0.01",
    "0.76",
    "0.21",
    "0.03",
    "0.97",
    "-0.89",
    "0.68",
    "0.43",
    "0.43",
    "0.26",
    "0.01",
    "0.60",
    "0.15",
    "0.77",
    "0.51",
    "-0.31",
    "0.37"
  ],
  [
    "EURUSD",
    "-0.45",
    "-0.05",
    "0.14",
    "-0.11",
    "0.36",
    "0.12",
    "0.76",
    "0.66",
    "0.50",
    "0.31",
    "0.28",
    "0.90",
    null,
    "-0.04",
    "0.73",
    "0.33",
    "0.27",
    "0.22",
    "0.86",
    "0.79",
    "-0.29",
    "0.30",
    "0.89",
    "0.73",
    "0.94",
    "0.24",
    "0.19",
    "0.81",
    "0.88",
    "0.46",
    "0.19",
    "0.79",
    "-0.16",
    "0.85",
    "0.84",
    "-0.57",
    "-0.87",
    "0.86",
    "0.69",
    "0.12",
    "0.64",
    "0.13"
  ],
  [
    "EURGBP",
    "0.06",
    "0.81",
    "0.54",
    "0.57",
    "0.57",
    "0.81",
    "0.38",
    "0.70",
    "0.37",
    "0.58",
    "-0.56",
    "0.77",
    "0.59",
    null,
    "0.98",
    "-0.48",
    "0.60",
    "0.78",
    "0.22",
    "0.20",
    "-0.62",
    "-0.97",
    "-0.55",
    "0.39",
    "0.88",
    "0.96",
    "0.32",
    "0.84",
    "0.26",
    "-0.47",
    "0.04",
    "0.34",
    "-0.24",
    "0.53",
    "-0.75",
    "-0.97",
    "0.47",
    "0.81",
    "0.49",
    "-0.84",
    "0.94",
    "0.09"
  ],
  [
    "EURAED",
    "0.61",
    "0.59",
    "0.11",
    "0.21",
    "0.41",
    "-0.45",
    "0.32",
    "0.90",
    "-0.98",
    "0.38",
    "0.27",
    "0.62",
    "0.67",
    "0.89",
    null,
    "0.27",
    "0.65",
    "0.72",
    "0.69",
    "0.66",
    "0.12",
    "0.32",
    "0.11",
    "-0.73",
    "-0.17",
    "0.74",
    "0.03",
    "0.96",
    "0.59",
    "-0.92",
    "-0.91",
    "-0.41",
    "0.09",
    "0.45",
    "0.90",
    "0.88",
    "0.96",
    "0.47",
    "0.95",
    "0.27",
    "-0.48",
    "0.71"
  ],
  [
    "EURJPY",
    "-0.01",
    "0.36",
    "0.28",
    "0.68",
    "0.50",
    "0.25",
    "0.81",
    "0.64",
    "0.12",
    "-0.73",
    "-0.47",
    "0.96",
    "-0.98",
    "-0.41",
    "0.78",
    null,
    "0.19",
    "-0.37",
    "0.24",
    "0.63",
    "0.74",
    "-0.24",
    "0.46",
    "0.63",
    "0.99",
    "0.65",
    "0.52",
    "0.11",
    "0.52",
    "0.39",
    "0.41",
    "0.51",
    "0.78",
    "1.00",
    "0.80",
    "-0.11",
    "0.90",
    "0.96",
    "0.66",
    "0.32",
    "0.02",
    "0.19"
  ],
  [
    "EURCAD",
    "-0.80",
    "0.40",
    "0.35",
    "0.45",
    "0.66",
    "0.21",
    "0.77",
    "0.58",
    "0.09",
    "1.00",
    "0.02",
    "-0.85",
    "0.89",
    "0.63",
    "-0.05",
    "0.46",
    null,
    "0.87",
    "0.96",
    "-0.48",
    "0.40",
    "0.18",
    "0.37",
    "0.81",
    "0.50",
    "-0.06",
    "-0.56",
    "0.38",
    "0.02",
    "0.83",
    "-0.93",
    "0.80",
    "0.31",
    "0.10",
    "0.70",
    "0.55",
    "0.47",
    "0.77",
    "0.98",
    "0.88",
    "0.19",
    "0.91"
  ],
  [
    "EURCHF",
    "-0.93",
    "0.01",
    "-0.29",
    "0.46",
    "-0.59",
    "-0.15",
    "0.58",
    "0.00",
    "-0.62",
    "0.36",
    "0.27",
    "-0.10",
    "-0.10",
    "0.57",
    "0.57",
    "0.75",
    "-0.10",
    null,
    "0.88",
    "0.21",
    "0.89",
    "0.85",
    "0.16",
    "0.93",
    "0.60",
    "0.59",
    "0.42",
    "0.70",
    "0.66",
    "0.80",
    "0.83",
    "0.52",
    "0.01",
    "0.41",
    "0.68",
    "0.94",
    "0.81",
    "0.40",
    "0.69",
    "0.04",
    "0.70",
    "0.61"
  ],
  [
    "AEDUSD",
    "0.10",
    "0.45",
    "0.06",
    "-0.37",
    "-0.14",
    "0.63",
    "0.10",
    "0.77",
    "0.95",
    "-0.12",
    "1.00",
    "-0.19",
    "-0.59",
    "0.78",
    "0.10",
    "0.76",
    "-0.45",
    "-0.99",
    null,
    "-0.46",
    "0.28",
    "0.31",
    "0.32",
    "0.42",
    "-0.00",
    "0.66",
    "0.24",
    "0.31",
    "0.10",
    "0.73",
    "0.02",
    "0.78",
    "0.07",
    "1.00",
    "0.43",
    "0.61",
    "0.53",
    "0.53",
    "0.41",
    "0.37",
    "0.97",
    "-0.19"
  ],
  [
    "AEDGBP",
    "0.70",
    "0.73",
    "0.34",
    "0.97",
    "0.84",
    "0.05",
    "0.21",
    "0.14",
    "0.45",
    "0.69",
    "0.41",
    "-0.53",
    "0.28",
    "0.13",
    "0.99",
    "0.97",
    "0.93",
    "0.62",
    "0.35",
    null,
    "0.18",
    "0.96",
    "0.58",
    "0.04",
    "0.00",
    "0.58",
    "-0.54",
    "0.35",
    "0.84",
    "0.83",
    "-0.20",
    "0.51",
    "0.32",
    "0.01",
    "0.95",
    "0.69",
    "-0.73",
    "0.36",
    "0.78",
    "0.02",
    "0.22",
    "0.39"
  ],
  [
    "AEDEUR",
    "0.18",
    "0.84",
    "-0.89",
    "0.90",
    "-0.25",
    "0.53",
    "0.71",
    "0.80",
    "0.60",
    "-0.98",
    "-0.81",
    "0.57",
    "0.72",
    "0.32",
    "-0.23",
    "0.98",
    "0.50",
    "0.93",
    "0.56",
    "0.26",
    null,
    "0.61",
    "0.47",
    "0.72",
    "0.58",
    "0.19",
    "0.94",
    "0.21",
    "0.47",
    "0.70",
    "0.67",
    "0.85",
    "0.98",
    "0.15",
    "0.21",
    "0.43",
    "0.03",
    "0.92",
    "0.91",
    "0.35",
    "0.70",
    "0.85"
  ],
  [
    "AEDJPY",
    "0.88",
    "0.62",
    "0.50",
    "0.27",
    "0.56",
    "0.61",
    "0.06",
    "-0.02",
    "0.42",
    "0.26",
    "0.23",
    "0.83",
    "-0.55",
    "0.94",
    "0.01",
    "0.72",
    "-0.43",
    "0.10",
    "0.01",
    "-0.20",
    "0.13",
    null,
    "0.70",
    "0.10",
    "0.05",
    "0.43",
    "-0.14",
    "-0.64",
    "0.80",
    "0.79",
    "0.57",
    "0.14",
    "0.14",
    "0.04",
    "-0.96",
    "0.59",
    "0.14",
    "0.51",
    "0.23",
    "0.57",
    "0.94",
    "0.88"
  ],
  [
    "AEDCAD",
    "0.75",
    "-0.99",
    "0.82",
    "-0.87",
    "0.79",
    "1.00",
    "0.21",
    "0.30",
    "-0.40",
    "0.34",
    "-0.85",
    "0.41",
    "0.79",
    "0.17",
    "0.58",
    "-0.24",
    "0.18",
    "0.15",
    "0.18",
    "0.44",
    "0.34",
    "0.90",
    null,
    "0.10",
    "0.34",
    "0.31",
    "0.34",
    "0.79",
    "-0.05",
    "0.19",
    "-0.86",
    "0.61",
    "-0.65",
    "0.23",
    "0.59",
    "0.69",
    "-0.65",
    "0.89",
    "0.97",
    "0.12",
    "0.63",
    "-0.24"
  ],
  [
    "AEDCHF",
    "0.67",
    "0.46",
    "0.92",
    "0.22",
    "0.91",
    "0.67",
    "0.81",
    "0.04",
    "0.29",
    "0.13",
    "0.80",
    "0.95",
    "0.29",
    "0.99",
    "-0.17",
    "0.58",
    "0.64",
    "0.68",
    "0.41",
    "0.69",
    "0.84",
    "0.01",
    "0.04",
    null,
    "0.07",
    "0.16",
    "0.26",
    "-0.43",
    "0.08",
    "0.58",
    "0.33",
    "-0.28",
    "0.03",
    "-0.08",
    "0.54",
    "-0.91",
    "0.78",
    "-0.10",
    "-0.13",
    "0.15",
    "0.62",
    "-0.13"
  ],
  [
    "JPYUSD",
    "-0.67",
    "0.90",
    "0.84",
    "0.10",
    "0.77",
    "0.43",
    "0.59",
    "0.69",
    "0.63",
    "0.82",
    "-0.61",
    "0.41",
    "0.07",
    "0.48",
    "1.00",
    "-0.52",
    "0.22",
    "0.89",
    "0.43",
    "0.54",
    "0.56",
    "-0.43",
    "0.78",
    "0.67",
    null,
    "0.06",
    "0.28",
    "0.04",
    "0.62",
    "0.18",
    "0.77",
    "0.63",
    "0.05",
    "0.87",
    "0.22",
    "0.21",
    "0.07",
    "0.25",
    "-0.55",
    "0.67",
    "0.10",
    "-0.67"
  ],
  [
    "JPYGBP",
    "0.21",
    "0.46",
    "0.23",
    "0.53",
    "-0.97",
    "0.78",
    "0.43",
    "0.74",
    "-0.95",
    "0.98",
    "0.49",
    "0.66",
    "0.18",
    "0.55",
    "-0.33",
    "0.67",
    "0.65",
    "0.23",
    "-0.07",
    "-0.67",
    "0.56",
    "0.74",
    "-0.38",
    "-0.83",
    "-0.51",
    null,
    "-0.26",
    "-0.79",
    "0.73",
    "-0.78",
    "-0.09",
    "0.19",
    "0.48",
    "0.97",
    "0.11",
    "0.19",
    "0.51",
    "0.32",
    "0.81",
    "-0.02",
    "0.17",
    "0.48"
  ],
  [
    "JPYEUR",
    "0.83",
    "0.86",
    "0.62",
    "-0.92",
    "0.64",
    "0.58",
    "0.55",
    "0.07",
    "0.81",
    "0.32",
    "0.33",
    "0.96",
    "0.48",
    "0.57",
    "0.25",
    "0.56",
    "0.33",
    "0.02",
    "-0.79",
    "0.44",
    "0.95",
    "0.35",
    "0.41",
    "0.06",
    "0.28",
    "0.77",
    null,
    "0.64",
    "0.79",
    "0.74",
    "0.67",
    "-0.97",
    "0.47",
    "-0.11",
    "0.03",
    "0.39",
    "-0.37",
    "0.06",
    "0.09",
    "0.13",
    "0.20",
    "0.87"
  ],
  [
    "JPYAED",
    "0.69",
    "0.80",
    "0.90",
    "0.06",
    "0.55",
    "0.90",
    "-0.09",
    "0.05",
    "-0.10",
    "0.31",
    "0.57",
    "0.69",
    "-0.78",
    "0.42",
    "0.64",
    "0.96",
    "0.08",
    "-0.76",
    "0.59",
    "0.00",
    "0.40",
    "-0.88",
    "0.69",
    "0.17",
    "-0.16",
    "0.57",
    "0.86",
    null,
    "-0.61",
    "-0.14",
    "0.41",
    "-0.16",
    "0.36",
    "0.95",
    "0.44",
    "0.41",
    "0.35",
    "-0.56",
    "0.25",
    "0.66",
    "0.90",
    "0.82"
  ],
  [
    "JPYCAD",
    "0.33",
    "0.27",
    "0.61",
    "0.01",
    "-0.16",
    "0.21",
    "0.57",
    "-0.41",
    "-0.56",
    "0.55",
    "0.13",
    "-0.87",
    "0.19",
    "0.64",
    "-0.38",
    "-0.80",
    "-0.10",
    "0.44",
    "0.72",
    "-0.72",
    "0.48",
    "0.42",
    "0.84",
    "0.73",
    "0.35",
    "0.68",
    "0.01",
    "0.09",
    null,
    "0.87",
    "0.17",
    "0.45",
    "0.02",
    "0.01",
    "0.77",
    "0.24",
    "0.62",
    "0.39",
    "-0.73",
    "0.21",
    "-0.08",
    "0.42"
  ],
  [
    "JPYCHF",
    "-0.45",
    "0.52",
    "0.34",
    "0.85",
    "0.16",
    "0.96",
    "0.53",
    "0.62",
    "0.46",
    "0.94",
    "0.08",
    "-0.68",
    "0.81",
    "0.44",
    "0.27",
    "0.75",
    "-0.84",
    "0.69",
    "-0.99",
    "0.41",
    "0.66",
    "-0.94",
    "0.21",
    "0.85",
    "-0.08",
    "0.36",
    "0.62",
    "0.25",
    "-0.48",
    null,
    "0.51",
    "-0.39",
    "0.60",
    "0.63",
    "0.68",
    "0.10",
    "0.62",
    "0.68",
    "0.00",
    "0.24",
    "0.61",
    "0.23"
  ],
  [
    "CADUSD",
    "-0.65",
    "0.73",
    "0.93",
    "0.27",
    "-0.00",
    "-0.46",
    "0.53",
    "0.36",
    "0.83",
    "0.58",
    "0.40",
    "0.03",
    "0.32",
    "0.38",
    "-0.53",
    "0.86",
    "0.42",
    "0.90",
    "0.83",
    "0.94",
    "0.34",
    "-0.56",
    "0.46",
    "-0.72",
    "0.13",
    "0.08",
    "0.25",
    "0.59",
    "0.75",
    "0.72",
    null,
    "0.62",
    "0.73",
    "0.52",
    "0.28",
    "0.03",
    "-0.54",
    "0.50",
    "0.76",
    "-0.28",
    "0.89",
    "0.97"
  ],
  [
    "CADGBP",
    "0.74",
    "0.58",
    "0.55",
    "0.01",
    "0.33",
    "0.61",
    "0.75",
    "0.86",
    "-0.87",
    "0.50",
    "0.57",
    "0.84",
    "-0.34",
    "1.00",
    "0.77",
    "0.75",
    "0.40",
    "0.12",
    "-0.57",
    "-0.16",
    "-0.91",
    "0.06",
    "0.67",
    "-0.55",
    "0.02",
    "0.78",
    "0.57",
    "0.70",
    "0.21",
    "0.95",
    "-0.91",
    null,
    "-0.82",
    "0.71",
    "0.36",
    "0.46",
    "0.46",
    "0.24",
    "0.15",
    "0.54",
    "0.15",
    "0.83"
  ],
  [
    "CADEUR",
    "-0.58",
    "0.29",
    "0.03",
    "0.70",
    "0.77",
    "0.80",
    "0.52",
    "0.04",
    "0.11",
    "0.86",
    "-0.98",
    "0.02",
    "0.01",
    "-0.19",
    "-0.48",
    "0.80",
    "0.90",
    "0.10",
    "0.28",
    "0.88",
    "0.98",
    "0.43",
    "0.47",
    "-0.41",
    "-0.92",
    "0.49",
    "0.64",
    "-0.60",
    "0.11",
    "0.61",
    "0.19",
    "-0.39",
    null,
    "-0.21",
    "0.56",
    "-0.45",
    "-0.48",
    "0.51",
    "0.04",
    "-0.44",
    "-0.22",
    "-0.29"
  ],
  [
    "CADAED",
    "0.07",
    "0.55",
    "0.99",
    "-0.41",
    "0.65",
    "0.75",
    "0.97",
    "0.74",
    "0.65",
    "0.37",
    "-0.04",
    "0.85",
    "0.83",
    "0.25",
    "0.14",
    "-0.00",
    "0.80",
    "0.78",
    "-0.42",
    "0.54",
    "-0.42",
    "-0.07",
    "-0.62",
    "0.56",
    "0.89",
    "0.92",
    "0.19",
    "0.64",
    "0.45",
    "0.24",
    "0.97",
    "0.41",
    "0.36",
    null,
    "-0.54",
    "-0.85",
    "-0.68",
    "0.48",
    "0.13",
    "0.61",
    "0.75",
    "0.21"
  ],
  [
    "CADJPY",
    "-0.84",
    "0.71",
    "0.59",
    "-0.78",
    "0.92",
    "0.93",
    "0.03",
    "0.27",
    "0.22",
    "0.71",
    "-0.79",
    "0.72",
    "0.27",
    "0.29",
    "0.40",
    "0.66",
    "0.44",
    "-0.33",
    "0.24",
    "0.99",
    "-0.95",
    "0.74",
    "0.42",
    "0.45",
    "0.08",
    "0.46",
    "0.22",
    "0.70",
    "0.80",
    "0.36",
    "0.36",
    "0.94",
    "0.75",
    "0.51",
    null,
    "0.10",
    "0.31",
    "0.54",
    "1.00",
    "0.78",
    "0.17",
    "0.32"
  ],
  [
    "CADCHF",
    "0.19",
    "0.00",
    "0.62",
    "-0.63",
    "0.75",
    "0.57",
    "0.28",
    "-0.98",
    "0.17",
    "-0.63",
    "0.09",
    "0.10",
    "-0.09",
    "0.22",
    "0.65",
    "0.20",
    "0.27",
    "-0.66",
    "-0.70",
    "0.72",
    "0.40",
    "0.96",
    "0.52",
    "0.38",
    "0.96",
    "0.90",
    "0.35",
    "-0.70",
    "0.37",
    "0.94",
    "0.20",
    "0.78",
    "0.34",
    "0.24",
    "-0.18",
    null,
    "0.05",
    "0.71",
    "0.05",
    "0.38",
    "0.02",
    "0.60"
  ],
  [
    "CHFUSD",
    "0.42",
    "0.61",
    "-0.30",
    "-0.27",
    "0.46",
    "0.63",
    "0.64",
    "0.33",
    "0.18",
    "0.88",
    "0.99",
    "0.73",
    "0.85",
    "0.07",
    "0.53",
    "0.31",
    "-0.63",
    "0.56",
    "-0.04",
    "-0.68",
    "0.43",
    "-0.96",
    "0.45",
    "0.45",
    "0.50",
    "0.17",
    "0.82",
    "0.34",
    "0.26",
    "0.16",
    "0.71",
    "0.35",
    "0.57",
    "0.79",
    "0.56",
    "0.55",
    null,
    "0.02",
    "-0.90",
    "0.84",
    "0.33",
    "0.18"
  ],
  [
    "CHFGBP",
    "-0.38",
    "0.73",
    "0.25",
    "0.64",
    "0.41",
    "-0.48",
    "0.75",
    "-0.40",
    "0.37",
    "0.62",
    "0.30",
    "0.06",
    "0.54",
    "0.15",
    "0.51",
    "0.33",
    "-0.79",
    "-0.05",
    "-0.54",
    "0.21",
    "0.40",
    "0.86",
    "0.96",
    "0.94",
    "0.52",
    "0.07",
    "0.71",
    "-0.80",
    "-0.40",
    "0.71",
    "0.71",
    "0.89",
    "0.43",
    "-0.68",
    "0.93",
    "0.05",
    "0.42",
    null,
    "0.59",
    "-0.67",
    "0.03",
    "0.17"
  ],
  [
    "CHFEUR",
    "-0.64",
    "0.96",
    "-0.34",
    "0.71",
    "0.53",
    "0.44",
    "0.27",
    "0.56",
    "0.96",
    "0.40",
    "0.86",
    "0.65",
    "0.82",
    "0.89",
    "-0.75",
    "0.29",
    "0.06",
    "0.70",
    "0.23",
    "0.68",
    "0.79",
    "0.21",
    "0.50",
    "0.14",
    "-0.27",
    "-0.83",
    "-0.22",
    "0.59",
    "0.40",
    "0.10",
    "0.88",
    "0.99",
    "0.21",
    "-0.36",
    "0.00",
    "0.53",
    "0.08",
    "0.08",
    null,
    "0.53",
    "-0.51",
    "0.03"
  ],
  [
    "CHFAED",
    "-0.99",
    "0.71",
    "0.51",
    "0.58",
    "0.57",
    "0.73",
    "0.60",
    "0.23",
    "0.02",
    "0.84",
    "0.90",
    "0.56",
    "0.03",
    "-0.93",
    "0.59",
    "0.24",
    "-0.67",
    "0.13",
    "0.99",
    "0.28",
    "0.72",
    "0.79",
    "-0.83",
    "-0.30",
    "0.73",
    "0.08",
    "-0.02",
    "0.85",
    "0.33",
    "0.57",
    "0.09",
    "0.26",
    "0.16",
    "0.80",
    "0.65",
    "-0.19",
    "-0.38",
    "-0.61",
    "-0.98",
    null,
    "0.57",
    "-0.81"
  ],
  [
    "CHFJPY",
    "0.60",
    "0.96",
    "0.22",
    "0.52",
    "0.63",
    "0.24",
    "0.76",
    "0.91",
    "0.80",
    "-0.14",
    "0.59",
    "-0.01",
    "0.60",
    "-0.08",
    "0.63",
    "0.39",
    "0.30",
    "-0.71",
    "0.18",
    "0.94",
    "-0.30",
    "0.28",
    "0.87",
    "0.92",
    "-0.19",
    "0.18",
    "-0.40",
    "0.44",
    "0.88",
    "0.52",
    "0.50",
    "0.44",
    "0.84",
    "0.24",
    "0.09",
    "0.15",
    "0.10",
    "0.30",
    "-0.05",
    "0.79",
    null,
    "0.99"
  ],
  [
    "CHFCAD",
    "0.93",
    "0.24",
    "0.05",
    "0.40",
    "0.75",
    "0.12",
    "0.90",
    "0.56",
    "0.46",
    "0.62",
    "0.71",
    "0.01",
    "0.04",
    "0.02",
    "0.49",
    "0.51",
    "-0.94",
    "0.93",
    "0.80",
    "-0.40",
    "0.79",
    "0.82",
    "-0.04",
    "0.38",
    "-0.24",
    "-0.17",
    "0.78",
    "-0.42",
    "0.92",
    "-0.83",
    "-0.01",
    "0.54",
    "0.73",
    "0.52",
    "0.95",
    "0.44",
    "0.90",
    "0.81",
    "0.42",
    "0.26",
    "0.36",
    null
  ]
]

export default FxDataService
