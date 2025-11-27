import React from 'react'
import Carousel from '../components/Carousel'

function Home() {
  return (
    <div id="beranda"
			className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <section className="w-full h-auto relative">
				<Carousel />
			</section>
    </div>
  )
}

export default Home
