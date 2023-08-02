import classes from "./Notification.module.css";

const Notification = (props) => {
    let specialClasses = "";

    if (props.status === "error") {
        specialClasses = classes.error;
    }

    if (props.status === "success") {
        specialClasses = classes.success;
    }

    const cssClasses = `${classes.notification} ${specialClasses}`;

    return (
        <section className={cssClasses}>
            <h2>{props.title}</h2>
            <p>{props.message}</p>
        </section>
    );
};

export default Notification;

/* 

notification.title, .message, .status all return undefined...

we've taken out useSelector() from App.jsx, placing it locally here;
instead of passing down props, now directly accessing them in this component;
returns same UI;

<SomeComp>
    <Notification> 
     
</SomeComp>

*/
