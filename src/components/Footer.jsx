import ArrowRight from "../assets/svgs/ArrowRight";
import Heart from "../assets/svgs/Heart";
import LogoIcon from "../assets/svgs/LogoIcon";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="box">
          <div className="section-heading-box">
            <h3 className="gruppo">or just say “Hi”</h3>
          </div>
          <div className="footer-content">
            <div className="footer-top">
              <a href="mailto:contact@webexhaust.com?subject=Inquiry&body=Hello, I have a question about your services.">
                contact@webexhaust.com
              </a>
              <a
                href="https://www.instagram.com/webexhaust/"
                target="_blank"
                rel="noopener noreferrer"
              >
                instagram
              </a>
              <a
                href="https://wa.me/923003332400?text=Hello, I want to know more about your services."
                target="_blank"
                rel="noopener noreferrer"
              >
                whatsapp
              </a>
              <a
                href="https://www.linkedin.com/company/webexhaust/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin
              </a>
              <a
                href="https://www.behance.net/webexhaust"
                target="_blank"
                rel="noopener noreferrer"
              >
                behance
              </a>
              <a
                href="https://dribbble.com/webexhaust"
                target="_blank"
                rel="noopener noreferrer"
              >
                dribbble
              </a>
            </div>
          </div>
        </div>
      </footer>

      <section className="copyright-section">
        <div className="box">
          <div className="copyright-content">
            <div className="made-with">
              Made with <Heart /> by <LogoIcon />
            </div>
            <p>Copyright © 2024 All Rights Reserved</p>
            <div
              className="scroller"
              onClick={() => window.scrollTo({ top: 0 })}
            >
              <ArrowRight color="black" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
