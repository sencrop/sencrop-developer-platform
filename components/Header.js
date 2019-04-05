import styled, { css } from 'styled-components'
import { color, spacing } from '../ui'
import Link from 'next/link'

const Header = (props) => (
  <div className="root">
    <img src="/static/images/logo.png" />
    <Link href="/">
      <a className={props.home && 'active' || 'not'}>Home</a>
    </Link>
    <Link href="/guide">
      <a className={props.guide && 'active' || 'not'}>API Guide</a>
    </Link>
    <Link href="/partners">
      <a className={props.partners && 'active'}>Partners API</a>
    </Link>
    <Link href="/reference">
      <a className={props.reference ? 'active' : 'not'}>API Reference</a>
    </Link>
    <Link href="/tools">
      <a className={props.tools && 'active' || 'not'}>Tools</a>
    </Link>
    <a href="https://sencrop.typeform.com/to/dFLmCl"
      target="_blank">
      Bug report
    </a>
    <style jsx>{`
      .root {
        display: flex;
        align-items: center;
        background-color: #fff;
        paddind-left: ${spacing()};
        box-shadow: 0 8px 16px rgba(0,0,0,.15);
      }
      a {
        cursor: pointer;
        color: ${color('anthracite')};
        margin: 0;
        padding: ${spacing()};
      }
      a:hover {
        color: ${color('green', 'light')};
        text-decoration: underline;
      }
      a.active {
        color: ${color('green')};
        padding-bottom: 13px;
        border-bottom: 3px solid ${color('green')};
      }
      img {
        max-height: 27px;
        margin: -5px ${spacing(2)} 0 ${spacing()};
      }
    `}</style>
  </div>
)

export default Header

