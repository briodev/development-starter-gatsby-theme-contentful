import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import PageMeta from '../components/seo-slab'
import styled from '@emotion/styled'
import RelatedImages from '../components/images-related-slab'

const ImageContainer = styled.div`
  margin: 3em auto;
  padding: 3em;
  width: 800px;
  height: auto;
`
const ImageWrapper = styled.div`
  background-color: #4f4f4f;
`

class GraniteTemplate extends Component {

  render() {
    const {
      name,
      page,
      material,
      description,
      slabImage,
      movement,
      vendor,
      primaryColor,
      secondaryColors,
    } = this.props.data.contentfulSlab


    const slabDetail = data.contentfulSlab
    const vendorNames = vendor.map((vendor, index) =><li key={index}>{vendor.name}</li>)
    const colorsSecondary = secondaryColors.map((color, index) =><li key={index}>{color}</li>)
    const image = slabImage.localFile.childImageSharp.fluid

    return (
      <main>
        <PageMeta data={page}/>
          <div>
            <h1>{name}</h1>
            <div>{material}</div>
            <p>{description.description}</p>
            <p>{movement}</p>
            <ul>{vendorNames}</ul>
            <p>{primaryColor}</p>
            <ul>{colorsSecondary}</ul>
            <ImageWrapper>
              <ImageContainer>
                { image ? (<Img fluid={image} />):null }
              </ImageContainer>
            </ImageWrapper>
          </div>
          <RelatedImages slabDetail={slabDetail} />
      </main>
    )
  }
}

GraniteTemplate.propTypes = {
  data: PropTypes.object.isRequired
}

export default GraniteTemplate

export const pageQuery = graphql`
  query graniteTemplatesQuery($slug: String!) {
    contentfulSlab(page: {slug: {eq: $slug}}) {
      id
      name
      material
      primaryColor
      secondaryColors
      movement
      page {
        slug
        metaTitle
        metaDescription
      }
      description {
        description
      }
      slabImage {
        file {
          url
          fileName
        }
        localFile {
          absolutePath
          publicURL
          childImageSharp {
            fluid(maxWidth: 2800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      vendor {
        name
      }
    }
  }

`