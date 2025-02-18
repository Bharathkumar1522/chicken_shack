import React from 'react';
import '../styles/styles.css';

const PageContent = () => {
return (
<section className="page-content" id='pageContent'>
    <img src="/images/chilli-1.webp" className="floating-bg chilli-1" alt="Chilli" />
    <img src="/images/lemon-2.webp" className="floating-bg chilli-2" alt="Lemon" />
    <img src="/images/parsley.webp" className="floating-bg parsley-2" alt="Parsley" />

    <h1 className="image-font-design">Crispy Juicy Smokey</h1>
    <h1 className="chicken-text">CHICKEN</h1>

    <div className="images-container">
    <div id="chicken-top-container">
        <img src="/chicken-img/chicken-3.webp" className="chicken-1" alt="Fried Chicken" />
        <h3 className="font-chicken">Fried</h3>
    </div>
    <div id="chicken-top-container">
        <img src="/chicken-img/chicken-1.webp" className="chicken-1" alt="Tandoor Chicken" />
        <h3 className="font-chicken">Tandoor</h3>
    </div>
    <div id="chicken-top-container">
        <img src="/chicken-img/chicken-2.webp" className="chicken-1" alt="Korean Chicken" />
        <h3 className="font-chicken">Korean</h3>
    </div>
    </div>
</section>
);
};

export default PageContent;
