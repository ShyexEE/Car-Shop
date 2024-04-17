import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Carousel} from "react-responsive-carousel"
import ColorDivMain from "../components/ColorDivMain";
import {useParams } from "react-router-dom";
import taycan from "./car_colors/taycan";
import p718 from "./car_colors/p718"
import p911 from "./car_colors/p911"
import axios from "axios"

function Model(){
  const [data, setData]=useState({})
  
  let {modelId, id} = useParams();
  

  if(modelId === "taycan"){var model = taycan}
  if(modelId=== "p718"){var model = p718}
  else if(modelId==="p911"){var model = p911}
  
  
   
   var group1 = model[id].group1;
   var group2 = model[id].group2;
   var group3 = model[id].group3;
  //add default
  const [urls, setURL] = useState(group1[0][0].images)
  const [price, setPrice] = useState(model[id].price)
 // const [title, setTitle]=useState()
 // const [color, setColor]=useState()
  //index1 of main array, index2 of child array that can be 0 or 1
   
  function chooseColor(imagesURL, pricee, title, colors){
    if(imagesURL){
    setURL(imagesURL)
    var total_price = model[id].intPrice + pricee
    let string = new Intl.NumberFormat('ja-JP', {unitDisplay:'long', style: 'currency', currency: 'GBP' }).format(
      total_price,
    )
   let first =  string.slice(0,1)
   let second = string.slice(1)
   setPrice(first+" "+second)
  // setTitle(title)
  // setColor(color)
   setData({
    title: title,
    price: price,
    color: colors,
    links: imagesURL
  })
  }
  }
  
 
  //sending data to the backend

  let submit=async(e)=>{
    e.preventDefault();
    const newData= data
    await fetch("http://localhost:5000/custom",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newData)
   })
}


    return (<div className="customMainBody">
    <Header />
    <div style={{height:"65px",width:"50px"}}></div>
      <div className="customBody">
        <h1 className="roboto customTitle">{model[id].title}</h1>
        <div className="customMainDivs">
        <div className="customCarouselDiv">
         <Carousel showStatus={false} emulateTouch={true} showArrows={false} thumbWidth={100}>
                {urls? 
                 urls.map(link=>(
                 <div className="customCarouselImg">
                   <img className="customCarouselImg" src={link} />
                 </div>
              ))
               :null
              }
         </Carousel>
            </div>

            <div className="customColorsDiv">
            <p className="roboto customH1">Colors <span className="roboto" style={{float:"right",fontWeight:"600",fontSize:"20px",paddingRight:"20px"}}>{price}</span></p>
            
            <div className="customAllColorsDiv">
              <p className="roboto customH1" style={{fontSize:"19px",paddingBottom:"0px"}}> {model[id].name1.name} <span className="roboto" style={{float:"right",fontWeight:"500",fontSize:"18px",paddingRight:"20px"}}>{model[id].name1.price}</span></p>
               {/** for each 2 create a ColorDivMain */}
               {group1.map((row, index)=>(
                <ColorDivMain key={index} title={model[id].title} price={model[id].name1.intPrice} onChecked={chooseColor} images1={row[0].images}  images2={row[1].images}  colorName1={row[0].color} colorName2={row[1].color} colorCode1={row[0].code} colorCode2={row[1].code} />
               ))} 
            </div>
            
            
            <div className="customAllColorsDiv">
               <p className="roboto customH1" style={{fontSize:"19px",paddingBottom:"0px"}}> {model[id].name2.name} <span className="roboto" style={{float:"right",fontWeight:"500",fontSize:"18px",paddingRight:"20px"}}>{model[id].name2.price}</span></p>
               {group2.map((row, index)=>(
                <ColorDivMain key={index} title={model[id].title} price={model[id].name2.intPrice}  onChecked={chooseColor} images1={row[0].images}  images2={row[1].images} colorName1={row[0].color} colorName2={row[1].color} colorCode1={row[0].code} colorCode2={row[1].code} />
               ))}  
            </div>
            
            {group3?
            <div className="customAllColorsDiv">
              <p className="roboto customH1" style={{fontSize:"19px",paddingBottom:"0px"}}>{model[id].name3.name} <span className="roboto" style={{float:"right",fontWeight:"500",fontSize:"18px",paddingRight:"20px"}}>{model[id].name3.price}</span></p>
              {group3.map((row, index)=>(
                <ColorDivMain key={index} title={model[id].title} price={model[id].name3.intPrice}  onChecked={chooseColor} images1={row[0].images}  images2={row[1].images} colorName1={row[0].color} colorName2={row[1].color} colorCode1={row[0].code} colorCode2={row[1].code} />
               ))} 
            </div>
            :null}
            <div style={{display:"flex",justifyContent:"center"}}>
            
               <button  onClick={submit}  style={{marginBottom:"5px", marginTop:"14px"}} id=" modelMarginTop" className="loginInput loginButton signupInput signupButton modelButton">Configure & Buy</button>
            
            </div>
            </div>




            </div>
    </div>
      <Footer />  
    </div>)
}



export default Model;
