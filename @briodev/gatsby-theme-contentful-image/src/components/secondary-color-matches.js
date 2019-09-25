import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "gatsby"
import Img from 'gatsby-image'
import styled from '@emotion/styled'

function SecondaryColorMatch(props) {

  const color = props.colorFilter
  const allSlabs = props.slabs
  const slabOptions = allSlabs.filter(slab => slab.node.secondaryColors.find(colors => slab.node.secondaryColors.includes(color) ) )
  return (
    <div>
      <h3>You may also like these stones that have {color} in them.</h3>

      <p>Secondary Color Match: {color}</p>
      {/* { JSON.stringify(slabOptions, null, 2) } */}

      <ImageGrid>
          {slabOptions ? slabOptions.map(({ node }, index) => (
              <div key={index}>
                  <Link to={`/slabs/${node.page.slug}`}>
                      <Img fixed={node.slabImage.localFile.childImageSharp.fixed} alt={`${node.material} slab ${node.name} sample color`} />
                  </Link>
                  <SlabDetail>{node.name}</SlabDetail>
              </div>
          )) : null }
      </ImageGrid>

      
    </div>
  )
}

SecondaryColorMatch.propTypes = {
  colorFilter: PropTypes.string,
  slabs: PropTypes.array
}

export default SecondaryColorMatch


const SlabDetail = styled.div`
    text-align: center;
`

const ImageGrid = styled.div`
    margin-top: 2em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    grid-auto-rows: minmax(250px, auto);
    grid-gap: 1em;
    justify-items: center;
`

