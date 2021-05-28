import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            applicationName: "Yummi Cook",
            creator : "ThomasTiercin"
        };
    }    
    render() {
        const { year, applicationName,creator } = this.state;
        return (
            
            <footer class="bg-light text-center text-white">    
                <div class="text-center p-3 bg-dark text-white">
                © {year} - {applicationName} by 
                <a> </a>
                <a class="text-white" href="https://fr.linkedin.com/in/thomas-tiercin">{creator}</a>
                </div>
            </footer>
        )
    }
}

export { Footer }; 