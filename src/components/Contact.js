



import React, { useRef, useState } from 'react';
import styled, { keyframes, ThemeProvider } from 'styled-components';
import emailjs from 'emailjs-com';
import { DarkTheme } from './Themes';

import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/SocialIcons';
import PowerButton from '../subComponents/PowerButton';
import ParticleComponent from '../subComponents/ParticleComponent';
import BigTitle from '../subComponents/BigTitlte';
import astronaut from '../assets/Images/png1.png';

const Box = styled.div`
  background-color: ${(props) => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const float = keyframes`
  0% { transform: translateY(-10px) }
  50% { transform: translateY(15px) translateX(15px) }
  100% { transform: translateY(-10px) }
`;

const Spaceman = styled.div`
  position: absolute;
  top: 10%;
  right: 5%;
  width: 20vw;
  animation: ${float} 4s ease infinite;
  img {
    width: 100%;
    height: auto;
  }
`;

const Main = styled.div`
  border: 2px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  padding: 2rem;
  width: 50vw;
  height: 60vh;
  z-index: 3;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: calc(0.6rem + 1vw);
  backdrop-filter: blur(4px);
  
  position: absolute;
  left: calc(5rem + 5vw);
  top: 10rem;
  font-family: 'Ubuntu Mono', monospace;
  font-style: italic;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    input, textarea {
      margin-bottom: 1rem;
      padding: 0.5rem;
      font-size: calc(0.5rem + 0.5vw);
      font-family: 'Ubuntu Mono', monospace;
      border: 1px solid ${(props) => props.theme.text};
      background-color: ${(props) => props.theme.body};
      color: ${(props) => props.theme.text};
      border-radius: 5px;
      outline: none;
    }

    input[type="submit"] {
      cursor: pointer;
      background-color: ${(props) => props.theme.text};
      color: ${(props) => props.theme.body};
      font-weight: bold;
    }
  }
`;

const SuccessMessage = styled.div`
  width: 330px;
  height: 80px;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 10px 15px;
  background-color: #ffffff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 15px;

  .wave {
    position: absolute;
    transform: rotate(90deg);
    left: -31px;
    top: 32px;
    width: 80px;
    fill: #04e4003a;
  }

  .icon-container {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #04e40048;
    border-radius: 50%;
    margin-left: 8px;
  }

  .icon {
    width: 17px;
    height: 17px;
    color: #269b24;
  }

  .message-text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex-grow: 1;
  }

  .message-text,
  .sub-text {
    margin: 0;
    cursor: default;
  }

  .message-text {
    color: #269b24;
    font-size: 17px;
    font-weight: 700;
  }

  .sub-text {
    font-size: 14px;
    color: #555;
  }

  .cross-icon {
    width: 18px;
    height: 18px;
    color: #555;
    cursor: pointer;
  }
`;

const FailureMessage = styled(SuccessMessage)`
  .wave {
    fill: #ff00003a;
  }

  .icon-container {
    background-color: #ff000048;
  }

  .icon {
    color: #ff0000;
  }

  .message-text {
    color: #ff0000;
  }
`;

const Contact = () => {
  const form = useRef();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_my4zwmm', // Replace with your Email.js service ID
      'template_6nx2i4l', // Replace with your Email.js template ID
      form.current,
      'meC-z8GcjdOskYUvh' // Replace with your Email.js user ID
    ).then((result) => {
        console.log(result.text);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      }, (error) => {
        console.log(error.text);
        setShowFailureMessage(true); // Show failure message
        setTimeout(() => {
          setShowFailureMessage(false); // Hide after 5 seconds
        }, 5000);
      });
      
    e.target.reset();
  };

  return (
    <ThemeProvider theme={DarkTheme}>
      <Box>
        <LogoComponent theme='dark' />
        <SocialIcons theme='dark' />
        <PowerButton />
        <ParticleComponent theme='dark' />

        <Spaceman>
          <img src={astronaut} alt="spaceman" />
        </Spaceman>

        <Main>
          <form ref={form} onSubmit={sendEmail}>
            <input type="text" name="from_name" placeholder="Your Name" required />
            <input type="email" name="from_email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows="5" required />
            <input type="submit" value="Send" />
          </form>
        </Main>

        <BigTitle text="CONTACT" top="10%" left="5%" />

        {showSuccessMessage && (
          <SuccessMessage>
            <svg className="wave" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0,256L11.4,240C22.9,224,46,192,69,192C91.4,192,114,224,137,234.7C160,245,183,235,206,213.3C228.6,192,251,160,274,149.3C297.1,139,320,149,343,181.3C365.7,213,389,267,411,282.7C434.3,299,457,277,480,250.7C502.9,224,526,192,549,181.3C571.4,171,594,181,617,208C640,235,663,277,686,256C708.6,235,731,149,754,122.7C777.1,96,800,128,823,165.3C845.7,203,869,245,891,224C914.3,203,937,117,960,112C982.9,107,1006,181,1029,197.3C1051.4,213,1074,171,1097,144C1120,117,1143,107,1166,133.3C1188.6,160,1211,224,1234,218.7C1257.1,213,1280,139,1303,133.3C1325.7,128,1349,192,1371,192C1394.3,192,1417,128,1429,96L1440,64L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C183,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
                fill="#04e400"
                fillOpacity="1"
              />
            </svg>

            <div className="icon-container">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M9 16.2l-3.5-3.5L4 14l5 5 10-10-1.4-1.4z" />
              </svg>
            </div>

            <div className="message-text-container">
              <p className="message-text">Success</p>
              <p className="sub-text">Your message has been sent!</p>
            </div>

            <svg className="cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19.5 5.5l-1-1-5.5 5.5-5.5-5.5-1 1 5.5 5.5-5.5 5.5 1 1 5.5-5.5 5.5 5.5 1-1-5.5-5.5z" />
            </svg>
          </SuccessMessage>
        )}

        {showFailureMessage && (
          <FailureMessage>
            <svg className="wave" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0,256L11.4,240C22.9,224,46,192,69,192C91.4,192,114,224,137,234.7C160,245,183,235,206,213.3C228.6,192,251,160,274,149.3C297.1,139,320,149,343,181.3C365.7,213,389,267,411,282.7C434.3,299,457,277,480,250.7C502.9,224,526,192,549,181.3C571.4,171,594,181,617,208C640,235,663,277,686,256C708.6,235,731,149,754,122.7C777.1,96,800,128,823,165.3C845.7,203,869,245,891,224C914.3,203,937,117,960,112C982.9,107,1006,181,1029,197.3C1051.4,213,1074,171,1097,144C1120,117,1143,107,1166,133.3C1188.6,160,1211,224,1234,218.7C1257.1,213,1280,139,1303,133.3C1325.7,128,1349,192,1371,192C1394.3,192,1417,128,1429,96L1440,64L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C183,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
                fill="#ff0000"
                fillOpacity="1"
              />
            </svg>

            <div className="icon-container">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-13h-2v6h2zm0 8h-2v2h2z" />
              </svg>
            </div>

            <div className="message-text-container">
              <p className="message-text">Failure</p>
              <p className="sub-text">There was an error sending your message!</p>
            </div>

            <svg className="cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19.5 5.5l-1-1-5.5 5.5-5.5-5.5-1 1 5.5 5.5-5.5 5.5 1 1 5.5-5.5 5.5 5.5 1-1-5.5-5.5z" />
            </svg>
          </FailureMessage>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Contact;
