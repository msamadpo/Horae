import React from 'react';
import NavBar from 'components/Marketing/NavBar';
import Hero from 'components/Marketing/Hero';
import About from 'components/Marketing/About';
import Product from 'components/Marketing/Product';

function Marketing() {
  return (
    <div>
      <NavBar />
      <Hero />
      <About />
      <Product />
    </div>
  );
}

export default Marketing;
