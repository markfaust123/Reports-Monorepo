const ReportDetails = ({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) => {
  return (
    <div className="report-details">
      <div className="my-4 text-center font-bold">{title}</div>
      <div className="my-4">{description}</div>
      <div className="my-4">
        URL:&nbsp;
        <a className="underline text-blue-600" href={url} target="none">
          {url}
        </a>
      </div>
    </div>
  );
};

export default ReportDetails;
