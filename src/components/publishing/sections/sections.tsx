import React from "react"
import styled, { StyledFunction } from "styled-components"
import Header from "../header/header"
import Authors from "./authors"
import Embed from "./embed"
import ImageCollection from "./image_collection"
import ImagesetPreview from "./imageset_preview"
import SectionContainer from "./section_container"
import Text from "./text"
import Video from "./video"

interface SectionsProps {
  article: {
    layout: string
    authors?: any
    postscript?: string
  }
}

interface StyledSectionsProps {
  layout: string
}

const Sections: React.SFC<SectionsProps> = props => {
  const header = props.article.layout === "standard" ? <Header article={props.article} /> : false
  return (
    <StyledSections layout={props.article.layout}>
      {header}
      {renderSections(props.article)}
      {renderPostScript(props.article)}
      {renderAuthors(props.article.authors)}
    </StyledSections>
  )
}

function renderSections(article) {
  const sections = article.sections
  const renderedSections = sections.map((section, i) => {
    const child = getSection(section, article.layout)
    const layout = section.body ? findBlockquote(section.body, article.layout) : section.layout
    if (child) {
      return (
        <SectionContainer key={i} layout={layout}>
          {child}
        </SectionContainer>
      )
    }
  })
  return renderedSections
}

function getSection(section, layout) {
  const sections = {
    image_collection: <ImageCollection images={section.images} targetHeight={500} gutter={10} />,
    image_set: <ImagesetPreview section={section} />,
    video: <Video section={section} />,
    embed: <Embed section={section} />,
    text: <Text html={section.body} layout={layout} />,
    default: false,
  }
  return sections[section.type] || sections["default"]
}

function renderAuthors(authors) {
  if (authors) {
    return <SectionContainer><Authors authors={authors} /></SectionContainer>
  } else {
    return false
  }
}

function renderPostScript(article) {
  if (article.postscript) {
    return (
      <SectionContainer>
        <Text html={article.postscript} layout={article.layout} postscript={article.postscript ? true : false} />
      </SectionContainer>
    )
  }
}

const chooseMargin = layout => {
  if (layout === "standard") {
    return "60px 0 0 0;"
  } else if (layout === "feature") {
    return "80px auto 0 auto;"
  }
}

function findBlockquote(html, articleLayout) {
  if (html.includes("<blockquote>")) {
    return articleLayout === "feature" ? "blockquote" : "overflow_fillwidth"
  } else {
    return false
  }
}

const Div: StyledFunction<StyledSectionsProps> = styled.div

const StyledSections = Div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: ${props => chooseMargin(props.layout)}
  max-width: ${props => (props.layout === "standard" ? "780px" : "auto")};
`

export default Sections