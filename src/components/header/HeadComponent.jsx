import Head from "next/head";

const HeadComponent = ({ title }) => {
  let titleTag =
    title ??
    "Nearest Same Day Laundry Services And Cleaners In London | Nearestlaundry";

  return (
    <Head>
      <title>{titleTag}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Worried about Wash, dry cleaning, Ironing, laundry, shoe repair and Wedding dress cleaning service in London or your near? Don’t be concerned! Nearest Laundry Offers mobile laundry service and same-day laundry service in the United Kingdom. We provide free door-to-door pickup and delivery service."
      />
      <meta
        name="keywords"
        content="Laundry Cleaners Near Me, Nearest Dry Cleaners,Dry Cleaners Alterations Near Me,Same Day Laundry Service London,Laundry And Ironing Service Near Me,Mobile Laundry Service London,Dry Cleaning Shop London,Same Day Cleaners Near Me,Same Day Laundry Service Near Me,Tailoring Service Near Me"
      />
      <meta name="author" content="Nearest Laundry" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadComponent;
