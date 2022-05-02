import React, { useState, useEffect } from "react"
import { NEXT_PRIMARY_COLOR } from '../../public/theme';
import { Row, Col } from 'antd';
import { useRouter } from 'next/router';
import { BsStarFill } from "react-icons/bs"
import styled from "styled-components"
import SearchComp from "../../component/Search";
import CardWrapper from "../../component/Card";
import axios from 'axios';
import Layout from "../../component/layout";
import Slider from '../../component/Slider'

export default function MovieSingle() {
    const router = useRouter()
    const movieId = router.query.slug
    console.log("movieName", movieId); // '/blog/xyz'
    const [movieData, setMovieData] = useState("")
    const [movieDataRelated, setMovieDataRelated] = useState("")

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
    useEffect(() => {
        if (movieId) {
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=73c98428fbd9b20c3cc69f83f5f2c42b&language=en-US`)
                .then(res => {
                    setMovieData(res.data)
                })
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=73c98428fbd9b20c3cc69f83f5f2c42b&language=en-US&page=1`)
                .then(res => {
                    setMovieDataRelated(res.data.results)
                })
        }
    }, [movieId])

    console.log("MOvieList", movieData, movieDataRelated)
    let genres = movieData.genres

    const ColWrap = styled(Col)`
  display:flex;
  flex-wrap:wrap;
  justify-content:start;
//   @media(max-width:480px){
//     justify-content:space-around;
//   }
  `
    const SearchSubmit = value => {
        router.push("/search/" + value)

    }

    return (
        <Layout>
            <section style={{ background: `${NEXT_PRIMARY_COLOR}`,  }}>
                <SearchComp onSearch={SearchSubmit} />
                <Row className="container" justify="space-between">
                    <Col xs={24} sm={6}>
                        {movieData ? <img style={{ width: "100%", borderRadius: "4px", marginBottom: "20px" }} src={"https://image.tmdb.org/t/p/original" + movieData.poster_path} /> : null}
                    </Col>
                    <Col xs={24} sm={16}>
                        <Row align="middle">
                            <h1 className="text-white" style={{ marginRight: "15px" }}>{movieData.title}</h1><span style={{ color: "gray", fontSize: "22px", marginBottom: "0.5em" }}>{movieData ? movieData.release_date.slice(0, 4) : null}</span>
                            {genres ? <Col span={24} style={{ display: "flex" }}>
                                <p className="text-white" style={{ marginRight: "5px" }}>Genre: </p><p className="text-white">{genres.map((x, i) => (i ? ' , ' : '') + x.name)}</p>
                            </Col> : null}
                        </Row>
                        <Row align="middle" style={{ border: "1px solid gray", borderRight: "none", borderLeft: "none", padding: "10px 0" }}>
                            <BsStarFill style={{ color: "#f5b50a", fontSize: "22px", marginRight: "10px" }} />
                            <span className="text-white"><strong style={{ fontSize: "20px" }}>{movieData.vote_average}</strong>/10</span>
                        </Row>
                        <Row style={{ flexDirection: "column", margin: "50px 0 0px 0" }}>
                            <h2 className="text-link border-link" style={{ marginBottom: "20px" }}>Overview</h2>
                            <p className="text-white">{movieData.overview}</p>
                        </Row>
                    </Col>
                </Row>
            </section>
            <section style={{ background: `${NEXT_PRIMARY_COLOR}`, padding: "0px 0 40px 0", }}>
            <Row className="container" justify="space-between">
                    <Col sm={24} xl={24}>
                        <Row justify="space-between" style={{ flexWrap: "wrap" }}>
                            <ColWrap span={24} >
                                <h2 className="text-link border-link" style={{ margin: "20px 0 40px 0" }}>Similar Movies</h2>
                                {movieDataRelated ? <Slider config={OtherConfig} name={"Top Rated Movie"} pagination={true} className="container">
                                    {movieDataRelated.map((x, i) => <CardWrapper absolute  {...x} key={x.Title + i + x.imDbRating} />
                                    )}
                                </Slider> : null}
                            </ColWrap>
                        </Row>
                    </Col>
                </Row>
            </section>

        </Layout>
    )
}
