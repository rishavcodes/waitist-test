import { useState, useRef } from "react"
import Logo from "./assets/images/logo1.png"
import emailjs from '@emailjs/browser';

function App() {


  const [studentCheckbox, setStuentCheckbox] = useState(false)
  const [teacherCheckbox, setTeacherCheckbox] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleCheckboxChange = (checkboxNumber) => {
    if (checkboxNumber === 1) {
      setStuentCheckbox((prevChecked) => !prevChecked);
      setTeacherCheckbox(false);
    } else if (checkboxNumber === 2) {
      setStuentCheckbox(false);
      setTeacherCheckbox((prevChecked) => !prevChecked);
    }
  };


  const handlePhoneNumberChange = (event) => {
    const inputValue = event.target.value;

    // Add "+91" prefix if not already present
    let formattedValue = inputValue;
    if (!inputValue.startsWith('+91')) {
      formattedValue = '+91 ' + inputValue;
    }

    // Validate phone number format
    const phoneRegex = /^\+91 \d{10}$/; // Example: +91 1234567890
    const isValidPhoneNumber = phoneRegex.test(formattedValue);

    setPhoneError(!isValidPhoneNumber);
    setPhoneNumber(formattedValue);
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    if (!form.current.name.value || !form.current.email.value || !form.current.phone.value) {
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 5000);

      return;
    }

    if (emailError) {
      return;
    }

    // If no errors, proceed with sending email
    emailjs.sendForm('service_bdpjx4j', 'template_77clkue', form.current, 'K-tNqp4-g3ZzN6gcM')
      .then((result) => {
        console.log(result.text);
        setIsError(false); // Reset the error state
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, (error) => {
        console.log(error.text);
      });
  };


  return (
    <>
      <section className="h-screen">
        <div className="flex justify-center items-center bg-white bg-opacity-45 mt-10 sm:mt-16">
          <img className="h-16 sm:h-24" src={Logo} alt="Logo" />
        </div>
        <div className="flex justify-center items-center mt-10 text-3xl sm:top-28 sm:text-4xl font-bold text-center">
          <h1>One Platform to solve all your <br /> Institute Queries</h1>
        </div>
        <div className="flex justify-center items-center text-center mt-10">
          <div className="bg-white bg-opacity-45 p-6 rounded-3xl shadow-md w-96 sm:w-auto">
            <h1 className="font-bold text-2xl sm:text-3xl my-2">
              Join the waitlist
            </h1>
            <p className="my-3 text-sm sm:text-lg">
              Fill the form and be the first one to get notified <br /> when our platform is live
            </p>
            <div className="h-full my-4">
              <form ref={form} onSubmit={sendEmail}>
                <div className="mx-10 my-5">
                  <input type="text" name="name" placeholder="Name" className="border-2 border-[#94b9ff] w-full rounded-xl p-2 outline-none" />
                </div>
                <div className="mx-10 my-5">
                  <input type="text" name="email" onChange={handleEmailChange} placeholder="Email" className={`border-2 ${emailError ? 'border-red-500' : 'border-[#94b9ff]'} w-full rounded-xl p-2 outline-none`} />
                  {emailError && <p className="text-red-500 text-sm text-left p-1">Please enter a valid email.</p>}
                </div>
                <div className="mx-10 my-5">
                  <input type="tel" name="phone" placeholder="Phone No" value={phoneNumber}
                    onChange={handlePhoneNumberChange} className={`border-2 ${phoneError ? 'border-red-500' : 'border-[#94b9ff]'} w-full rounded-xl p-2 outline-none`} />
                  {phoneError && <p className="text-red-500 text-sm text-left p-1">Please enter a valid phone number.</p>}
                </div>
                <div className="flex justify-center items-center gap-5">
                  <div className="flex justify-center items-center gap-4">
                    <input type="checkbox" name="student" checked={studentCheckbox} onChange={() => handleCheckboxChange(1)} />
                    <label htmlFor="Student">Student</label>
                  </div>
                  <div className="flex justify-center items-center gap-4">
                    <input type="checkbox" name="teacher" checked={teacherCheckbox} onChange={() => handleCheckboxChange(2)} />
                    <label htmlFor="Teacher">Teacher</label>
                  </div>
                </div>
                <div className="flex justify-center items-center my-4">
                  <button type="submit" value="Send" className="w-xl bg-blue-800 border-2 border-white py-3 px-6 sm:px-8 text-white text-lg rounded-2xl">
                    Notify Me
                  </button>
                </div>
                {isError && (
                  <div className="flex justify-center items-center gap-2 bg-red-500 rounded-lg py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                    <p className="text-white font-bold">
                      Please fill in all required fields.
                    </p>
                  </div>
                )}
                {/* Notification */}
                {isSubmitted && (
                  <div className="flex justify-center items-center gap-2 bg-green-500 rounded-lg p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                    <p className="text-white font-bold">Your response has been recorded!</p>
                    {/* You can style this notification further as needed */}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="mt-10">
            <h2 className="mb-2">
              Follow our Socials
            </h2>
            <div className="flex justify-center items-center gap-4">
              <div>
                <a href="https://www.instagram.com/tutemap" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-instagram text-4xl text-pink-600"></i>
                </a>
              </div>
              <div>
                <a href="https://www.linkedin.com/company/tutemap" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin text-4xl text-blue-500"></i>
                </a>
              </div>
              <div>
                <a href="https://twitter.com/tutemap" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-square-x-twitter text-4xl text-black"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
