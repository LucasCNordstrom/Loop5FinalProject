import '../CSS/Footer.css';


const Footer = () => {
  
  return ( 
    <div className='footer'>
      <p>Copyright &copy; 2022 L∞p5.</p>
      <img src='https://brand.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg' alt="linkedin-icon"/>
      <div>
        <a href='https://www.linkedin.com/in/bj%C3%B6rn-noctiluca-35aaab242/' target="_blank" rel="noreferrer"> Björn Noctiluca </a>
        <a href='https://www.linkedin.com/in/laura-gheorghe-107047244/' target="_blank" rel="noreferrer"> Laura Gheorghe </a>
        <a href='https://www.linkedin.com/in/lucas-nordstr%C3%B6m-00b945158/' target="_blank" rel="noreferrer"> Lucas Nordström </a>
        <a href='https://www.linkedin.com/in/monika-polishetty/' target="_blank" rel="noreferrer"> Monika Polishetty </a>
      </div>
    </div>
  );
};

export default Footer;