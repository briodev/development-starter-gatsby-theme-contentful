import React, { useState, useEffect } from 'react';
import { Link, graphql} from "gatsby"
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import PageMeta from "../../components/seo-slab"
import SecondaryColors from "../../components/secondary-color-matches"



export default ({data}) => {
    const materialOptions = data.allContentfulSlab.distinctMaterial
    const primaryColorOptions = data.allContentfulSlab.distinctPrimaryColor
    const [slabs, setSlabs] = useState(data.allContentfulSlab.edges);
    const [filters, setFilters] = useState({});
    const [filtered, setFiltered] = useState(slabs);
    let filteredItems = slabs;

    useEffect(() => {

        if(filters.material && filters.primaryColor) {
            filteredItems = slabs.filter(slab => slab.node.material === filters.material)
            filteredItems = filteredItems.filter(slab => slab.node.primaryColor === filters.primaryColor)
            return setFiltered(filteredItems)
        }

        if(filters.material) {
            filteredItems = slabs.filter(slab => slab.node.material === filters.material)
            return setFiltered(filteredItems)
        }

        if(filters.primaryColor) {
            filteredItems = slabs.filter(slab => slab.node.primaryColor === filters.primaryColor)
            return setFiltered(filteredItems)
        }

    }, filters);

    const handleChange = (event) => {
        if(event.target.name === 'material'){
            setFilters(
                {
                    ...filters,
                    material: event.target.value, 
                    selectedMaterialOption: event.target.value
                })
        }
        if(event.target.name === 'color'){
            setFilters(
                {
                    ...filters,
                    primaryColor: event.target.value, 
                    selectedColorOption: event.target.value
                })
        }
    }


    const resetFilters = () => {
        setFilters({material: null, primaryColor: null})
        setFiltered(slabs)
    }

    const meta = {
        metaTitle: "The granite slabs page"
    }

    return (
        <div>

            <PageMeta data={meta}/>


                <PageWrapper>

                    <h2>All Slabs {filters.material ? `in ${filters.material} material` : null} {filters.primaryColor ? `with a primary color of ${filters.primaryColor}` : null}</h2>
                    <FilterWrapper>
                        <h3>Filters</h3>

                        <form>
                            <FilterList>

                                <div>
                                    <h4>Material</h4>
                                    {materialOptions ? materialOptions.map((option, index) => (
                                        <FilterButton key={index}>
                                            <input
                                                type="radio" 
                                                name="material" 
                                                value={option}
                                                checked={filters.selectedMaterialOption === option || false}
                                                onChange={ (e) => handleChange(e)}
                                            />
                                            <label>{option}</label>
                                        </FilterButton>
                                    )):null}
                                </div>

                                <div>
                                    <h4>Primary Color</h4>
                                    {primaryColorOptions ? primaryColorOptions.map((option, index) => (
                                        <FilterButton key={index}>
                                            <input
                                                type="radio" 
                                                name="color" 
                                                value={option}
                                                checked={filters.selectedColorOption === option || false}
                                                onChange={ (e) => handleChange(e)}
                                            />
                                            <label>{option}</label>
                                        </FilterButton>
                                    )):null}
                                </div>

                            </FilterList>

                        </form>

                        <ResetButton>
                            <button onClick={() => {resetFilters()} }>Reset Filters</button>
                        </ResetButton>

                    </FilterWrapper>


                    <ImageGrid>
                        {filtered ? filtered.map(({ node }, index) => (
                            <div key={index}>
                                <Link to={`/slabs/${node.page.slug}`}>
                                    <Img fixed={node.slabImage.localFile.childImageSharp.fixed} alt={`${node.material} slab ${node.name} sample color`} />
                                </Link>
                                <SlabDetail>{node.name}</SlabDetail>
                            </div>
                        )) : slabs }
                    </ImageGrid>

                    <SecondaryColors colorFilter={filters.primaryColor} slabs={slabs}/>



                </PageWrapper>

        </div>
    )
}

export const query = graphql`
    {
        allContentfulSlab (sort: {fields: [name] order: ASC})
        {
            distinctMaterial: distinct(field: material)
            distinctPrimaryColor: distinct(field: primaryColor)
            edges {
                node {
                    name
                    material
                    primaryColor
                    secondaryColors
                    page {
                        slug
                    }
                    slabImage {
                        localFile {
                            childImageSharp {
                                fixed(height: 450, width: 450) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

const PageWrapper = styled.div`
    margin: 2rem;
`

const ImageGrid = styled.div`
    margin-top: 2em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    grid-auto-rows: minmax(250px, auto);
    grid-gap: 1em;
    justify-items: center;
`

const SlabDetail = styled.div`
    text-align: center;
`
const FilterWrapper = styled.div`
    text-align: center;
    background-color: silver;
    width: 100%;
    padding: 2em;
`

const FilterList = styled.div`
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`

const FilterButton = styled.div`
    width: 200px;
    display: flex;
    label {
    margin-top: -8px;
        padding .25em 0;
    }
    input {
        vertical-align: baseline;
        margin-right: .75em;
    }
`;

const ResetButton = styled.div`
    margin-top: 2em;
`