import React from 'react'
import BoardFilter from './boards/BoardFilter.jsx'
import BoardSelection from './boards/BoardSection'
import Headers from './headers/Header'
import Footers from './footerSection/FooterSection'
function Board() {
  return (
    <div>
        <Headers/>
        <BoardFilter/>
        <BoardSelection/>

        <Footers/>
    </div>
  )
}

export default Board
