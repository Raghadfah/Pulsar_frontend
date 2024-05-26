import React from "react"

export function Footer() {
  return (
    <>
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h2 className="logo-text">Pulsar</h2>
            <p>
              Pulsar is your go-to destination for all space-related products. Discover the wonders
              of the universe with our high-quality telescopes and accessories.
            </p>
          </div>
          <div className="footer-section links">
            <h2>Links</h2>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/aboutUs">About Us</a>
              </li>
              <li>
                <a href="/products">Products</a>
              </li>
            </ul>
          </div>
          <div className="footer-section contact">
            <h2>Contact</h2>
            <p>
              <span>&#x1F4CD;</span> 123 Space Street, Galaxy Town
            </p>
            <p>
              <span>&#x1F4DE;</span> +123-456-7890
            </p>
            <p>
              <span>&#x2709;</span> info@pulsar.com
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Pulsar. All rights reserved.
        </div>
      </div>
    </footer>
    </>
  )
}
