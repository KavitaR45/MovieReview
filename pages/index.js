import { useState, useEffect } from "react";
import CardWrapper from '../component/Card'
import Slider from '../component/Slider'
import SearchComp from '../component/Search';
import { Row, Col } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router'
import styled from "styled-components"
import { API_INSTANCE, AxiosGET } from "../component/API/api";

export default function Home() {
  const router = useRouter()

  const [popularMovie, setPopularMovie] = useState("")
  const [topRated, setTopRated] = useState("")
  const [latest, setLatest] = useState("")

  const fetchData = async () => {
    try {
      const [popularMov, topRatedMov, latestMov] = await Promise.all([
        AxiosGET(API_INSTANCE, '/trending/all/day?api_key=73c98428fbd9b20c3cc69f83f5f2c42b'),
        AxiosGET(API_INSTANCE, '/movie/top_rated?api_key=73c98428fbd9b20c3cc69f83f5f2c42b&language=en-US&page=1'),
        AxiosGET(API_INSTANCE, '/movie/upcoming?api_key=73c98428fbd9b20c3cc69f83f5f2c42b&language=en-US&page=1')
      ]);
      setPopularMovie(popularMov.results);
      setTopRated(topRatedMov.results);
      setLatest(latestMov.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


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
  const ColWrap = styled(Col)`
  display:flex;
  flex-wrap:wrap;
  // justify-content:start;
  justify-content:space-around;
  @media(max-width:480px){
    justify-content:space-around;
  }
  `
  return (
    <>
      <section style={{ backgroundImage: `url(/image/homeBanner.jpg)`, paddingBottom: "40px" }}>
        <div className="container"><Link href="/"><a><img src={"/image/logo.png"} /></a></Link></div>
        <SearchComp onSearch={SearchSubmit} />
        <div className='container'>
          <h1 className="text-link border-link" style={{ margin: "0px 0 40px 0" }}>Trending Movies</h1>
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
              <h2 className="text-link border-link" style={{ margin: "20px 0 40px 0", display: "block", }}>Upcoming Movies</h2>
              <ColWrap span={24} >
                {latest ?
                  latest.slice(0, 8).map((x, i) => <CardWrapper  {...x} key={x.Title + i + x.imDbRating} />)
                  : null}
              </ColWrap>

            </Row>
          </Col>
        </Row>
      </section>
      <section style={{ marginBottom: "50px" }}>
        <Row className="container" justify="space-between">
          <Col sm={24} xl={24}>
            <Row justify="space-between" style={{ flexWrap: "wrap" }}>
              <h2 className="text-link border-link" style={{ margin: "20px 0 40px 0", display: "block", }}>Top Rated Movies</h2>
              <ColWrap span={24} >
                {topRated ?
                  topRated.slice(0, 8).map((x, i) => <CardWrapper  {...x} key={x.Title + i + x.imDbRating} />)
                  : null}
              </ColWrap>
            </Row>
          </Col>
        </Row>
      </section>
    </>
  )
}
