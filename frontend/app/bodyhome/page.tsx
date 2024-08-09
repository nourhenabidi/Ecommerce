"use client"

import "./bodyhome.css"
import Link from 'next/link';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';


const bodyhome: React.FC =()=>{
return(
    <div className="fullbody">
        <div>
      <img src="https://i.pinimg.com/564x/ab/d3/a1/abd3a1fffad64b1cdbb73859d135fd6d.jpg"alt="" />  

        </div>
        <div className="text-container absolute left-32 top-1/2 transform -translate-y-1/2">
      <h1 className="text-white text-4xl font-bold mb-9">the autumn equinox</h1>
      <h1 className="text-white text-2xl ">Fall has arrived .</h1>
      <h1 className="text-white text-2xl">Shop for our new releases starting today .</h1>
      <Link href={'/shop'}><button className='text-white border rounded mt-5 mr-[30px]'>Shop Now</button></Link>
    </div>
    <div className=" main">

        <h1 className="flex justify-center text-3xl ">Shop by category</h1>
        <h2 className="flex justify-center text-2xl ">Indulge in what we offer</h2>
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
      <div className="pause">
<img src="" alt="" />
      </div>

    </div>
)
}
export default bodyhome