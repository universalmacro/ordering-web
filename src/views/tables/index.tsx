import "./index.css";
import logoPngUrl from "../../assets/png/logo.png";
import { useEffect, useState } from "react";
import { restaurantApi } from "../../api/api";
import { Table } from "@dparty/restaurant-ts-sdk";
import SelectTableNum from "./SelectTableNum";
import QRCode from "react-qr-code";
interface ISelectTableModalProps {
  restaurantId: string;
  tableList: Table[] | null;
  title?: string;
}

const orderWebDomain = "https://ordering-uat.sum-foods.com";

const SelectTableModal: React.FC<ISelectTableModalProps> = ({ restaurantId, tableList, title }) => {
  const [selectedOption, setSelectedOption] = useState<Table | null>(null);
  const [showQrcode, setShowQrcode] = useState(false);
  const onSelectOption = (option: Table) => {
    setSelectedOption(option);
  };
  return (
    <div className="select-tables">
      <div className="select-tables__mask"></div>
      <div className="select-tables__content">
        <div className="select-tables__content-header">
          <div className="select-tables__content-header-title">{title}</div>
        </div>
        <div className="select-tables__content-body">
          <div className="select-tables-container">
            <SelectTableNum
              options={tableList}
              onSelectOption={onSelectOption}
              selectedOption={selectedOption}
            />
            <div className="select-tables-container-bottom">
              <button
                className={"select-tables-submit-btn select-tables-submit-btn-usable"}
                onClick={() => {
                  window.location.href = `/ordering/?restaurantId=${restaurantId}&tableId=${selectedOption?.id}`;
                }}
              >
                開始點餐
              </button>
              <button
                style={{ marginLeft: 10 }}
                className={"select-tables-submit-btn select-tables-submit-btn-usable"}
                onClick={() => {
                  setShowQrcode(true);
                }}
              >
                展示Qrcode
              </button>
            </div>
          </div>
        </div>
      </div>
      {showQrcode && (
        <div onClick={() => setShowQrcode(false)} className="modal">
          <div className="modal-content">
            {selectedOption && (
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={`${orderWebDomain}/ordering/?restaurantId=${restaurantId}&tableId=${selectedOption.id}`}
                viewBox={`0 0 256 256`}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const TablesPage = () => {
  const [tableList, setTableList] = useState<Table[] | null>([]);

  // 從 url 中獲取餐廳 id
  const search = window.location.search;
  const query = new URLSearchParams(search);
  const restaurantId = query.get("restaurantId") || "";

  const getTableList = async (restaurantId: string) => {
    try {
      const res = await restaurantApi.getRestaurant({ id: restaurantId });
      if (res) {
        setTableList(res.tables);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 請求可選的桌列表
    getTableList(restaurantId);
  }, [restaurantId]);

  return (
    <div className="tables">
      <SelectTableModal
        restaurantId={restaurantId}
        tableList={tableList}
        // title={"桌號獲取失敗，請手動選擇桌號"}
      />
      <img className="tables__logo" src={logoPngUrl} alt="logo" />
    </div>
  );
};

export default TablesPage;
