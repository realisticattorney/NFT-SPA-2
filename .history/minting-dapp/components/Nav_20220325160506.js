import Link from 'next/link';
import TwitterIcon from '@mui/icons-material/Twitter';
import * as Scroll from 'react-scroll';
import {
  // Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from 'react-scroll';

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
              <p className="text-xl font-bold ml-2 tracking-tight textGradient">
                Demons Gaze
              </p>
            </a>
          </Link>
        </div>
        <div className="relative hidden sm:flex  space-x-9 mr-2.5">
          <h1 className="text-gray-300 cur" onClick={() => scrollTo('faq')}>
            About
          </h1>
          <h1
            className="text-gray-300"
            onClick={() => scrollTo('scroll-to-projects')}
          >
            Collection
          </h1>
          <h1
            className="text-gray-300"
            onClick={() => scrollTo('scroll-to-projects')}
          >
            Roadmap
          </h1>
          <div className="flex space-x-4">
            <h1
              className="font-semibold textGradientReverse"
              onClick={() => scrollTo('scroll-to-projects')}
            >
              Mint Demons Gaze
            </h1>
            <div className="rounded-full shadow">
              <TwitterIcon
                sx={{
                  color: '#ffff',
                  fontSize: 22,
                }}
              />
            </div>
            <div className="rounded-full shadow">
              <TwitterIcon
                sx={{
                  color: '#ffff',
                  fontSize: 22,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;