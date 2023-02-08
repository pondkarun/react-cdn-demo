import { Avatar, Dropdown, Select } from 'antd';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  const onChange = (value) => {
    console.log('hello :>> TTT', value);
  }
  return (
    <div className='main'>
      <div className="nav">
        <div className="pr-10">
          <Select
            size="small"
            defaultValue="C001"
            onChange={onChange}
            style={{ width: 120 }}
            options={[
              { value: 'C001', label: 'C001' },
              { value: 'C002', label: 'C002' },
              { value: 'C003', label: 'C003' },
              { value: 'C004', label: 'C004' },
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
  );
}

export default App;
