import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { Avatar, Dropdown, Select } from 'antd';
import 'antd/dist/reset.css';
import './App.css';

function App() {
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

  const [data, setData] = useState(null)

  useEffect(() => {
    const allkons_id = cookies.get("allkons_id");
    console.log('allkons_id :>> ', allkons_id);
  }, [])

  const onChange = (value) => {
    console.log('hello :>> TTT', value);
    const find = arr.find(where => where.value === value)
    if (find) setData(find.label)
  }


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
        <div style={{ textAlign: "center" , paddingTop: "2rem" }}>
          ยินดีต้อนรับ: {data}
        </div>
        : null}
    </>
  );
}

export default App;
