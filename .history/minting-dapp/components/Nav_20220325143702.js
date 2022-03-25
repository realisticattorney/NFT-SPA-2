import Link from 'next/link';
import TwitterIcon from '@mui/icons-material/Twitter';

const Nav = () => {
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
        <div className="relative flex space-x-9 mr-2.5">
          {/* <ModalMenu /> */}
          <h1 className="hidden text-gray-300">About</h1>
          <h1 className="hidden text-gray-300">Collection</h1>
          <h1 className="hidden text-gray-300">Roadmap</h1>
          <div className="flex space-x-4">
            <h1 className="font-semibold textGradientReverse">
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
