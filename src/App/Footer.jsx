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
            
            <footer className="bg-light text-center text-white">    
                <div className="text-center p-3 bg-dark text-white">
                © {year} - {applicationName} by 
                <a> </a>
                <a className="text-white" href="https://fr.linkedin.com/in/thomas-tiercin">{creator}</a>
                </div>
            </footer>
        )
    }
}

export { Footer }; 