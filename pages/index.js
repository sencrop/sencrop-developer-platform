import Link from 'next/link'
import Layout from '../components/Layout'

const Index = () => (
  <Layout title={ 'Bring super powers to farmers!' } description={
`Welcome to the Sencrop Developer Platform!
 Build new farming practices by using our API!`.replace(/\n/, '')
  } home>
    <h1>Sencrop Developer Platform</h1>
    <p><strong>
      Warning: Our API is currently in a very
      early state. Using it right now implies
      acknowledging you want to be an early
      adopter and you accept we will do lots
      of changes in a non backward compatible
      way.
    </strong></p>
    <p>
      Welcome on board! At Sencrop, we love
      developers. This platform's goal is
      intended to bring you everything you
      need to invent tomorrow's farming
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
      reference</a></Link>
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
      to <a href="javascript: alert('501')">contact
      us</a> if you have any question!
    </p>
    <p>
      PS: This website source can be found
      on <a href="https://github.com/sencrop/sencrop-developer-platform"
        >GitHub</a>,
    </p>
    <h2>Developer Mailing List</h2>
    <form action="/" target="_blank">
      <p>Keep informed on our API evolutions:</p>
      <label>Email: <input type="email" autocapitalize="none" autocorrect="off" name="email" placeholder="dennis.richie@heaven.org" required="required" /></label>
      <input type="submit" />
    </form>
  </Layout>
)

export default Index
