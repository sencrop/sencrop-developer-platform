import Link from 'next/link'
import Layout from '../components/Layout'
import NoSSR from 'react-no-ssr';
import ReactDOM from 'react-dom'
import React from 'react'
import Anchor from '../components/Anchor'

export default class Index extends React.Component {
  render() {
    return <Layout title={ 'Bring super powers to farmers!' } description={
  `Welcome to the Sencrop Developer Platform!
   Build new farming practices by using our API!`.replace(/\n/, '')
    } home>
      <h1>Sencrop Developer Platform</h1>
      <p><strong>
        Warning: Our API is currently in
        a very early state. Using it right now
        implies acknowledging you want to be an
        early adopter and you accept we might do
        some changes in a non backward compatible
        way. Of course we will try to avoid this
        kind of changes and will alert you early
        on. Don&apos;t forget to subscribe to our{' '}
        <NoSSR onSSR={<span>mailing list</span>}><a href="#mailing_list" onClick={(e) => {
          e.preventDefault();
          this.refs.email.focus();
        }}>developer mailing list</a></NoSSR> to
        be warned of those changes.
      </strong></p>
      <p>
        Welcome on board! At Sencrop, we love
        developers. This platform&apos;s is
        intended to bring you everything you
        need to invent tomorrow&apos;s farming
        practices.
      </p>
      <p>
        Wondering what the hell is Sencrop?
        Check out our <a
        href="http://sencrop.com/en/">corporate
        website</a>.
      </p>
      <p>
        If you are new to the Sencrop API, you may
        want a <Link href="/guide"><a>quick
        introduction</a></Link> to our API usage.
      </p>
      <p>
        Also, you can directly check
        our <Link href="/reference"><a>API
        reference</a></Link>{' '}
        for a more direct appraoch.
      </p>
      <p>
        Finally, if you use Swagger and/or JavaScript you may
        find interest in our <Link href="/tools"><a>open-source
        tools</a></Link>.
      </p>
      <p>
        We wish you an exciting journey through the
        Sencrop world! Feel free
        to <a href="https://sencrop.typeform.com/to/XzDjNC">contact
        us</a> if you have any question!
      </p>
      <p>
        PS: This website source can be found
        on <a href="https://github.com/sencrop/sencrop-developer-platform"
          >GitHub</a>.
      </p>
      <h2><Anchor text="Developer Mailing List" id="mailing_list" /></h2>
      <form method="post" action="https://evomedia.us3.list-manage.com/subscribe/post?u=c993ab1c009fbcbc61dea24cd&amp;id=b7ef162deb" target="_blank">
        <div style={{
            position: 'absolute',
            left: '-5000px'
          }}
          aria-hidden="true"
          >
          <input type="text" ref="email" name="b_c993ab1c009fbcbc61dea24cd_b7ef162deb" tabIndex="-1" value="" />
        </div>
        <p>Keep informed on our API evolutions:</p>
        <label>Email: <input type="email" autoCapitalize="none" autoCorrect="off" name="EMAIL" placeholder="dennis.richie@heaven.org" required="required" id="mailing_list_email" /></label>
        <input type="submit" name="subscribe" value="Subscribe" />
      </form>
    </Layout>;
  }
}
