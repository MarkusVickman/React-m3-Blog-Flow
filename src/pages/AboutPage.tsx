
const AboutPage = () => {
  return (
    <section className="container">
    <h1 className="title mt-5">Om Flow</h1>
    <p>Flow är en blogplattform för korta meddelanden. Om hatiska meddelanden uppstår kan de plockas bort av en admin, men den generella hållningen är att alla ämnen får diskuteras.</p>
    <h2 className="title mt-5">Teknik</h2>
    <p>Plattformen använder MySQL samt Nest.js för databas och backend-lösning. Flow är skapad med React och stylad med Bulma.</p>
    <p>Flow är skapad av <b>Markus Vickman</b>.</p>
    </section>
  )
}

export default AboutPage