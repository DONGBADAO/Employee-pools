import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.scss";
import { QUESTIONS_PAGE } from "../constant";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const btnContactClick = () => {
    window.location.href = "mailto:dongleba.96@gmail.com";
  };

  return (
    <div className="not-found-container">
      <Result
        status="404"
        title="Oops!"
        subTitle="It seems you've lost your way. Don't worry, we will help you find your way home."
        extra={[
          <Button
            type="primary"
            key="home"
            onClick={() => navigate(QUESTIONS_PAGE)}
          >
            Go back to the home page
          </Button>,
          <Button key="contact" onClick={btnContactClick}>
            Contact us
          </Button>,
        ]}
      />
    </div>
  );
};
export default NotFoundPage;
