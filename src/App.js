import './App.css';

function App() {
  const onClick = () => {
    console.log('hello :>> TTT');
  }
  return (
    <div className='main'>
      <div className="nav" onClick={onClick}>
        Allkons Family
      </div>
      <div className='nav-line' />
    </div>
  );
}

export default App;
