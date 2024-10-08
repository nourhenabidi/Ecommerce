"use client"
import "./bodyhome.css"
import React , {useRef , useState , useEffect} from "react";
import Link from 'next/link';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Navbar from "../navBar/page";
import Foot from "../footer/page"
import NewAri from "../newArrival/page"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams }  from 'next/navigation';

interface Products {
  id:number;
  ProductID: number;
  Name: string;
  Description: string;
  Price: string;
  Availability:string;
  ProductImage:string[];
  ProductRemise:string;
  colorProduct:string;
  
} 
interface cat {
productCategory:string
  
} 


const bodyhome: React.FC =()=>{
  const [products, setProduct] = useState<Products[]>([]);
  const [SelectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [chnageImage, setChangeImage] = useState<number>(0);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const router=useRouter()
  const images: string[] = [
    'https://i.pinimg.com/736x/2c/a4/81/2ca4815f404114666894b99d72cb905f.jpg',
    "https://i.pinimg.com/736x/de/fa/41/defa4101dea55deb68928f61988cdecf.jpg",
    "https://i.pinimg.com/736x/39/81/d2/3981d25bb723b672235a29607a360b3a.jpg"
];


  const changeImage = () => {
    setChangeImage((pr) => (pr + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(changeImage, 5000); 
    return () => clearInterval(interval); 
  }, []);

  const getByCategory = async (productCategory: string): Promise<void> => {
    try {
      const response = await axios.get<Products[]>(
        `http://localhost:5000/api/products/category/${productCategory}`
      );
      setProduct(response.data);
      router.push(`/SearchByCategory/?category=${productCategory}`);
  
      setSelectedCategory(productCategory); 
    } catch (error) {
      console.error(error);
    }
  };
  

return(
  <div className="body">

    <Navbar />
    <div className="fullbody" >
        <div >
      <img src={images[chnageImage]} alt="" />
        </div>
        <div className="text-container absolute left-32 top-1/2 transform -translate-y-1/2">
      <h1 className="anim text-white text-4xl font-bold mb-9">the autumn equinox</h1>
      <h1 className="anim text-white text-2xl ">Fall has arrived .</h1>
      <h1 className="anim text-white text-2xl">Shop for our new releases starting today .</h1>
      <a href="/shopAllproducts">
      <button className='anim text-white border rounded mt-5 mr-[30px]'>Shop Now</button>
      </a>
    </div>
    <div className=" main" >
 <NewAri />
 </div>
 
 <div className="us" style={{ marginBottom: '50px'}}>
<img src="https://i.pinimg.com/564x/49/09/2b/49092b08046323299774c38aab13eb31.jpg" alt="" />

<div className="content" style={{top:"35%",left:"-20%"}}>

<button onClick={()=>{getByCategory("Pack")}}> 
  <a>
      <p className="text-black font-bold text-sm px-5 py-4 relative hover:underline"  style={{width:"100%"}}>
      <span className=" anim block" style={{marginBottom:55}} >TAKE </span>
  <span className=" anim block" style={{marginBottom:55}}>YOUR LOVELY</span>
  <span className=" anim block"style={{marginBottom:55}} >PACK </span>
        </p>
        </a>
        </button>
      </div> 
      </div>
      <div className=" main" >
        <h1 className=" flex justify-center text-3xl ">Shop by category</h1>
        <h2 className=" flex justify-center text-2xl ">Indulge in what we offer</h2>
        <Box
  component="ul"
  sx={{
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
    p: 0,
    m: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    mx: 'auto',
  }}
>
  <button onClick={() => getByCategory('Earings')}>
    <Card
      component="li"
      sx={{
        minWidth: 240, // Reduce the minWidth
        maxWidth: 240, // Set a maxWidth to maintain consistency
        flexGrow: 0, // Prevent it from growing too large
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardCover>
        <img
          src="https://i.pinimg.com/564x/ad/99/5e/ad995e95505c17834826bc43146b41ca.jpg"
          alt="Earings"
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
  </button>

  <button onClick={() => getByCategory('Necklaces')}>
    <Card
      component="li"
      sx={{
        minWidth: 240,
        maxWidth: 240,
        flexGrow: 0,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardCover>
        <img
          src="https://i.pinimg.com/736x/b6/ea/df/b6eadf3d31a0a396b947a85b21619ae5.jpg"
          alt="Necklaces"
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
  </button>

  <button onClick={() => getByCategory('Rings')}>
    <Card
      component="li"
      sx={{
        minWidth: 240,
        maxWidth: 240,
        flexGrow: 0,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardCover>
        <img
          src="https://i.pinimg.com/564x/bc/77/71/bc7771f6afe2406ccbdf05003fa7c563.jpg"
          alt="Rings"
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
  </button>

  <button onClick={() => getByCategory('Bracelets')}>
    <Card
      component="li"
      sx={{
        minWidth: 240,
        maxWidth: 240,
        flexGrow: 0,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardCover>
        <img
          src="https://i.pinimg.com/564x/b3/d6/ee/b3d6eef26fc47b41e166f9681ee65348.jpg"
          alt="Bracelets"
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
  </button>

  <button onClick={() => getByCategory('Accessories hair')}>
    <Card
      component="li"
      sx={{
        minWidth: 240,
        maxWidth: 240,
        flexGrow: 0,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardCover>
        <img
          src="https://i.pinimg.com/564x/eb/18/7e/eb187eec7ac5ca1699c7a6d89196d9de.jpg"
          alt="Accessories hair"
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
          Accessories hair
        </Typography>
      </CardContent>
    </Card>
  </button>
</Box>

      </div>
      <div className="pause" style={{ marginBottom: '100px' }}>
<img src="https://i.pinimg.com/564x/ab/d5/42/abd542b80d61c41fbe11a7afe3083de2.jpg" alt="" />
<div className="baba absolute right-32 transform -translate-y-1/2">
<h2 className=" text-white text-4xl font-medium  text-sm px-5 py-4" style={{ marginBottom: '50px' }}>For You girl</h2>


      <p className=" text-white text-2xl font-bold px-5 py-4">During the golden hour.</p>
      <Link href={'/whyUs'}> <button > <p className="text-white text-sm ">
      At Moa Collection , jewelry is more than just an accessory - it's one of
      the most essential elements of any outfit . It adds the final touch that
      elevates a look , reflecting the personality and style of the wearer . Each
      piece we create is designed to transform an outfit into a true statement,
      enhancing natural beauty and elegance ... 
    </p>     </button></Link> 
      </div> 
      </div>




    </div>
    <Foot />
   
    </div>
)
}
export default bodyhome