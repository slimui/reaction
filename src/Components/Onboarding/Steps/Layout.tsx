import React from "react"
import styled from "styled-components"

import Colors from "../../../Assets/Colors"
import InvertedButton from "../../Buttons/Inverted"
import { media } from "../../Helpers"
import StyledTitle from "../../Title"

interface Props {
  title: string
  subtitle: string
  onNextButtonPressed?: () => void
  isLastStep?: boolean | null
}

const Container = styled.div`
  max-width: 930px;
  margin-left: auto;
  margin-right: auto;
  ${media.sm`
    margin: 20px;
  `};
`

const MainTitle = styled(StyledTitle)`
  text-align: center;
  line-height: normal;
  margin-bottom: 6px;
  ${media.sm`
    text-align: left;
  `};
`
const Subtitle = styled(StyledTitle)`
  color: ${Colors.grayDark};
  margin-top: 6px;
  margin-bottom: 30px;
  text-align: center;
  line-height: normal;
  ${media.sm`
    text-align: left;
    margin-bottom: 15px;
    font-size: 20px
  `};
`

const ItemContainer = styled.div`
  padding-bottom: 50px;
`

/* MS IE11 and Edge don't support for the sticky position property */
const FixedButttonContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0px;
`

/* Mobile safari doesn't support for the fixed position property:
 *   https://www.eventbrite.com/engineering/mobile-safari-why/
 **/
const StickyButtonContainer = styled.div`
  position: sticky;
  bottom: 0px;
  background: linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 17%, white 35%, white);
  display: flex;
  justify-content: center;
`

const NextButton = styled(InvertedButton)`
  margin: 50px 0px;
  display: block;
  width: 250px;

  &:disabled {
    background: white;
    border: 1px solid ${Colors.grayRegular};
    color: ${Colors.grayMedium};
  }

  ${media.sm`
    width: 100%;
    margin: 25px 0 0;
  `};
`

export class Layout extends React.Component<Props, null> {
  render() {
    const disabled = !this.props.onNextButtonPressed
    const buttonText = this.props.isLastStep ? "finished" : "next"
    return (
      <Container>
        <MainTitle>{this.props.title} </MainTitle>
        <Subtitle>{this.props.subtitle}</Subtitle>
        <ItemContainer>
          {this.props.children}
        </ItemContainer>

        <FixedButttonContainer>
          <StickyButtonContainer>
            <NextButton
              disabled={disabled}
              onClick={this.props.onNextButtonPressed}
            >
              {buttonText}
            </NextButton>
          </StickyButtonContainer>
        </FixedButttonContainer>
      </Container>
    )
  }
}
