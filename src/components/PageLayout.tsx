import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
