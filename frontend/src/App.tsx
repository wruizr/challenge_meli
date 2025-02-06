import React, { Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Layout } from "./components/layouts/Layout"
import './app.css'
const ItemsResult = React.lazy(() => import('./components/itemsResult/ItemsResult')) 
const ItemDetail = React.lazy(() => import('./components/itemDetail/ItemDetail'))

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} > 
          <Route path="/items" element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <ItemsResult />
            </Suspense>} />
          <Route path="/items/:id" element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <ItemDetail />
            </Suspense>
          } />
        </Route> 
      </Routes>
    </Router>
  )
}

export default App
