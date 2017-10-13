import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
    <div>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/guide">
          <a style={linkStyle}>API Guide</a>
        </Link>
        <Link href="/reference">
        <a style={linkStyle}>API Reference</a>
        </Link>
        <Link href="/tools">
          <a style={linkStyle}>Tools</a>
        </Link>
        <a href="https://sencrop.typeform.com/to/dFLmCl"
          target="_blank">
          Bug report
        </a>
    </div>
)

export default Header
