import Link from 'next/link'
import Layout from '../components/Layout'

const Index = () => (
  <Layout title={ 'Bring super powers to farmers!' } description={
`Welcome to the Sencrop Developer Platform!
 Build new farming practices by using our API!`.replace(/\n/, '')
  }>
    <h1>Sencrop Developer Platform</h1>
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
      want a <Link href="/tools"><a>quick
      introduction</a></Link> to our API usage.
    </p>
    <p>
      Also, you can directly check
      our <Link href="/tools"><a>API
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
  </Layout>
)

export default Index
