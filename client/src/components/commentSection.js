import styled from "styled-components";
import { useContext, useState } from "react";

const InputTweet = () => {
  const [comment, setComment] = useState(null);
  const [toggle, setToggle] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetch("/createComment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comments: comment
      spot: spotId
      user: user_id
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setComment("");
        setToggle((comment) => !comment);
      })
      .catch(
        (error) => {
          window.alert(error);
        },
        [toggle]
      );

    let handleChange = (ev) => {
      setComment(ev.target.value);
    };

    if (!currentUser) {
      return;
    }
    return (
      <Container>
        <Header>Home</Header>
        <Input>
          <div>
            <textarea
              onSubmit={onSubmitHandler}
              placeholder="Leave a comment..."
              type="text"
              id="comment"
              onChange={handleChange}
              value={comment}
            />
          </div>
          <div >
            <Button
              onClick={onSubmitHandler}>
              Submit
            </Button>
          </div>
        </Input>
      </Container>
    );
  };

  const Container = styled.div``;

  const Header = styled.div`
    border-left: #ededf3 solid 2px;
    border-right: #ededf3 solid 2px;
    border-bottom: #ededf3 solid 2px;
    padding: 40px 0px 40px 30px;
    font-weight: bold;
    font-size: 40px;
  `;

  const BlackCounter = styled.div`
    color: black;
  `;

  const YellowCounter = styled.div`
    color: yellowgreen;
  `;

  const RedCounter = styled.div`
    color: red;
  `;

  const Input = styled.div`
    border-left: #ededf3 solid 2px;
    border-right: #ededf3 solid 2px;
    border-bottom: #ededf3 solid 10px;
    height: 300px;

    .meowButton {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    img {
      border-radius: 50%;
      width: 70px;
      padding: 20px;
    }

    .avatar {
      display: flex;
      flex-direction: row;
      margin-bottom: 90px;
    }

    textarea {
      width: 800px;
      height: px;
      margin-top: 40px;
      margin-left: 5px;
      outline: none;
      font-size: 150%;
      border: none;
      overflow-wrap: break-word;
    }
  `;
  const Button = styled.button`
    background-color: hsl(258deg, 100%, 50%);
    color: white;
    border: none;
    padding: 15px 25px;
    font-size: 25px;
    border-radius: 50px;
    margin: 20px;
    cursor: pointer;
  `;
};
export default InputTweet;
