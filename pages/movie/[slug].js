import React, { useState, useEffect } from "react"
import { NEXT_PRIMARY_COLOR } from '../../public/theme';
import { Row, Col } from 'antd';
import { useRouter } from 'next/router';
import { BsStarFill } from "react-icons/bs"
import styled from "styled-components"
import SearchComp from "../../component/Search";
import CardWrapper from "../../component/Card";
import Layout from "../../component/layout";
import Slider from '../../component/Slider'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { API_INSTANCE, AxiosGET } from "../../component/API/api";
export default function MovieSingle() {
    const router = useRouter()
    const movieId = router.query.slug
    const [movieData, setMovieData] = useState("")
    const [stream, setStream] = useState("")
    const [streamIN, setStreamIN] = useState(false)
    const [movieDataRelated, setMovieDataRelated] = useState("")

    var OtherConfig = {
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
    const fetchData = async () => {
        try {
            const [MovData, MovDataRelated, StreamData] = await Promise.all([
                AxiosGET(API_INSTANCE, `/movie/${movieId}?api_key=73c98428fbd9b20c3cc69f83f5f2c42b&language=en-US`),
                AxiosGET(API_INSTANCE, `/movie/${movieId}/similar?api_key=73c98428fbd9b20c3cc69f83f5f2c42b&language=en-US&page=1`),
                AxiosGET(API_INSTANCE, `/movie/${movieId}/watch/providers?api_key=73c98428fbd9b20c3cc69f83f5f2c42b`)
            ]);
            setMovieData(MovData);
            setMovieDataRelated(MovDataRelated.results);
            setStream(StreamData.results);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [movieId]);

    useEffect(() => {
        if (stream.IN) {
            if (stream.IN.rent) {
                setStreamIN(true);
            } else {
                setStreamIN(false);
            }
        }
    }, [stream])


    let genres = movieData && movieData.genres

    const ColWrap = styled(Col)`
  display:flex;
  flex-wrap:wrap;
  justify-content:space-around;
  `
    const SearchSubmit = value => {
        router.push("/search/" + value)

    }

    return (
        <Layout>
            <section style={{ background: `${NEXT_PRIMARY_COLOR}`, }}>
                <SearchComp onSearch={SearchSubmit} />
                <Row className="container" justify="space-between">
                    <Col xs={24} sm={6}>
                        {movieData ? <LazyLoadImage style={{ width: "100%", borderRadius: "4px", marginBottom: "20px" }} src={"https://image.tmdb.org/t/p/original" + movieData.poster_path} /> : null}
                    </Col>
                    <Col xs={24} sm={16}>
                        <Row align="middle">
                            <h1 className="text-white" style={{ marginRight: "15px" }}>{movieData && movieData.title}</h1><span style={{ color: "gray", fontSize: "22px", marginBottom: "0.5em" }}>{movieData ? movieData.release_date.slice(0, 4) : null}</span>
                            {genres ? <Col span={24} style={{ display: "flex" }}>
                                <p className="text-white" style={{ marginRight: "5px" }}>Genre: </p><p className="text-white">{genres.map((x, i) => (i ? ' , ' : '') + x.name)}</p>
                            </Col> : null}
                        </Row>
                        <Row align="middle" style={{ border: "1px solid gray", borderRight: "none", borderLeft: "none", padding: "10px 0" }}>
                            <BsStarFill style={{ color: "#f5b50a", fontSize: "22px", marginRight: "10px" }} />
                            <span className="text-white"><strong style={{ fontSize: "20px" }}>{movieData && movieData.vote_average}</strong>/10</span>
                        </Row>
                        <Row style={{ flexDirection: "column", margin: "50px 0 0px 0" }}>
                            <h2 className="text-link border-link" style={{ marginBottom: "20px" }}>Overview</h2>
                            <p className="text-white">{movieData && movieData.overview}</p>
                        </Row>
                        {streamIN ?
                            <Row style={{ flexDirection: "column", margin: "10px 0 0px 0" }}>
                                <h3 className="text-link border-link" style={{ marginBottom: "20px" }}>Just Watch</h3>
                                <Row>
                                    {stream.IN.rent.map((x, i) => <a key={stream.IN.link + i + x.logo_path} href={stream.IN.link} target="_blank" rel="noreferrer"><img src={"https://image.tmdb.org/t/p/original" + x.logo_path} style={{ padding: "10px", height: "70px", borderRadius: "4px" }} /></a>)}
                                </Row>
                            </Row> : null}
                    </Col>
                </Row>
            </section>
            <section style={{ background: `${NEXT_PRIMARY_COLOR}`, padding: "0px 0 40px 0", }}>
                <Row className="container" justify="space-between">
                    <Col sm={24} xl={24}>
                        <Row justify="space-between" style={{ flexWrap: "wrap" }}>
                                <h2 className="text-link border-link" style={{ margin: "20px 0 40px 0" }}>Similar Movies</h2>
                            <ColWrap span={24} >
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
