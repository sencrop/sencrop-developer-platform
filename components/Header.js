import styled, { css } from 'styled-components'
import { Link, color, spacing } from '../ui'

const Header = (props) => (
  <Wrapper>
    <Image src="/static/images/logo.png" />
    <StyledLink href="/">
      <a className={props.home && 'active' || 'not'}>Home</a>
    </StyledLink>
    <StyledLink href="/guide">
      <a className={props.guide && 'active' || 'not'}>API Guide</a>
    </StyledLink>
    <StyledLink href="/partners">
      <a className={props.partners && 'active'}>Partners API</a>
    </StyledLink>
    <StyledLink href="/reference">
      <a className={props.reference ? 'active' : 'not'}>API Reference</a>
    </StyledLink>
    <StyledLink href="/tools">
      <a className={props.tools && 'active' || 'not'}>Tools</a>
    </StyledLink>
    <a href="https://sencrop.typeform.com/to/dFLmCl"
      target="_blank">
      Bug report
    </a>
  </Wrapper>
)

export default Header

const Image = styled.img`
  max-height: 27px;
  margin: -5px ${spacing(2)} 0 ${spacing()};
`;

const Title = styled.span`
  color: ${color('green')};
  font-weight: 800;
  margin-left: ${spacing()};
  margin-right: ${spacing(3)};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  paddind-left: ${spacing()};
  box-shadow: 0 8px 16px rgba(0,0,0,.15);
  a {
    color: ${color('anthracite')};
    margin: 0;
    padding: ${spacing()};
    &:hover {
      color: ${color('green')};
    }
    &.active {
      color: ${color('green')};
      padding-bottom: 13px;
      border-bottom: 3px solid ${color('green')};
    }
  }
`;

const StyledLink = styled(Link)`
  ${props => props.active && 'color: red !important;'}
`;
