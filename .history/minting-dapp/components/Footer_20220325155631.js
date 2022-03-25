import Image from 'next/image';
import Link from 'next/link';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import RedditIcon from '@mui/icons-material/Reddit';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <footer className=" text-white  font-medium  p-0 sm:p-5 max-w-[1200px] mx-auto mt-40">
      <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 py-16 border-t border-b border-gray-700">
        <div className="sm:row-start-2 flex-col sm:max-w-[600px] self-center">
          <div className="sm:w-[250px] mx-auto space-y-5">
            <h1 className="textGradient text-2xl font-bold w-min truncate">
              Demons Gaze
            </h1>
            <p className="text-gray-200 text-sm font-light">
              Lorem ipsum dolor amet, consectetur adipiscing elit. Eget nisl
              nunc quam ac sed turpis volutpat. Cursus sed massa non nisi,
              placerat.
            </p>

            <div className="flex space-x-6 items-center">
              <a
                href="https://www.germanaquila.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full shadow"
              >
                <TwitterIcon
                  sx={{
                    color: '#B8ADD2',
                    fontSize: 24,
                  }}
                />
              </a>
              <a
                href="https://www.germanaquila.com"
                target="_blank"
                rel="noreferrer"
                className="px-0.5 rounded-full bg-dexfi-other_gray shadow"
              >
                <TelegramIcon
                  sx={{
                    color: '#27262C',
                    fontSize: 20,
                    paddingBottom: '0.2rem',
                    paddingRight: '0.1rem',
                  }}
                />
              </a>
              <a
                href="https://www.germanaquila.com"
                target="_blank"
                rel="noreferrer"
                className="px-0.5 rounded-full bg-dexfi-other_gray shadow"
              >
                <RedditIcon
                  sx={{
                    color: '#27262C',
                    fontSize: 20,
                    paddingBottom: '0.2rem',
                  }}
                />
              </a>
              <a
                href="https://www.germanaquila.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full shadow"
              >
                <InstagramIcon
                  sx={{
                    color: '#B8ADD2',
                    fontSize: 24,
                  }}
                />
              </a>
              <a
                href="https://www.germanaquila.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full shadow"
              >
                <GitHubIcon
                  sx={{
                    color: '#B8ADD2',
                    fontSize: 24,
                  }}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="row-start-1 sm:col-start-2 sm:row-start-2 flex-col sm:min-w-[600px] self-center">
          <div className="sm:w-[300px] mx-auto space-y-5">
            <h1 className="text-3xl">Suscribe to us</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="flex justify-between py-6 text-sm text-gray-200 font-light">
        <h1>© 2022. All rights reserved</h1>
        <div className="items-center flex">
          <Link href="/swap">
            <a>
              Terms & Conditions <span className="mx-2">|</span>
            </a>
          </Link>
          <Link href="/swap">
            <a className="ml-1">
              Privacy Policy <span className="mx-2">|</span>
            </a>
          </Link>
          <Link href="/swap">
            <a className="ml-1">Sitemap</a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
