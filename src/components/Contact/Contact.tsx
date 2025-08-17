import { useEffect, useState } from "react";
import "./Contact.scss";
import { FaRegCheckSquare } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { CircleLoader } from "react-spinners";
import request from "../../helpers/request";

const Contact = () => {
    const [usernameValue, setUsernameValue] = useState<string>("");
    const [emailValue, setEmailValue] = useState<string>("");
    const [titleValue, setTitleValue] = useState<string>("");
    const [contentValue, setContentValue] = useState<string>("");

    const [currentAlert, setCurrentAlert] = useState<string>("");
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);

    const [isSending, setIsSending] = useState<boolean>(false);

    const cleanFields = () => {
        setUsernameValue("");
        setEmailValue("");
        setTitleValue("");
        setContentValue("");
    };

    function isEmail(str: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(str);
    }

    const handleCheckFields = () => {
        if (
            usernameValue == "" ||
            !isEmail(emailValue) ||
            titleValue == "" ||
            contentValue == ""
        ) {
            return false;
        }
        return true;
    };

    const handleSendForm = async () => {
        if (handleCheckFields() == false) {
            setCurrentAlert("error");
            setAlertMessage("Please fill in all the fields correctly");
            setAlertOpen(true);
            cancelTimeout();
            setTimeoutId(
                setTimeout(() => {
                    setAlertOpen(false);
                }, 2000)
            );

            return;
        }
        setIsSending(true);
        const { data, status } = await request.post("/contact", {
            username: usernameValue,
            email: emailValue,
            title: titleValue,
            content: contentValue,
        });

        if (status == 200) {
            setCurrentAlert("success");
            setAlertMessage("Successfully sent message.");
            cleanFields();
            setAlertOpen(true);
            cancelTimeout();
            setTimeoutId(
                setTimeout(() => {
                    setAlertOpen(false);
                }, 2000)
            );
        } else {
            console.error(data.message);
            setCurrentAlert("error");
            setAlertMessage("Something went wrong. Try again later.");
            setAlertOpen(true);
            cancelTimeout();
            setTimeoutId(
                setTimeout(() => {
                    setAlertOpen(false);
                }, 2000)
            );
        }
        setIsSending(false);
    };

    useEffect(() => {
        const id = setTimeout(() => {
            console.log("This will not run if you cancel");
        }, 5000);
        setTimeoutId(id);

        return () => clearTimeout(id);
    }, []);

    const cancelTimeout = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    };

    return (
        <>
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
                            value={usernameValue}
                            onChange={(e) => {
                                setUsernameValue(e.target.value);
                            }}
                        />
                        <input
                            type="email"
                            className="email"
                            placeholder="E-mail"
                            value={emailValue}
                            onChange={(e) => {
                                setEmailValue(e.target.value);
                            }}
                        />
                    </div>
                    <input
                        type="text"
                        className="title"
                        placeholder="Title"
                        value={titleValue}
                        onChange={(e) => {
                            setTitleValue(e.target.value);
                        }}
                    />
                    <textarea
                        className="message"
                        placeholder="Message here..."
                        value={contentValue}
                        onChange={(e) => {
                            setContentValue(e.target.value);
                        }}
                    ></textarea>
                    <button
                        className="sendMessage"
                        onClick={(e) => {
                            e.preventDefault();
                            handleSendForm();
                        }}
                    >
                        Send
                    </button>
                </form>
            </div>
            <div
                className={`contactAlert ${
                    alertOpen ? "alertVisible" : "alertHidden"
                }`}
            >
                {currentAlert == "success" ? (
                    <FaRegCheckSquare
                        size={30}
                        fill="green"
                        filter="drop-shadow(0px 0px 1px green)"
                    />
                ) : (
                    ""
                )}
                {currentAlert == "wrong" ? (
                    <MdOutlineCancel
                        size={30}
                        fill="red"
                        filter="drop-shadow(0px 0px 1px red)"
                    />
                ) : (
                    ""
                )}
                {currentAlert == "error" ? (
                    <MdErrorOutline
                        size={30}
                        fill="orange"
                        filter="drop-shadow(0px 0px 1px orange)"
                    />
                ) : (
                    ""
                )}
                <p>{alertMessage}</p>
            </div>
            {isSending ? (
                <div className="sendingScreen">
                    <CircleLoader size={200} color="#FFFFFF" />
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default Contact;
