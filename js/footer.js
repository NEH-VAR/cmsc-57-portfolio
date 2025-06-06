$(document).ready(function() {
    // Create the footer HTML
    var footerHTML = `
        <div>
            <p>RAVHEN GRAGEDA</p>
        </div>
        <div>
            <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; width: 300px;">
                <a href="https://www.facebook.com/RavhenYT17/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; border: 0; width: 32px; height: 32px; padding: 0; margin: 3px; color: #ffffff;">
                    <svg class="niftybutton-facebook" style="display: block; fill: currentColor" data-donate="true" data-tag="fac" data-name="Facebook" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet">
                        <title>Facebook social icon</title>
                        <path d="M211.9 197.4h-36.7v59.9h36.7V433.1h70.5V256.5h49.2l5.2-59.1h-54.4c0 0 0-22.1 0-33.7 0-13.9 2.8-19.5 16.3-19.5 10.9 0 38.2 0 38.2 0V82.9c0 0-40.2 0-48.8 0 -52.5 0-76.1 23.1-76.1 67.3C211.9 188.8 211.9 197.4 211.9 197.4z"></path>
                    </svg>
                </a>
                <a href="https://www.linkedin.com/in/nehvar/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; border: 0; width: 32px; height: 32px; padding: 0; margin: 3px; color: #ffffff;">
                    <svg class="niftybutton-linkedin" style="display: block; fill: currentColor" data-donate="true" data-tag="lin" data-name="LinkedIn" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet">
                        <title>LinkedIn social icon</title>
                        <path d="M186.4 142.4c0 19-15.3 34.5-34.2 34.5 -18.9 0-34.2-15.4-34.2-34.5 0-19 15.3-34.5 34.2-34.5C171.1 107.9 186.4 123.4 186.4 142.4zM181.4 201.3h-57.8V388.1h57.8V201.3zM273.8 201.3h-55.4V388.1h55.4c0 0 0-69.3 0-98 0-26.3 12.1-41.9 35.2-41.9 21.3 0 31.5 15 31.5 41.9 0 26.9 0 98 0 98h57.5c0 0 0-68.2 0-118.3 0-50-28.3-74.2-68-74.2 -39.6 0-56.3 30.9-56.3 30.9v-25.2H273.8z"></path>
                    </svg>
                </a>
                <a href="https://mail.google.com/mail/?extsrc=mailto&url=mailto:rmgrageda@up.edu.ph" target="_blank" rel="noopener noreferrer" style="text-decoration: none; border: 0; width: 32px; height: 32px; padding: 0; margin: 3px; color: #ffffff;">
                    <svg class="niftybutton-email" style="display: block; fill: currentColor" data-donate="true" data-tag="ema" data-name="Email" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet">
                        <title>Email icon</title>
                        <path d="M101.3 141.6v228.9h0.3 308.4 0.8V141.6H101.3zM375.7 167.8l-119.7 91.5 -119.6-91.5H375.7zM127.6 194.1l64.1 49.1 -64.1 64.1V194.1zM127.8 344.2l84.9-84.9 43.2 33.1 43-32.9 84.7 84.7L127.8 344.2 127.8 344.2zM384.4 307.8l-64.4-64.4 64.4-49.3V307.8z"></path>
                    </svg>
                </a>
                <a href="https://github.com/NEH-VAR" target="_blank" rel="noopener noreferrer" style="text-decoration: none; border: 0; width: 32px; height: 32px; padding: 0; margin: 3px; color: #ffffff;">
                    <svg class="niftybutton-github" style="display: block; fill: currentColor" data-donate="true" data-tag="git" data-name="Github" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet">
                        <title>Github social icon</title>
                        <path d="M256 70.7c-102.6 0-185.9 83.2-185.9 185.9 0 82.1 53.3 151.8 127.1 176.4 9.3 1.7 12.3-4 12.3-8.9V389.4c-51.7 11.3-62.5-21.9-62.5-21.9 -8.4-21.5-20.6-27.2-20.6-27.2 -16.9-11.5 1.3-11.3 1.3-11.3 18.7 1.3 28.5 19.2 28.5 19.2 16.6 28.4 43.5 20.2 54.1 15.4 1.7-12 6.5-20.2 11.8-24.9 -41.3-4.7-84.7-20.6-84.7-91.9 0-20.3 7.3-36.9 19.2-49.9 -1.9-4.7-8.3-23.6 1.8-49.2 0 0 15.6-5 51.1 19.1 14.8-4.1 30.7-6.2 46.5-6.3 15.8 0.1 31.7 2.1 46.6 6.3 35.5-24 51.1-19.1 51.1-19.1 10.1 25.6 3.8 44.5 1.8 49.2 11.9 13 19.1 29.6 19.1 49.9 0 71.4-43.5 87.1-84.9 91.7 6.7 5.8 12.8 17.1 12.8 34.4 0 24.9 0 44.9 0 51 0 4.9 3 10.7 12.4 8.9 73.8-24.6 127-94.3 127-176.4C441.9 153.9 358.6 70.7 256 70.7z"></path>
                    </svg>
                </a>
            </div>
        </div>
    `;
    
    // Append the footer to the body (or another container of your choice)
    $('footer').append(footerHTML);
});