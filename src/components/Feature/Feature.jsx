import React from "react"
import "./Feature.scss";

function Feature({ logo, altText, title, description }) {
    return (
        <article className="feature-item">
            <img
                src={logo}
                alt={altText}
                className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{description}</p>
        </article>
    )
}

export default Feature;