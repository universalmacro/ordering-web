import "./index.css";

interface IProps {
  name: string;
  table: string;
}

const PageHeader: React.FC<IProps> = ({ name, table }) => {
  return (
    <div className="page-header">
      {/* <div className="page-header__left" onClick={() => navigate(-1)}>
        <img className="page-header__left-back" src={goBack} alt="返回" />
      </div> */}
      <div className="page-header__center">
        {name} {table}
      </div>
    </div>
  );
};

export default PageHeader;
