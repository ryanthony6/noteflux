import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary pb-8 bottom-0 w-full">
      <div className="container">
        <div className="w-full border-slate-700 pt-8">
          <p className="text-center text-xs font-medium text-slate-500">
            Made with <span className="text-pink-500">❤️</span> by{" "}
            <a
              href="https://github.com/andikamal"
              className="text-white hover:text-pink-500"
            >
              ryanthony6
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
