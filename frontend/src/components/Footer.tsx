import "./Footer.css";

function Footer() {
  return (
    <footer className="Footer">
      <div className="FooterLeft">
        <div className="Msg11">
          Ready for<br></br>
          <span> AN AWESOME</span> Life?
        </div>
        <div className="Msg12">
          <img className="badge-icon" src="./Vector.png" />
          Info@bravestore.com
        </div>
      </div>
      <div className="FooterMid">
        <img className="LogoF" src="./LogoF.png" />
        <div className="Msg21">2024 . All rights reserved.</div>
      </div>
      <div className="FooterRight">
        <div className="Msg31">
          <h3>Follow us :</h3>
          <img className="badge-icon" src="./icon4.png" />
          <img className="badge-icon" src="./icon3.png" />
          <img className="badge-icon" src="./icon2.png" />
          <img className="badge-icon" src="./icon1.png" />
        </div>
        <div className="Msg32">
          <span>Contact us :</span>
          <div className="Msg23"> +91 9876543210 </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
