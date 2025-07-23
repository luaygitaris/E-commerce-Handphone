import { BiArrowToRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <footer className="mt-20 bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-sm text-gray-600">
          <button
            onClick={handleContactClick}
            className="hover:underline text-black font-medium"
          >
            CONTACT
          </button>
          <span>TERMS OF SERVICES</span>
          <span>SHIPPING AND RETURNS</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <p>Give an email, get the newsletter.</p>
          <BiArrowToRight className="text-xl cursor-pointer hover:text-black" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
