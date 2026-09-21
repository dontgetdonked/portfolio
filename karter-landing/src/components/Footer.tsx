import { Link } from 'react-router-dom'
import { company, services } from '@/data/site'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <h2>ATRIUM Construct SRL</h2>
          <p>
            Construim și renovăm în Cluj-Napoca din 2011, cu echipe proprii și un singur contract
            pentru toată lucrarea.
          </p>
          <ul style={{ marginTop: 16 }}>
            <li>{company.address}</li>
            <li>
              <a href={company.phoneHref}>{company.phone}</a>
            </li>
            <li>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h2>Servicii</h2>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/servicii#${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Firma</h2>
          <ul>
            <li>
              <Link to="/proiecte">Proiecte</Link>
            </li>
            <li>
              <Link to="/despre">Despre noi</Link>
            </li>
            <li>
              <Link to="/testimoniale">Testimoniale</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/oferta">Cere ofertă</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2>Zone acoperite</h2>
          <ul>
            {company.coverage.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap">
        <p className="footer-big" aria-hidden>
          Atrium
        </p>
      </div>

      <div className="wrap footer-bottom">
        <span>
          © {new Date().getFullYear()} ATRIUM Construct SRL, înregistrată {company.reg}, CUI {company.cui}
        </span>
        <span>Firmă fictivă, creată ca proiect de portofoliu. Fotografii ilustrative de pe Unsplash.</span>
      </div>
    </footer>
  )
}
