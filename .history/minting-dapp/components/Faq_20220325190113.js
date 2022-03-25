import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  // '&:not(:last-child)': {
  backgroundColor: 'transparent',
  // width: '90%',
  borderBottom: '1px solid rgba(0, 0, 0, 0.8)',
  // paddingBottom: "1px",
  // },
  '&:before': {
    display: 'none',
  },
}));

const Icon = styled((props) => (
  <div {...props}>
    <div className="n">
      <RemoveIcon className="h-5 w-5" />
    </div>
    <div className="y">
      <AddIcon className="h-5 w-5" />
    </div>
  </div>
))`
  & > .y {
    display: block;
  }
  & > .n {
    display: none;
  }
  .Mui-expanded & > .n {
    display: block;
  }
  .Mui-expanded & > .y {
    display: none;
  }
`;

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<Icon sx={{ fontSize: '0.9rem', color: '#FF56F6' }} />}
    {...props}
  />
))(({ theme }) => ({
  // paddingLeft: '20px',
  paddingRight: '5px',
  marginRight: theme.spacing(2),
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    // transform: 'rotate(90deg)',
    paddingRight: '5px',
  },

  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(0),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
}));

const Faq = (props) => {
  return (
    <div className=" w-full px-6 mt-28  font-mono" id="faq">
      <h1 className="font-mono text-5xl text-center font-extrabold  mb-8 text-dexfi-pink">
        FAQ
      </h1>
      <div className="w-full max-w-2xl  mx-auto space-y-5">
        <div className="flex flex-col w-full">
          <Accordion className=" shadow-none borderGradient">
            <AccordionSummary
              aria-controls="panel1b-content"
              id="panel1b-header"
              className="flex p-0   justify-between text-lg font-extralight text-left "
            >
              <p className="font-sans2 text-dexfi-light_cyan font-semibold">
                What is Demons Gaze?
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="overflow-hidden duration-300  text-sm  font-mono  text-left font-extralight  ">
                <p className="mb-4 text-gray-200 mx-4">
                  Lorem ipsum dolor amet, consectetur adipiscing elit. Eget nisl
                  nunc quam ac sed turpis volutpat. Cursus sed massa non nisi,
                  placerat.
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion className="p-0 my-1 shadow-none borderGradient ">
            <AccordionSummary
              aria-controls="panel2b-content"
              id="panel2b-header"
              className="flex p-0   justify-between text-lg font-extralight text-left "
            >
              <p className="font-sans2 text-dexfi-light_cyan font-semibold">
                How do I purchase Demons Gaze?
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="overflow-hidden duration-300  text-sm  font-mono  text-left font-extralight  ">
                <p className="mb-4 text-gray-200 mx-4">
                  Lorem ipsum dolor amet, consectetur adipiscing elit. Eget nisl
                  nunc quam ac sed turpis volutpat. Cursus sed massa non nisi,
                  placerat.
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion className="p-0 my-1 shadow-none borderGradient ">
            <AccordionSummary
              aria-controls="panel3b-content"
              id="panel3b-header"
              className="flex p-0   justify-between text-lg font-extralight text-left "
            >
              <p className="font-sans2 text-dexfi-light_cyan font-semibold">
                When do Demons Gaze launch?
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="overflow-hidden duration-300  text-sm  font-mono  text-left font-extralight  ">
                <p className="mb-4 text-gray-200 mx-4">
                  Lorem ipsum dolor amet, consectetur adipiscing elit. Eget nisl
                  nunc quam ac sed turpis volutpat. Cursus sed massa non nisi,
                  placerat.
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion className="p-0 my-1 shadow-none borderGradient ">
            <AccordionSummary
              aria-controls="panel3b-content"
              id="panel3b-header"
              className="flex p-0   justify-between text-lg font-extralight text-left "
            >
              <p className="font-sans2 text-dexfi-light_cyan font-semibold">
                How much will it cost to mint Demons Gaze?
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="overflow-hidden duration-300  text-sm  font-mono  text-left font-extralight  ">
                <p className="mb-4 text-gray-200 mx-4">
                  Lorem ipsum dolor amet, consectetur adipiscing elit. Eget nisl
                  nunc quam ac sed turpis volutpat. Cursus sed massa non nisi,
                  placerat.
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion className="p-0 my-1 shadow-none borderGradient ">
            <AccordionSummary
              aria-controls="panel3b-content"
              id="panel3b-header"
              className="flex p-0   justify-between text-lg font-extralight text-left "
            >
              <p className="font-sans2 text-dexfi-light_cyan font-semibold">
                How many Demons Gaze can I mint?
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="overflow-hidden duration-300  text-sm  font-mono  text-left font-extralight  ">
                <p className="mb-4 text-gray-200 mx-4">
                  Lorem ipsum dolor amet, consectetur adipiscing elit. Eget nisl
                  nunc quam ac sed turpis volutpat. Cursus sed massa non nisi,
                  placerat.
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion className="p-0 my-1 shadow-none borderGradient ">
            <AccordionSummary
              aria-controls="panel3b-content"
              id="panel3b-header"
              className="flex p-0   justify-between text-lg font-extralight text-left "
            >
              <p className="font-sans2 text-dexfi-light_cyan font-semibold">
                Secondary market Royalties?
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="overflow-hidden duration-300  text-sm  font-mono  text-left font-extralight  ">
                <p className="mb-4 text-gray-200 mx-4">
                  Lorem ipsum dolor amet, consectetur adipiscing elit. Eget nisl
                  nunc quam ac sed turpis volutpat. Cursus sed massa non nisi,
                  placerat.
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Faq;
