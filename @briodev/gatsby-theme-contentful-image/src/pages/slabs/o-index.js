import React, { useState, useEffect } from 'react';
import { Link, graphql} from "gatsby"
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import PageMeta from "../../components/seo-slab"

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
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    padding: .5em 1em;
`

const FilterButton = styled.button`
    background: ${props => props.activebutton || 'green'};
    :focus {
        outline: none;
    }
`;

const ResetButton = styled.div`
    margin-top: 2em;
`

export default ({data}) => {
    const materialOptions = data.allContentfulSlab.distinctMaterial
    const primaryColorOptions = data.allContentfulSlab.distinctPrimaryColor
    const [slabs, setSlabs] = useState(data.allContentfulSlab.edges);
    const [filters, setFilters] = useState({});
    const [filtered, setFiltered] = useState(slabs);
    const [activeMaterialButton, setActiveMaterialButton] = useState({event: null, color: 'green'});
    const [activeColorButton, setActiveColorButton] = useState({event: null, color: 'green'});
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


    const filterSlabs = (filter, event) => {
        event.target.style.backgroundColor = 'purple';
        if(event.target.value === 'material filter') {
            if(activeMaterialButton.event) {
                let targetButton = ""
                targetButton = document.getElementById(activeMaterialButton.event);
                targetButton.style.backgroundColor = 'green'
            }
            setActiveMaterialButton({event:event.target.id})
        }
        if(event.target.value === 'color filter') {
            if(activeColorButton.event) {
                let targetButton = ""
                targetButton = document.getElementById(activeColorButton.event);
                targetButton.style.backgroundColor = 'green'
            }
            setActiveColorButton({event:event.target.id})
        }

        setFilters({
            material: filter.material || filters.material,
            primaryColor: filter.primaryColor || filters.primaryColor
        })
    }

    const resetFilters = () => {
        setFilters({material: null, primaryColor: null})
        setFiltered(slabs)
        if(activeColorButton.event) {
            let targetButton = ""
            targetButton = document.getElementById(activeColorButton.event);
            targetButton.style.backgroundColor = 'green'
        }
        if(activeMaterialButton.event) {
            let targetButton = ""
            targetButton = document.getElementById(activeMaterialButton.event);
            targetButton.style.backgroundColor = 'green'
        }
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

                        <h6>Material</h6>
                        <FilterList>
                            {materialOptions ? materialOptions.map((option, index) => (
                                <FilterButton id={option} value="material filter" key={index} onClick={(event) => {filterSlabs( {material: option}, event )}}>{option}</FilterButton>
                            )):null}
                        </FilterList>

                        <h6>Primary Color</h6>
                        <FilterList>
                            {primaryColorOptions ? primaryColorOptions.map((option, index) => (
                                <FilterButton id={option}  value="color filter" key={index} onClick={(event) => {filterSlabs({primaryColor: option}, event)}}>{option}</FilterButton>
                            )):null}
                        </FilterList>
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