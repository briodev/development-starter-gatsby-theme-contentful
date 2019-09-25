import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { Link } from "gatsby"
import styled from '@emotion/styled'

function ImagesRelatedSlab(props) {

  const relatedImages = props.images

  return (
    <div>
      <ImageGrid>
          {relatedImages ? relatedImages.map(({ imageFile }, index) => (
              <ImageContainer key={index}>
                  {/* <Link to={`/slabs/${node.page.slug}`}> */}
                  { imageFile ? (<Img fluid={imageFile.localFile.childImageSharp.fluid} alt={`ToDo - need alt data`} />):null }
                  {/* </Link> */}
              </ImageContainer>
          )) : null }
      </ImageGrid>
    </div>
  )
}

ImagesRelatedSlab.propTypes = {
  images: PropTypes.array,
}

export default ImagesRelatedSlab

const ImageGrid = styled.div`
    margin-top: 2em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    grid-auto-rows: minmax(250px, auto);
    grid-gap: 1em;
    justify-items: center;
`
const ImageContainer = styled.div`
  margin: 3em auto;
  padding: 3em;
  width: 800px;
  height: auto;
`
