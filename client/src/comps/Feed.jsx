import React, { useEffect } from 'react'
import { useState } from 'react'
import Postcard from './Postcard'

export default function Feed({ update, setUpdate }) {

  const [postsArr, setPostsArr] = useState([])

 

  useEffect(() => {

    (async () => {
      const res = await fetch(`http://localhost:1000/feeds/`, {
        credentials: 'include'
      })


      const data = await res.json()
      
      setPostsArr(data)
      console.log(data)


    })()

  }, [update])



  return (



    <div className='feed' >

      {
        postsArr.map(post => <Postcard post={post} key={post.id} setUpdate={setUpdate} />)

      }




    </div>
  )
}
