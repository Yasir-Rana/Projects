import Card from "./Card";
import classes from './CSS/DisplayUser.module.css';


const DisplayUser = (props) => {
    return (
        <Card className={classes.users}>
          <ul>
            {props.users.map((user) => {
             return( 
                <li key={user.id}>
                {user.name} ({user.age} years old)
              </li>
             )
            })}
          </ul>
        </Card>
      );
    };

export default DisplayUser;