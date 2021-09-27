import Header from "./components/headers/Header"
import IndexSliderContainer from "./components/boards/IndexSliderContainer"
import BoardFilter from "./components/boards/BoardFilter"
import BoardSection from "./components/boards/BoardSection"
import FooterSection from "./components/footerSection/FooterSection"
import socketClusterClient from "socketcluster-client"

function App() {
  let socket = socketClusterClient.create({
    hostname: "localhost",
    port: 8000
  })

  ;(async () => {
    for await (let { error } of socket.listener("error")) {
      console.error(error)
    }
  })()
  ;(async () => {
    for await (let event of socket.listener("connect")) {
      console.log("Socket is connected")
    }
  })()
  socket.transmit("customRemoteEvent", "á á á ")
  return (
    <div className="App">
      <Header />
      <IndexSliderContainer />
      <BoardFilter />
      <BoardSection />
      <FooterSection />
    </div>
  )
}

export default App
