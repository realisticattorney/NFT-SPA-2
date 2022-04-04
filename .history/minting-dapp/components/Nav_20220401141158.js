import Link from 'next/link';
import TwitterIcon from '@mui/icons-material/Twitter';
import * as Scroll from 'react-scroll';
import { animateScroll as scroll, scroller } from 'react-scroll';
import Image from 'next/image';

const Nav = () => {
  const scrollTo = (whereto) => {
    scroller.scrollTo(whereto, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto sm:mt-4">
      <div className="flex justify-between items-center ">
        <div className="p-3 flex mr-2.5">
          <Link href="/">
            <a className="flex">
              <p className="font-serif  text-xl font-extrabold ml-2 tracking-tight textGradient">
                Demons Gaze
              </p>
            </a>
          </Link>
        </div>
        <div className="relative hidden md:flex items-center space-x-9 mr-2.5">
          <h1
            className="font-mono text-sm text-gray-300 cursor-pointer"
            onClick={() => scrollTo('faq')}
          >
            About
          </h1>
          <h1
            className="font-mono text-sm text-gray-300 cursor-pointer"
            onClick={() => scrollTo('collection')}
          >
            Collection
          </h1>
          <h1
            className="font-mono text-sm text-gray-300 cursor-pointer"
            onClick={() => scrollTo('roadmap')}
          >
            Roadmap
          </h1>
          <div className="flex space-x-4 items-center">
            <h1
              className="font-mono font-semibold textGradientReverse cursor-pointer mr-2"
              onClick={() => scrollTo('mint')}
            >
              Mint Demons Gaze
            </h1>
            <a
              href="https://github.com/realisticattorney"
              target="_blank"
              rel="noreferrer"
              className="rounded-full shadow mt-2"
            >
              <Image
                src="/images/icons8-discord-new.svg"
                width="22px"
                height="22px"
              />
            </a>
            <a
              href="https://github.com/realisticattorney"
              target="_blank"
              rel="noreferrer"
              className="rounded-full shadow "
            >
              <TwitterIcon
                sx={{
                  color: '#ffff',
                  fontSize: 22,
                  marginTop: '-4px',
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
