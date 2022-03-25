import Link from 'next/link';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const ModalMenu = ({ pathname }) => {
  return (
    <div className="inline-flex" id="main_menu">
      <ul className="flex flex-wrap" id="menu_nav">
        <li className="relative   group   mb-0">
          <Link href="/swap">
            <a
              className={`${
                pathname === '/swap' || pathname === '/liquidity'
                  ? 'text-violet-700 font-bold'
                  : 'text-gray-500 font-semibold'
              }  px-3 py-2.5 cursor-pointer rounded-2xl hover:bg-gray-100 flex`}
            >
              Trade
            </a>
          </Link>
          <ul className="absolute left-0 top-0 mt-10 py-1  w-[280px] rounded-2xl border shadow-sm bg-white z-10 hidden group-hover:block">
            <Link href="/swap">
              <a className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                <p
                  className={`${
                    pathname === '/swap'
                      ? 'text-violet-700 font-bold'
                      : 'text-gray-500 font-semibold'
                  } mx-3  `}
                >
                  Exchange
                </p>
              </a>
            </Link>
            <Link href="/liquidity">
              <a className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                <p
                  className={`${
                    pathname === '/liquidity'
                      ? 'text-violet-700 font-bold'
                      : 'text-gray-500 font-semibold'
                  } mx-3  `}
                >
                  Liquidity
                </p>
              </a>
            </Link>
          </ul>
        </li>
        <li className="relative  px-1 py-2.5 group hover:bg-gray-100 cursor-pointer rounded-2xl mb-0">
          <Link href="/farms">
            <a className="mx-3 text-gray-500 font-semibold">Earn</a>
          </Link>
          <ul className="absolute left-0 top-0 mt-10 py-1 w-[280px] rounded-2xl border shadow-sm bg-white z-10 hidden group-hover:block">
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/farms">
                <a className="mx-3 text-gray-500 font-semibold">Farms</a>
              </Link>
            </li>
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/pools">
                <a className="mx-3 text-gray-500 font-semibold">Pools</a>
              </Link>
            </li>
          </ul>
        </li>
        <li className="relative  px-1 py-2.5 group hover:bg-gray-100 cursor-pointer rounded-2xl mb-0">
          <Link href="/farms">
            <a className="mx-3 text-gray-500 font-semibold">Win</a>
          </Link>
          <ul className="absolute left-0 top-0 mt-10 py-1 w-[280px] rounded-2xl border shadow-sm bg-white z-10 hidden group-hover:block">
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/farms">
                <a className="mx-3 text-gray-500 font-semibold">
                  Trading Competition
                </a>
              </Link>
            </li>
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/pools">
                <a className="mx-3 text-gray-500 font-semibold">
                  Prediciton{'('}BETA{')'}
                </a>
              </Link>
            </li>
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/pools">
                <a className="mx-3 text-gray-500 font-semibold">Lottery</a>
              </Link>
            </li>
          </ul>
        </li>
        <li className="relative  px-1 py-2.5 group hover:bg-gray-100 cursor-pointer rounded-2xl mb-0">
          <Link href="/farms">
            <a className="mx-3 text-gray-500 font-semibold">NFT</a>
          </Link>
          <ul className="absolute left-0 top-0 mt-10 py-1  w-[280px] rounded-2xl border shadow-sm bg-white z-10 hidden group-hover:block">
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/farms">
                <a className="mx-3 text-gray-500 font-semibold">Overview</a>
              </Link>
            </li>
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/pools">
                <a className="mx-3 text-gray-500 font-semibold">Collections</a>
              </Link>
            </li>
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/pools">
                <a className="mx-3 text-gray-500 font-semibold">Activity</a>
              </Link>
            </li>
          </ul>
        </li>
        <li className="relative  px-1 py-2.5 group hover:bg-gray-100 cursor-pointer rounded-2xl mb-0">
          <Link href="/liquidity">
            <a className="mx-3 text-gray-500  font-semibold">
              <MoreHorizIcon sx={{ color: '#6B7280', fontSize: 20 }} />
            </a>
          </Link>
          <ul className="absolute left-0 top-0 mt-10 py-1  w-[280px] rounded-2xl border shadow-sm bg-white z-10 hidden group-hover:block">
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/farms">
                <a className="mx-3 text-gray-500 font-semibold">Info</a>
              </Link>
            </li>
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/pools">
                <a className="mx-3 text-gray-500 font-semibold">IFO</a>
              </Link>
            </li>
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 mb-1">
              <Link href="/pools">
                <a className="mx-3 text-gray-500 font-semibold">Voting</a>
              </Link>
            </li>
            <li className="whitespace-no-wrap flex items-center text-gray-600 hover:text-gray-800 border-b border-t">
              <Link href="/pools">
                <a className="pl-5 text-gray-500 h-[48px] my-1 flex hover:bg-gray-100 w-full items-center font-semibold">
                  Leaderboard
                </a>
              </Link>
            </li>
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 mt-1">
              <Link href="/pools">
                <a className="mx-3 text-gray-500 font-semibold">Blog</a>
              </Link>
            </li>
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/pools">
                <a className="mx-3 text-gray-500 font-semibold">Docs</a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ModalMenu;
