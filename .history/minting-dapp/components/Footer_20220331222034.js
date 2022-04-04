import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useToast } from '../hooks/useToast';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import RedditIcon from '@mui/icons-material/Reddit';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();
  async function onSubmitForm(values) {
    console.log(values);
    let config = {
      method: 'post',
      url: `/api/contact`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: values,
    };

    try {
      const response = await axios(config);
      console.log(response);
      if (response.status == 200) {
        reset();
        toast(
          'success',
          'Thank you for contacting us, we will be in touch soon.'
        );
      }
    } catch (err) {}
  }

  return (
    <footer className=" text-white  font-medium  p-0 sm:p-5 max-w-[1200px] mx-auto mt-24">
      <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 py-16 border-t border-b border-gray-700">
        <div className="sm:row-start-2 flex-col sm:max-w-[600px] self-center mt-6 sm:mt-0 px-6 sm:px-0">
          <div className="sm:w-[250px] mx-auto space-y-5">
            <h1 className="font-serif textGradient text-2xl font-bold w-min truncate">
              Demons Gaze
            </h1>
            <p className="font-inter text-gray-200 text-xs1 font-extralight">
              Lorem ipsum dolor amet, consectetur adipiscing elit. Eget nisl
              nunc quam ac sed turpis volutpat. Cursus sed massa non nisi,
              placerat.
            </p>

            <div className="font- flex space-x-6 items-center">
              <a
                href="https://github.com/realisticattorney"
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
                href="https://github.com/realisticattorney"
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
                href="https://github.com/realisticattorney"
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
                href="https://github.com/realisticattorney"
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
                href="https://github.com/realisticattorney"
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
        <div className="row-start-1 sm:col-start-2 sm:row-start-2 flex-col w-min lg:min-w-[600px] self-center">
          <div className="w-min md:w-[300px] mx-auto space-y-5 pl-6 mb-5">
            <h1 className="text-2xl font-mono  sm:px-0">Suscribe to us</h1>
            <form onSubmit={handleSubmit(onSubmitForm)} className="flex">
              <div className="">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  name="email"
                  type="text"
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Please enter a valid address',
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Address needs to be valid',
                    },
                  })}
                  className={`inline-block w-min max-w-[200px] border font-inter rounded-tl-md rounded-bl-md shadow-sm  text-sm text-gray-800 font-light mb-1 py-1.5 px-1.5 placeholder-gray-700  border-gray-600 focus:outline-none focus:ring-1 resize-none ${
                    errors.email ? 'ring-0 focus:outline-none ' : null
                  }`}
                  placeholder="e-mail*"
                />
                <span className="text-gray-200 font-inter text-xs1 py-2">
                  {errors?.email?.message}
                </span>
              </div>
              <div className="justify-self-end">
                <button
                  type="submit"
                  className=" border-2 text-sm  font-inter pb-1.4 ml-1 pt-1.2 px-7 text-white hover:opacity-75 transition-opacity duration-300 active:translate-y-0.1 active:shadow-none active:opacity-90 bg-gradient-to-r from-dexfi-cyan to-dexfi-pink lalalala4 borderGradientReverse focus:outline-none focus:ring-1 focus:ring-offset-2 active:outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="font-inter flex justify-between py-6 px-2 text-xs sm:text-sm text-gray-200 font-extralight">
        <h1>© 2022. All rights reserved</h1>
        <div className="items-center flex">
          <a
            href="https://github.com/realisticattorney"
            target="_blank"
            rel="noreferrer"
          >
            Terms & Conditions <span className="sm:mx-2">|</span>
          </a>
          <a
            href="https://github.com/realisticattorney"
            target="_blank"
            rel="noreferrer"
            className="ml-1"
          >
            Privacy Policy <span className="sm:mx-2">|</span>
          </a>
          <a
            href="https://github.com/realisticattorney"
            target="_blank"
            rel="noreferrer"
            className="ml-1"
          >
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
