import Link from 'next/link';

export default function Home() {
  return (
    <section className='home'>
      <h1 className='maintext'>
        Welcome to <span className='maintext_green'>REST Client</span>
      </h1>
      <p className='subtext'>
        A REST client enables and simplifies communication with any open RESTful
        API. It offers an abstraction over HTTP libraries that allows for
        convenient conversion to an HTTP request, and the creation of objects
        from an HTTP response.
        <br />
        To start using the application please sign up or login.
      </p>
      <div className='buttons-container'>
        <Link
          href='/auth'
          className='button button_colored'
        >
          Sign In
        </Link>
        <Link
          href='/auth'
          className='button button_colored'
        >
          Sign Up
        </Link>
      </div>
    </section>
  );
}
