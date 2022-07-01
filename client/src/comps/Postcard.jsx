import React from 'react'
import { useState } from 'react';

// =================================

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// ==========================================================

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

// ===================fp,urh njhev ugrhfv==============
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';

// ============dialog===========
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';





export default function Postcard({ post, setUpdate }) {


  const user = JSON.parse(localStorage.user)
  let startsAt = post.starts_at.split('T')[0].split("-").reverse().join("/")
  let endsAt = post.ends_at.split('T')[0].split("-").reverse().join("/")




  const [isOpen, setIsOpen] = useState(false)

  const [destination, setDestination] = useState(post.destination)
  const [description, setdescription] = useState(post.description)
  const [img, setImg] = useState(post.img)

  const [price, setPrice] = useState(1000)
  const [starts_at, setStarts_at] = useState(post.starts_at.split('T')[0])
  const [ends_at, setEnds_at] = useState(post.ends_at.split('T')[0])


  const deletPost = async () => {
    const res = await fetch(`http://localhost:1000/feeds/${post.id}`, {
      method: 'delete',
      credentials: 'include'
    })

    const data = await res.json()
    // console.log(data)
    setUpdate(up => !up)

  }

  const updateVacation = async () => {
    const res = await fetch(`http://localhost:1000/feeds/${post.id}`, {
      method: 'put',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ destination, description, img, price, starts_at, ends_at }),
      credentials: 'include'
    })
    const data = await res.json()
    // console.log(data)
    setUpdate(up => !up)
    setIsOpen(!isOpen)
  }
  // ====================עדכון לייקים====================

  const [howManyLikes, setHowManyLikes] = useState(false)
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:1000/feeds/likesToPosts/${post.id}`, {
        credentials: 'include'
      })

      const data = await res.json()
      // console.log(data)
      setLikes(data)

    })()
  }, [howManyLikes])

  const addOrRemoveLike = async () => {
    const res = await fetch(`http://localhost:1000/feeds/like/${post.id}`, {
      method: 'put',
      credentials: 'include'
    })

    const data = await res.json()
    console.log(data)
    setHowManyLikes(!howManyLikes)
    // בכדי לחסוך לצאת לשרת את השורה הבאה הייתי מוחק אבל זה מה שהם ביקשו הערה לעצמי

    setUpdate(up => !up)
  }



  return (


    <div className='postCard'  >
      <div className="">



        <Card className='qq' sx={{ maxWidth: 320 }}>
          <CardHeader

            title={post.destination}
            subheader={`${startsAt} - ${endsAt}`}
          />
          <CardMedia
            component="img"
            height="200"
            image={post.img}
            alt={post.destination}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>


            {
              user.admin == 1 ?

                <div className="admin-icons">

                  <IconButton onClick={() => setIsOpen(!isOpen)} aria-label="delete">
                    <EditIcon />
                  </IconButton>

                  <IconButton onClick={deletPost} aria-label="delete">
                    <DeleteForeverIcon />
                  </IconButton>

                </div>

                :

                <div className="user-likes">

                  <Checkbox defaultChecked={!!post.userid}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    
                    onClick={addOrRemoveLike}
                  />
                  <p>{likes.likes}</p>

                </div>
            }

          </CardActions>
        </Card>

      </div>
      {/* ===========================gialog */}


      <Dialog
        // fullScreen={fullScreen}
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle >
          Update vacation
        </DialogTitle>
        <DialogContent>

          <div className="">
            <input defaultValue={destination}
              type="text" onChange={(e) => setDestination(e.target.value)} placeholder='Vacation location' />

            <input defaultValue={description}
              type="text" onChange={(e) => setdescription(e.target.value)} placeholder='Description' />
          </div>

          <div className="">
            <input defaultValue={img}
              type="text" onChange={(e) => setImg(e.target.value)} placeholder='img rsc' />

            <input defaultValue={price}
              type="number" onChange={(e) => setPrice(e.target.value)} placeholder='price'

            />
          </div>

          <div className="dates">
            <p>start at</p>
            <input defaultValue={starts_at}
              onChange={(e) => setStarts_at(e.target.value)} type="date" placeholder='' />

            <p>ends at</p>
            <input defaultValue={ends_at}
              onChange={(e) => setEnds_at(e.target.value)} type="date" placeholder=''
              min={starts_at}
            />

          </div>



        </DialogContent>

        <DialogActions>
          <Button onClick={() => setIsOpen(!isOpen)} > cansel</Button>
          <Button onClick={updateVacation} > Update </Button>
        </DialogActions>
      </Dialog>





    </div>   /*  סוף דיב של הקומפוננטה  */
  )
}
