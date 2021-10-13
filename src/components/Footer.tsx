import React from 'react';

export default function DefaultFooter() {

    return (
        <footer id="footer">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
            <link href="https://use.fontawesome.com/releases/v5.0.4/css/all.css" rel="stylesheet" />

            <div className="centerItems defaultTheme" style={{ paddingTop: '20px', fontWeight: 700 }}>
                <p className="follow-us-text">Follow us</p>
            </div>
            <div >
                <ul className="centerItems defaultTheme ul">
                    <li>
                        <a href="https://facebook.com/" className="a">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://linkedin.com/" className="a">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://instagram.com/" className="a">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/" className="a">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://reddit.com/" className="a">
                            <i className="fab fa-reddit"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className={"centerItems defaultTheme padding"}>
                Copyright &copy; 2020 - Company Name. All Rights Reserved.
            </div>
        </footer>
    );
}
