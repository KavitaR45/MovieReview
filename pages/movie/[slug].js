import React, { useState, useEffect } from "react"
import { NEXT_PRIMARY_COLOR } from '../../public/theme';
import { Row, Col } from 'antd';
import { useRouter } from 'next/router';
import { BsStarFill } from "react-icons/bs"
import styled from "styled-components"
import SearchComp from "../../component/Search";
import CardWrapper from "../../component/Card";
import axios from 'axios';

export default function MovieSingle() {
    const router = useRouter()
    const movieId = router.query.slug
    console.log("movieName", movieId); // '/blog/xyz'
    const [movieData, setMovieData] = useState("")
    const [movieDataRelated, setMovieDataRelated] = useState("")

    useEffect(() => {
        if(movieId){
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=73c98428fbd9b20c3cc69f83f5f2c42b&language=en-US`)
                .then(res => {
                    setMovieData(res.data)
                })
        }
    }, [movieId])

    console.log("MOvieList", movieData, setMovieDataRelated)
    let genres = movieData.genres

    const ColWrap = styled(Col)`
  display:flex;
  flex-wrap:wrap;
  justify-content:start;
  @media(max-width:480px){
    justify-content:space-around;
  }
  `
    const SearchSubmit = value => {
        router.push("/search/" + value)

    }

    return (
        <>
            <section style={{ background: `${NEXT_PRIMARY_COLOR}`, padding: "40px 0", }}>
                <SearchComp onSearch={SearchSubmit} />
                <Row className="container" justify="space-between">
                    <Col xs={24} sm={6}>
                        {movieData ? <img style={{ width: "100%", borderRadius: "4px", marginBottom: "20px" }} src={"https://image.tmdb.org/t/p/original" + movieData.poster_path} /> : null}
                    </Col>
                    <Col xs={24} sm={16}>
                        <Row align="middle">
                            <h1 className="text-white" style={{ marginRight: "15px" }}>{movieData.title}</h1><span style={{ color: "gray", fontSize: "22px", marginBottom: "0.5em" }}>{movieData ? movieData.release_date.slice(0, 4) : null}</span>
                            <Col span={24} style={{ display: "flex" }}>
                                <p className="text-white" style={{ marginRight: "5px" }}>Genre: </p><p className="text-white">{genres ? genres.map((x, i) => (i ? ' , ' : '') + x.name) : null}</p>
                            </Col>
                        </Row>
                        <Row align="middle" style={{ border: "1px solid gray", borderRight: "none", borderLeft: "none", padding: "10px 0" }}>
                            <BsStarFill style={{ color: "#f5b50a", fontSize: "22px", marginRight: "10px" }} />
                            <span className="text-white"><strong style={{ fontSize: "20px" }}>{movieData.vote_average}</strong>/10</span>
                        </Row>
                        <Row style={{ flexDirection: "column", margin: "50px 0 30px 0" }}>
                            <h2 className="text-link border-link" style={{ marginBottom: "20px" }}>Overview</h2>
                            <p className="text-white">{movieData.overview}</p>
                        </Row>
                    </Col>
                </Row>
            </section>
            <section style={{ background: `${NEXT_PRIMARY_COLOR}`, padding: "40px 0", }}>
                <Row className="container" justify="space-between">
                    <Col sm={24} xl={24}>
                        <Row justify="space-between" style={{ flexWrap: "wrap" }}>
                            <ColWrap span={24} >
                                {/* {searchMovie ?
                                    searchMovie.map((x, i) => <CardWrapper  {...x} key={x.Title + i + x.imDbRating} />)
                                    : null} */}
                            </ColWrap>
                        </Row>
                    </Col>
                </Row>
            </section>

        </>
    )
}
