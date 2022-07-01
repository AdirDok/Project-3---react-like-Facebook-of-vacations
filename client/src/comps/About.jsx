import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export default function About() {

  const [update, setUpdate] = useState(false)
  const [grafData, setGrafData] = useState()


  const user = JSON.parse(localStorage.user)

  

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:1000/feeds/likedPosts`, {
        credentials: 'include'
      })
      const data = await res.json()
      console.log(data)

      if (data) {
        console.log("first")
        setGrafData({
          labels: data.map(d => d.destination),
          datasets: [{
            label: 'Number of followers',
            data: data.map(d => d.Amount),
            backgroundColor: ["rgba(54,162,235,0.2)"],

          }]
        })
      }

  


    })()
  }, [])



  return (

    <div>

      {grafData ?

        <Bar data={grafData} />

        :
        <h1>loding</h1>
      }

    </div>
  )
}
