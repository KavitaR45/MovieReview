import Head from 'next/head'
import Image from 'next/image'
import Slider from '../component/Slider'


export default function Home() {

  var BanerConfig = {
    lazy: true,
    slidesPerView: 1, 
    slidesPerGroup: 1,
    preloadImages: false,
    delay: 4000,
    spaceBetween: 0,
    navigation: false,
    loop:true
  }
  return (
    <>
    <section style={{backgroundImage:`url(/image/homeBanner.jpg)`}}>
    
    </section>
    
    </>
  )
}


const BannerImg=[

  {img:"https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/8/70478e25-a206-4d38-83b0-f94e8b75c5351646751364724-Handbags---Wallets_Desk.jpg"},
  {img:"https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/8/9ce82891-515e-4781-a427-a95fef24902e1646751364756-Kurtas---Sets_Desk.jpg"},
  {img:"https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/8/70478e25-a206-4d38-83b0-f94e8b75c5351646751364724-Handbags---Wallets_Desk.jpg"},
]

