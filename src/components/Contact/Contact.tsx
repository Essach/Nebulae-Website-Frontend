import "./Contact.scss";

const Contact = () => {
    return (
        <div className="contact" id="contact">
            <div className="contactTop">
                <h1 className="contactTitle">Get in touch</h1>
                <div className="titleLine"></div>
            </div>
            <form className="contactForm">
                <div className="usernameAndMail">
                    <input
                        type="text"
                        className="username"
                        placeholder="Discord username"
                    />
                    <input
                        type="email"
                        className="email"
                        placeholder="E-mail"
                    />
                </div>
                <input type="text" className="title" placeholder="Title" />
                <textarea
                    className="message"
                    placeholder="Message here..."
                ></textarea>
                <button className="sendMessage">Send</button>
            </form>
        </div>
    );
};

export default Contact;
