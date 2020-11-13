import React from 'react';

const Images = (props) => {

  return (
    <div className="d-flex justify-content-center align-items-center flex-row flex-wrap">
      {props.images && props.images.length ? (
        props.images.map((image, index) => (
          <img src={image.src} key={index} alt={`${image}_${index}`} style={{height:"10rem", width: "10rem"}} className="p-2"/>
        ))
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <h1>chargement....</h1>
        </div>
      )}
    </div>
  )
}

export default Images