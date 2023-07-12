import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { Avatar, Badge, Dropdown, Modal, Select, Table } from 'antd';
import JsonView from 'react18-json-view'
import config from './config'
import axios from 'axios';

import 'react18-json-view/src/style.css'
import 'antd/dist/reset.css';
import './App.css';
import dayjs from 'dayjs';

function App() {
  const [env, setEnv] = useState({})
  const cookies = new Cookies();
  const arr = [
    { label: 'เฮงเฮงก่อสร้าง', value: 'M001' },
    { label: 'พานิชการช่าง', value: 'M002' },
    { label: 'ฮงฮงก่อสร้าง', value: 'M003' },
    { label: 'เอกชัย', value: 'M004' },
    { label: 'หวังรวย พัสดุ', value: 'G001' },
    { label: 'ศราธร', value: 'G002' },
    { label: 'กันกันรับเหมา', value: 'G003' },
    { label: 'มั่งมี ขายเหล็ก', value: 'G004' }
  ]

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonObject, setJsonObject] = useState({});
  const [data, setData] = useState(null)
  const [dataTable, setDataTable] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState("")

  useEffect(() => {
    // console.log('config :>> ', config);
    setEnv(config)

    getDataTable({ page, limit, status })
    // console.log('allkons_id :>> ', allkons_id);
  }, [])

  const getDataTable = ({ _page = page, _limit = limit, _status = status }) => {
    axios({
      method: "get",
      url: `https://sku-uat.allkons.com/api-mapping/api/log?limit=${_limit}&page=${_page}&status=${_status}`,
      headers: {
        "x-key-allkons": config.REACT_APP_X_KEY_ALLKONS,
        "Content-Type": "application/json",
      },
      auth: {
        username: config.REACT_APP_AUTH_USER,
        password: config.REACT_APP_AUTH_PASS
      },
    }).then(response => {
      console.log(response.data);
      setTotal(response.data.itemCount)
      setDataTable(response.data.results)
    }).catch(error => {
      console.error(error);
    });
  }

  const onChange = (value) => {
    console.log('hello :>> TTT', value);
    const find = arr.find(where => where.value === value)
    if (find) setData(find.label)
  }


  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      align: "center",
      render: (text) => dayjs(text).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: 'Descriotion',
      dataIndex: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: "center",
      render: (text) => text ? <Badge status="success" /> : <Badge status="error" />,
    },
    {
      title: 'Data',
      dataIndex: 'data',
      align: "center",
      render: (text) => <a onClick={() => {
        console.log('text :>> ', text);
        setJsonObject(text)
        setIsModalOpen(true);
      }}>View</a>,
    },
  ]

  return (
    <>
      <div className='main'>
        <div className="nav">
          <div className="pr-10">

            <Select
              style={{ width: 150 }}
              onChange={onChange}
              options={[
                {
                  label: 'องค์กรที่สร้างโดยคุณ',
                  options: [
                    { label: 'เฮงเฮงก่อสร้าง', value: 'M001' },
                    { label: 'พานิชการช่าง', value: 'M002' },
                    { label: 'ฮงฮงก่อสร้าง', value: 'M003' },
                    { label: 'เอกชัย', value: 'M004' },
                  ],
                },
                {
                  label: 'องค์กรที่คุณเข้าร่วม',
                  options: [
                    { label: 'หวังรวย พัสดุ', value: 'G001' },
                    { label: 'ศราธร', value: 'G002' },
                    { label: 'กันกันรับเหมา', value: 'G003' },
                    { label: 'มั่งมี ขายเหล็ก', value: 'G004' }
                  ],
                },
              ]}
            />

            <span className="pr-10" />
            <span className="pr-10">นายแอดมิน เป็นคนดี</span>
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    label: (
                      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        บัญชีของฉัน
                      </a>
                    ),
                  },
                  {
                    key: '2',
                    label: (
                      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        ออกจากระบบ
                      </a>
                    ),
                  },
                ],
              }}
              placement="bottomLeft"
              arrow
            >
              <Avatar size="small" />
            </Dropdown>

          </div>
        </div>
        <div className='nav-line' />
      </div>
      {data ?
        <div style={{ textAlign: "center", paddingTop: "2rem" }}>
          ยินดีต้อนรับ: {data}
        </div>
        : null}

      <div style={{ textAlign: "center", paddingTop: "2rem" }}>
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={dataTable}
          pagination={{
            current: page,
            total: total,
            pageSize: limit,
            onChange: async (e, _limit) => {
              setLimit(_limit)
              setPage(e)
              await getDataTable({
                page: e,
                limit: _limit,
                status
              });
            }
          }}
        />

        <Modal
          width={800}
          bodyStyle={{
            maxHeight: 700,
            overflowX: "auto"
          }}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)} footer={[]}>
          <JsonView src={jsonObject} />
        </Modal>
      </div>

      <footer style={{ textAlign: "center" }}>Version React {env.version}</footer>
    </>
  );
}

export default App;
