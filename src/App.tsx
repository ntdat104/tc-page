import { Select } from 'antd';
import React from 'react';
import MultilineChartModule from './modules/MultilineChartModule';
import moment from 'moment';
import axios from 'axios';

const App: React.FC = () => {
  const [options, setOptions] = React.useState<any>();
  const [data, setData] = React.useState<any>();
  const [id, setId] = React.useState<number>(23);
  const [fromDate, setFromDate] = React.useState<any>(null);

  React.useEffect(() => {
    axios
      .request({
        url: `https://api.fmarket.vn/res/products/filter`,
        method: 'post',
        data: {
          types: ['NEW_FUND', 'TRADING_FUND'],
          issuerIds: [],
          sortOrder: 'DESC',
          sortField: 'navTo12Months',
          page: 1,
          pageSize: 100,
          fundAssetTypes: [],
          bondRemainPeriods: [],
          searchField: '',
        },
      })
      .then((response) => setOptions(response?.data?.data?.rows))
      .catch((error) => console.log(error))
      .finally(() => {});
  }, []);

  React.useEffect(() => {
    axios
      .request({
        url: `https://api.fmarket.vn/res/product/get-nav-history`,
        method: 'post',
        data: {
          isAllData: fromDate ? 0 : 1,
          productId: id,
          fromDate: fromDate,
          toDate: moment().format('YYYYMMDD'),
        },
      })
      .then((response) => {
        setData(
          response?.data?.data?.map((item: any) => ({
            id: item?.id,
            createAt: item?.createAt,
            productId: item?.productId,
            date: item?.navDate,
            marketvalue: item?.nav,
            value: item?.nav,
          }))
        );
      })
      .catch((error) => console.log(error))
      .finally(() => {});
  }, [id, fromDate]);

  const handleChange = (value: any) => {
    setId(value);
  };

  console.log(options?.filter((item: any) => item?.id === id)[0]?.code);

  return (
    <>
      {data && (
        <MultilineChartModule
          data={data}
          code={options?.filter((item: any) => item?.id === id)[0]?.code}
        />
      )}
      {options && (
        <Select
          defaultValue={options[0]?.id}
          style={{ width: 120, marginTop: 20 }}
          onChange={handleChange}
        >
          {options?.map((item: any, index: number) => (
            <Select.Option key={index} value={item?.id}>
              {item?.code}
            </Select.Option>
          ))}
        </Select>
      )}
      <Select
        defaultValue={null}
        style={{ width: 120, marginTop: 20 }}
        onChange={(value: any) =>
          value
            ? setFromDate(moment().subtract(value, 'months').format('YYYYMMDD'))
            : setFromDate(null)
        }
      >
        <Select.Option value={null}>{`Tất cả`}</Select.Option>
        <Select.Option value={3}>{`3 Tháng`}</Select.Option>
        <Select.Option value={6}>{`6 Tháng`}</Select.Option>
        <Select.Option value={12}>{`12 Tháng`}</Select.Option>
        <Select.Option value={36}>{`36 Tháng`}</Select.Option>
      </Select>
    </>
  );
};

export default App;
