import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { Muted } from "../Typography";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray pt-6 mt-10">
      <div className="flex flex-col md:flex-row justify-between w-full space-y-6 md:space-y-0">
        <div className="flex flex-col items-center md:w-[50%] md:items-start space-y-2">
          <Logo />
          <Muted>Designed & Developed by Subhan Yousaf.</Muted>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-center md:text-end">
            Disclaimer
          </h4>
          <p className="text-sm text-muted-foreground text-center md:text-end text-balance">
            Movie Mania does not host any files, it merely links to 3rd party
            services. Legal issues should be taken up with those who host those
            files. We are not responsible for any media files shown on our site.
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-12 md:justify-between">
        <Link
          to="https://github.com/subhanyousaf"
          className="flex flex-row items-center space-x-2 text-muted-foreground hover:text-secondary-foreground ease-in-out duration-150"
        >
          <GitHubLogoIcon className="h-4 w-4" />
          <p>GitHub</p>
        </Link>
        <Link
          to="/dmca"
          className="text-end my-4 font-semibold text-muted-foreground hover:text-secondary-foreground ease-in-out duration-150"
        >
          DMCA
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
