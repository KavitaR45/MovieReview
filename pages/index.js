import React, { useState, useEffect } from "react"
import CardWrapper from '../component/Card'
import Slider from '../component/Slider'
import SearchComp from '../component/Search';
import { NEXT_PRIMARY_COLOR } from '../public/theme';
import { Row, Col } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router'
import styled from "styled-components"
import Layout from "../component/layout";

export default function Home() {
  const router = useRouter()

  const [popularMovie, setPopularMovie] = useState("")
  const [topRated, setTopRated] = useState("")
  const [latest, setLatest] = useState("")

  useEffect(() => {
    axios.get(`
    https://api.themoviedb.org/3/trending/all/day?api_key=73c98428fbd9b20c3cc69f83f5f2c42b`)
      .then(res => {
        setPopularMovie(res.data.results)
      })
    axios.get(`
    https://api.themoviedb.org/3/movie/top_rated?api_key=73c98428fbd9b20c3cc69f83f5f2c42b&language=en-US&page=1`)
      .then(res => {
        setTopRated(res.data.results)
      })
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=73c98428fbd9b20c3cc69f83f5f2c42b&language=en-US&page=1`)
      .then(res => {
        setLatest(res.data.results)
      })
      
  }, [])
  console.log("POPularMovies", popularMovie, topRated)

  const SearchSubmit = value => {
    router.push("/search/" + value)
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
  var OtherConfig = {
    lazy: true,
    slidesPerView: 4,
    slidesPerGroup: 1,
    preloadImages: false,
    delay: 4000,
    spaceBetween: 25,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    loop: false,
    breakpoints: { 200: { slidesPerView: 1, }, 576: { slidesPerView: 2, }, 1200: { slidesPerView: 4, }, 1440: { slidesPerView: 4, }, },
  }
  const ColWrap = styled(Col)`
  display:flex;
  flex-wrap:wrap;
  justify-content:start;
  // @media(max-width:480px){
  //   justify-content:space-around;
  // }
  `
  return (
    <>
      <section style={{ backgroundImage: `url(/image/homeBanner.jpg)`, paddingBottom: "40px" }}>
      <div  className="container"><Link href="/"><a><img src={"/image/logo.png"}/></a></Link></div>
        <SearchComp onSearch={SearchSubmit} />
        <div className='container'>
          {popularMovie ? <Slider config={BanerConfig} name={"POPular Movie"} pagination={true} className="container">
            {popularMovie.slice(0, 10).map((x, i) => <CardWrapper absolute  {...x} key={x.Title + i + x.imDbRating} />
            )}
          </Slider> : null}
        </div>
      </section>
      <section>
      <Row className="container" justify="space-between">
        <Col sm={24} xl={24}>
          <Row justify="space-between" style={{ flexWrap: "wrap" }}>
            <ColWrap span={24} >
              <h2 className="text-link border-link" style={{margin:"20px 0 40px 0"}}>Upcoming</h2>
              {latest ? <Slider config={OtherConfig} name={"Upcoming Movie"} pagination={true} className="container">
                {latest.slice(0, 10).map((x, i) => <CardWrapper absolute  {...x} key={x.Title + i + x.imDbRating} />
                )}
              </Slider> : null}
            </ColWrap>
          </Row>
        </Col>
      </Row>
      </section>
      <section style={{marginBottom:"50px"}}>
      <Row className="container" justify="space-between">
        <Col sm={24} xl={24}>
          <Row justify="space-between" style={{ flexWrap: "wrap" }}>
            <ColWrap span={24} >
              <h2 className="text-link border-link" style={{margin:"20px 0 40px 0"}}>Top Rated</h2>
              {topRated ? <Slider config={OtherConfig} name={"Top Rated Movie"} pagination={true} className="container">
                {topRated.slice(0, 10).map((x, i) => <CardWrapper absolute  {...x} key={x.Title + i + x.imDbRating} />
                )}
              </Slider> : null}
            </ColWrap>
          </Row>
        </Col>
      </Row>
      </section>
    </>
  )
}
