"use client"

import "./bodyhome.css"
import Link from 'next/link';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Navbar from "../navBar/page";
import Foot from "../footer/page"
import NewAri from "../newArrival/page"

const bodyhome: React.FC =()=>{
return(
  <div className="body">
    <Navbar />
    <div className="fullbody"  style={{ marginBottom: '50px' }}>
      
        <div>
      <img src="https://i.pinimg.com/564x/ab/d3/a1/abd3a1fffad64b1cdbb73859d135fd6d.jpg"alt="" />  

        </div>
        <div className="text-container absolute left-32 top-1/2 transform -translate-y-1/2">
      <h1 className="text-white text-4xl font-bold mb-9">the autumn equinox</h1>
      <h1 className="text-white text-2xl ">Fall has arrived .</h1>
      <h1 className="text-white text-2xl">Shop for our new releases starting today .</h1>
      <Link href={'/shopAllproducts'}><button className='text-white border rounded mt-5 mr-[30px]'>Shop Now</button></Link>
    </div>
    <div className=" main">
 <NewAri />
 </div>
 
 <div className="us" style={{ marginBottom: '50px'}}>
<img src="https://i.pinimg.com/564x/49/09/2b/49092b08046323299774c38aab13eb31.jpg" alt="" />
<div className="content" style={{top:"35%",left:"-20%"}}>

      <p className="text-black font-bold text-sm px-5 py-4"  style={{width:"100%"}}>
      <span className="block" style={{marginBottom:55}} >BECOME </span>
  <span className="block" style={{marginBottom:55}}>THE HERO OF</span>
  <span className="block"style={{marginBottom:55}} >YOUR OWN </span>
  <span className="block" style={{marginBottom:55}}>STORY</span>

        </p>

      </div> 
      {/* <button> <span className="block border border-black" style={{bottom:"10%"}}>Your Pack Here</span></button> */}

      </div>
      <div className=" main">
        <h1 className="flex justify-center text-3xl ">Shop by category</h1>
        <h2 className="flex justify-center text-2xl ">Indulge in what we offer</h2>
    <Box
      component="ul"
      sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 , justifyContent: 'center',
        alignItems: 'center', padding: 6,mx: 'auto'}}
    >
      <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardCover>
          <img
            src="https://i.pinimg.com/564x/ad/99/5e/ad995e95505c17834826bc43146b41ca.jpg"
            alt=""
          />
        </CardCover>
        <CardContent>
          <Typography
            level="body-lg"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
            style={{ fontFamily: 'serif' }}
          >
            Earings
          </Typography>
        </CardContent>
      </Card>
      <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardCover>
          <img
            src="https://i.pinimg.com/736x/b6/ea/df/b6eadf3d31a0a396b947a85b21619ae5.jpg"
            alt=""
          />
        </CardCover>
        <CardContent>
          <Typography
            level="body-lg"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
            style={{ fontFamily: 'serif' }}
          >
            Necklaces
          </Typography>
        </CardContent>
      </Card>
      <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardCover>
          <img
            src="https://i.pinimg.com/564x/bc/77/71/bc7771f6afe2406ccbdf05003fa7c563.jpg"
            alt=""
          />
        </CardCover>
        <CardContent>
          <Typography
            level="body-lg"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
            style={{ fontFamily: 'serif' }}
          >
            Rings
          </Typography>
        </CardContent>
      </Card>
      <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardCover>
          <img
            src="https://i.pinimg.com/564x/b3/d6/ee/b3d6eef26fc47b41e166f9681ee65348.jpg"
            alt=""
          />
        </CardCover>
        <CardContent>
          <Typography
            level="body-lg"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
            style={{ fontFamily: 'serif' }}
          >
            Bracelets
          </Typography>
        </CardContent>
      </Card>
      </Box>
      </div>
      <div className="pause" style={{ marginBottom: '100px' }}>
<img src="https://i.pinimg.com/564x/ab/d5/42/abd542b80d61c41fbe11a7afe3083de2.jpg" alt="" />
<div className="baba absolute right-32 transform -translate-y-1/2">
<h2 className="text-white text-4xl text-black font-medium  text-sm px-5 py-4" style={{ marginBottom: '50px' }}>For You girl</h2>

      <h1 className="text-white text-6xl text-black font-bold  text-sm px-5 py-4">During the golden hour.</h1>
      <p className="text-white text-2xl ">i am nourhen i love jwellery and it's my desire to fulfill my dream.</p>
      <Link href={'/aboutUs'}><button className='text-white border rounded mt-5 mr-[30px]'>Read more</button></Link> 
      </div> 
      </div>


      <Box
component="ul"
sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 ,    justifyContent: 'center',
alignItems: 'center', padding: 6,mx: 'auto'}}
>
<Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
<CardCover>
  <img
    src="https://i.pinimg.com/564x/ad/99/5e/ad995e95505c17834826bc43146b41ca.jpg"
    alt=""
  />
</CardCover>
<CardContent>
  <Typography
    level="body-lg"
    fontWeight="lg"
    textColor="#fff"
    mt={{ xs: 12, sm: 18 }}
    style={{ fontFamily: 'serif' }}
  >
    New Collection
  </Typography>
  
</CardContent>
</Card>
<Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
<CardCover>
  <img
    src="https://i.pinimg.com/736x/b6/ea/df/b6eadf3d31a0a396b947a85b21619ae5.jpg"
    alt=""
  />
</CardCover>
<CardContent>
  <Typography
    level="body-lg"
    fontWeight="lg"
    textColor="#fff"
    mt={{ xs: 12, sm: 18 }}
    style={{ fontFamily: 'serif' }}
  >
  Pack
  </Typography>
</CardContent>
</Card>
</Box>
      {/* <div className="last" style={{ marginBottom: '100px', display: 'flex' , justifyContent: 'center', gap: '40px' }}>
  <img src="https://i.pinimg.com/564x/c6/a3/1d/c6a31da48b57f3ca1f7e93becbc8227e.jpg" alt="" />
  <img src="https://i.pinimg.com/564x/c6/a3/1d/c6a31da48b57f3ca1f7e93becbc8227e.jpg" alt="" />
  <img src="https://i.pinimg.com/564x/c6/a3/1d/c6a31da48b57f3ca1f7e93becbc8227e.jpg" alt="" />
</div> */}
    </div>
    <Foot />
    </div>
)
}
export default bodyhome