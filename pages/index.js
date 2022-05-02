import React, {useState,useEffect} from "react"
import CardWrapper from '../component/Card'
import Slider from '../component/Slider'
import SearchComp from '../component/Search';
import { NEXT_PRIMARY_COLOR } from '../public/theme';
import { Row,Col } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router'
import Search from "./search/[slug]";

export default function Home() {
  const router = useRouter()

  const [popularMovie, setPopularMovie] = useState("")
 
  useEffect(() => {
    axios.get(`
    https://api.themoviedb.org/3/trending/all/day?api_key=73c98428fbd9b20c3cc69f83f5f2c42b`)
      .then(res => {
        setPopularMovie(res.data.results)
      })
  },[])
  console.log("POPularMovies",popularMovie)

    const SearchSubmit = value => {
      router.push("/search/"+value)
    }

  var BanerConfig = {
    lazy: true,
    slidesPerView: 4,
    slidesPerGroup: 1,
    preloadImages: false,
    delay: 4000,
    spaceBetween: 25,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: false,
    breakpoints: { 200: { slidesPerView: 1, }, 576: { slidesPerView: 2, }, 1200: { slidesPerView: 4, }, 1440: { slidesPerView: 4, }, },
  }
  var TheatreConfig = {
    breakpoints: { 200: { slidesPerView: 1, }, 576: { slidesPerView: 1, }, 1200: { slidesPerView: 3, }, 1440: { slidesPerView: 3, }, },
  }
  return (
    <>
      <section style={{ backgroundImage: `url(/image/homeBanner.jpg)`, paddingTop:"10vh",paddingBottom:"40px" }}>
        <SearchComp onSearch={SearchSubmit}/>

        <div className='container'>
         {popularMovie ?  <Slider config={BanerConfig} name={"POPular Movie"} pagination={true} className="container">
            {popularMovie.slice(0,10).map((x,i)=><CardWrapper absolute  {...x} key={x.Title + i + x.imDbRating } />
            )}
          </Slider>:null}
        </div>
      </section>
    </>
  )
}
