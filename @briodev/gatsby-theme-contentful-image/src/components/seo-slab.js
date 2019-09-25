import React from "react";
import { Helmet } from "react-helmet"

export default props => {
  const {
    metaTitle, 
    metaDescription
  } = props.data
  
  return (
    <Helmet >
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
    </Helmet>
  )
};