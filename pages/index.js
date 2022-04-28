import CardWrapper from '../component/Card'
import Slider from '../component/Slider'
import SearchComp from '../component/Search';

export default function Home() {

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
  return (
    <>
      <section style={{ backgroundImage: `url(/image/homeBanner.jpg)`, height: "100vh",paddingTop:"10vh" }}>
        <SearchComp/>
        
        <div className='container'>
          <Slider config={BanerConfig} pagination={true} className="container">
            <CardWrapper />
            <CardWrapper />
            <CardWrapper />
            <CardWrapper />
            <CardWrapper />
            <CardWrapper />
            <CardWrapper />
            <CardWrapper />
            <CardWrapper />
            <CardWrapper />
          </Slider>
        </div>
      </section>

    </>
  )
}
